import { createRedisClient } from "../redisClient.js";
import { config } from "dotenv";
import CACHE_NAMES from "../utils/cache.names.js";
import generatePaymentReference from "../utils/generateReference.js";
import User from "../models/user.model.js";
import Transaction from "../models/transaction.model.js";
import axios from "axios";
config();

const redis = createRedisClient();

export async function getCampayToken(req, res) {
  if (!req.user.id) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const url = `${process.env.CAMPAY_BASE_URL}/api/token/`;

  const data = {
    username: process.env.CAMPAY_APP_USERNAME,
    password: process.env.CAMPAY_APP_PASSWORD,
  };

  try {
    // Check if token is already cached
    const cachedToken = await redis.get(CACHE_NAMES.CAMPAYTOKEN);
    console.log(cachedToken);
    if (cachedToken || !cachedToken == null) {
      console.log("Returning cached token");
      return res.json({ token: cachedToken });
    }

    console.log("Fetching new token...");
    const response = await axios.post(url, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const token = response.data.token;

    // Store token in Redis with an expiration time (e.g., 3600 seconds = 1 hour)
    await redis.set(CACHE_NAMES.CAMPAYTOKEN, token, "EX", 3600);

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching token:", error.message);
    res.status(500).json({ error: "Failed to fetch token" });
  }
}

export const getPaymentLink = async (req, res) => {
  const { amount, description } = req.body;
  if (!req.user.id) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    // Retrieve the token from Redis
    const token = await redis.get(CACHE_NAMES.CAMPAYTOKEN);
    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const url = `${process.env.CAMPAY_BASE_URL}/api/get_payment_link/`;
    const reference = generatePaymentReference();

    const user = await User.findById(req.user.id);

    // Prepare the data for the API request
    let data = {};
    const redirectUrl = `${process.env.FRONTEND_URL}/${user?.role}/dashboard`;

    if (!amount) {
      data = {
        currency: "XAF",
        description: description || "Test",
        external_reference: reference,
        redirect_url: redirectUrl || "https://example.com",
      };
    } else {
      data = {
        amount,
        currency: "XAF",
        description: description || "Test",
        external_reference: reference,
        redirect_url: redirectUrl || "https://example.com",
      };
    }

    // Make the API request
    const response = await axios.post(url, data, {
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    });

    const transaction = await Transaction.create({
      type: "expense",
      amount: data.amount,
      currency: data.currency,
      reference: data.external_reference,
      note: data.description,
      memberId: req.session.user.id,
    });

    console.log("Transaction created:", transaction);
    res.json({ link: response.data.link, transaction });
  } catch (error) {
    // Handle errors and send a response
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
    res.status(error.response ? error.response.status : 500).json({
      error: error.response ? error.response.data : "Internal Server Error",
    });
  }
};

export const initiatePayment = async (req, res) => {
  try {
    if (!req.user.id) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { amount, from, description, groupId } = req.body;

    // Validate required fields
    if (!amount || isNaN(parseInt(amount))) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid amount." });
    }
    if (!from || isNaN(parseInt(from))) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid phone number." });
    }
    if (!description) {
      return res
        .status(400)
        .json({ success: false, message: "Description is required." });
    }

    // Payment provider API request
    const paymentAPIUrl = `${process.env.CAMPAY_BASE_URL}/api/collect/`;

    const makeRequest = async () => {
      const token = await redis.get(CACHE_NAMES.CAMPAYTOKEN);

      const data = {
        amount: amount,
        from: from,
        description: description,
        currency: "XAF",
        external_reference: generatePaymentReference(),
      };

      try {
        const response = await axios.post(paymentAPIUrl, data, {
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (process.env.NODE_ENV.includes("dev")) {
          console.log("Response:", response.data);
        }

        const transaction = await Transaction.create({
          type: "expense",
          amount: data.amount,
          reference: data.external_reference,
          groupId,
          status: "completed",
          note: response.data.description,
          memberId: req.user.id,
        });

        console.log("Transaction created", transaction);

        return res.status(200).json({
          success: true,
          message: "Payment processed successfully",
          ...response.data,
          id: transaction.id,
        });
      } catch (error) {
        console.log(
          "Error:",
          error.response ? error.response.data : error.message
        );
      }
    };

    makeRequest();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.response?.data?.message || "Payment processing failed",
    });
  }
};
