import { createRedisClient } from "../redisClient.js";
import { config } from "dotenv";
import CACHE_NAMES from "../utils/cache.names.js";
import generatePaymentReference from "../utils/generateReference.js";
import User from "../models/user.model.js";
import Transaction from "../models/transaction.model.js";
import axios from "axios";
import NjangiGroup from "../models/njangi.group.model.js";
import NjangiActivityLog from "../models/njangi.activity.log.model.js";
config();

const redis = createRedisClient();

export async function getCampayToken(req, res) {
  if (!req.user?.id) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const url = `${process.env.CAMPAY_BASE_URL}/api/token/`;
  const data = {
    username: process.env.CAMPAY_APP_USERNAME,
    password: process.env.CAMPAY_APP_PASSWORD,
  };

  try {
    const cachedToken = await redis.get(CACHE_NAMES.CAMPAYTOKEN);
    if (cachedToken !== null) {
      return res.status(200).json({ token: cachedToken });
    }

    const response = await axios.post(url, data, {
      headers: { "Content-Type": "application/json" },
    });

    const token = response.data.token;
    await redis.set(CACHE_NAMES.CAMPAYTOKEN, token, "EX", 3600);

    return res.status(200).json({ token });
  } catch (error) {
    console.error(
      "Campay token error:",
      error?.response?.data || error.message
    );
    return res.status(500).json({ error: "Failed to fetch Campay token" });
  }
}

export const getPaymentLink = async (req, res) => {
  const { amount, description } = req.body;

  if (!req.user?.id) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const token = await redis.get(CACHE_NAMES.CAMPAYTOKEN);
    if (!token) {
      return res.status(401).json({ error: "Missing Campay token" });
    }

    const user = await User.findById(req.user.id);
    const reference = generatePaymentReference();
    const redirectUrl = `${process.env.FRONTEND_URL}/${
      user?.role || "user"
    }/dashboard`;

    const data = {
      currency: "XAF",
      description: description || "Njangi payment",
      external_reference: reference,
      redirect_url: redirectUrl,
      ...(amount && { amount }), // only include if present
    };

    const response = await axios.post(
      `${process.env.CAMPAY_BASE_URL}/api/get_payment_link/`,
      data,
      {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    const transaction = await Transaction.create({
      type: "expense",
      amount: data.amount || 0,
      currency: data.currency,
      reference: data.external_reference,
      note: data.description,
      memberId: req.user.id,
    });

    return res.status(200).json({
      link: response.data.link,
      transaction,
    });
  } catch (error) {
    console.error(
      "Payment link error:",
      error?.response?.data || error.message
    );
    return res.status(error.response?.status || 500).json({
      error: error.response?.data || "Failed to create payment link",
    });
  }
};

export const initiatePayment = async (req, res) => {
  if (!req.user?.id) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { amount, from, description, groupId } = req.body;

  if (!amount || isNaN(parseFloat(amount))) {
    return res.status(400).json({ error: "Invalid amount." });
  }

  if (!from || !/^(\+237)?\d{8,15}$/.test(from)) {
    return res.status(400).json({ error: "Invalid phone number format." });
  }

  if (!description) {
    return res.status(400).json({ error: "Description is required." });
  }

  try {
    const token = await redis.get(CACHE_NAMES.CAMPAYTOKEN);
    if (!token) {
      return res.status(401).json({ error: "Missing Campay token" });
    }

    const paymentAPIUrl = `${process.env.CAMPAY_BASE_URL}/api/collect/`;
    const reference = generatePaymentReference();

    const paymentData = {
      amount,
      from,
      description,
      currency: "XAF",
      external_reference: reference,
    };

    console.log(paymentData);

    const response = await axios.post(paymentAPIUrl, paymentData, {
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    });

    console.log(response.data);

    const transaction = await Transaction.create({
      type: "expense",
      amount: paymentData.amount,
      reference: paymentData.external_reference,
      groupId,
      status: "completed",
      note: response.data.description,
      memberId: req.user.id,
    });

    await NjangiGroup.findOneAndUpdate(
      { _id: groupId, "memberContributions.member": req.user.id },
      {
        $inc: {
          "memberContributions.$.paymentsCount": 1,
          "memberContributions.$.totalAmountPaid": amount,
        },
        $set: { "memberContributions.$.lastPaymentDate": new Date() },
      },
      { new: true }
    ).then(async (updatedGroup) => {
      // If member not already in memberContributions, add them
      if (!updatedGroup) {
        await NjangiGroup.findByIdAndUpdate(groupId, {
          $push: {
            memberContributions: {
              member: req.user.id,
              paymentsCount: 1,
              lastPaymentDate: new Date(),
              totalAmountPaid: amount,
            },
          },
        });
      }
    });

    const group = await NjangiGroup.findById(groupId);
    const user = await User.findById(req.user.id);

    await NjangiActivityLog.create({
      activityType: "CONTRIBUTION_MADE",
      performedBy: req.user.id,
      amount,
      groupId,
      description: `${user.lastName} ${user.firstName} payed ${amount} in ${group.name}`,
    });

    return res.status(200).json({
      success: true,
      message: "Payment processed successfully",
      id: transaction.id,
      ...response.data,
    });
  } catch (error) {
    console.error(
      "Initiate payment error:",
      error?.response?.data || error.message
    );
    return res.status(error.response?.status || 500).json({
      success: false,
      message: error.response?.data?.message || "Payment failed",
    });
  }
};
