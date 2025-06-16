import User from "../models/user.model.js";
import { validationResult } from "express-validator";
import NjangiDraft from "../models/njangi.draft.model.js";
import LastLogin from "../models/login.attempt.js";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import { getBrowserType, getDeviceName, getInfo } from "../utils/getInfo.js";
import {
  sendPasswordChangedEmail,
  sendPasswordResetEmail,
  sendSigninAttemptEmail,
} from "../mail/emails.js";
import validator from "validator";
import bcrypt from "bcryptjs";

// Helper: find pending or suspended draft user
async function checkDraftStatus(email) {
  if (typeof email != "string" || !validator(email)) {
    return res.status(400).json({ message: "Invalid email" });
  }
  const draft = await NjangiDraft.findOne({
    "accountSetup.email": { $eq: email },
  });
  return draft?.accountSetup;
}

// Shared options
const LOGIN_QUERIES_PROJECTION = "email status lastName firstName role";
const USER_PROJECTION = "-password";
const SIGNIN_THRESHOLD_MS = 7 * 24 * 60 * 60 * 1000; // 1 week

// Validate request results
function handleValidation(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
}

export const checkSession = async (req, res) => {
  if (!req.user?.id) {
    return res.status(401).json({ message: "Unauthorized: No session found" });
  }
  try {
    const user = await User.findById(req.user.id).select(USER_PROJECTION);
    if (!user) throw new Error("User not found");
    return res.status(200).json({ user });
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  // request validation via express-validator middleware
  if (handleValidation(req, res)) return;

  const { email, password } = req.body;

  if (!email || !validator.isEmail(email)) {
    return res.status(400).json({ message: "Invalid email address" });
  }

  try {
    // Try primary user
    let user = await User.findOne({ email: { $eq: email } }).select(
      `password ${LOGIN_QUERIES_PROJECTION}`
    );

    // If not in User, check draft
    if (!user) {
      const accountSetup = await checkDraftStatus(email);
      if (accountSetup) {
        const msgMap = {
          pending: "Your account is still pending BOD approval.",
          suspended: "Account suspended. Contact support.",
        };
        const message = msgMap[accountSetup.status] || "Unauthorized.";
        return res.status(403).json({ success: false, message });
      }
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    // Compare password
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    // Check status
    if (user.status === "pending" && user.role !== "bod") {
      return res
        .status(403)
        .json({ success: false, message: "Account pending approval." });
    }
    if (user.status === "suspended") {
      return res
        .status(403)
        .json({ success: false, message: "Account suspended." });
    }

    generateTokenAndSetCookie(res, user.id);

    const { ip } = await getInfo();
    const userAgent = req.headers["user-agent"];
    const browser = getBrowserType(userAgent);
    const device = getDeviceName(userAgent);

    // Record login and send alerts
    const lastRecord = await LastLogin.findOne({ userId: user.id })
      .sort({ createdAt: -1 })
      .lean();

    const now = Date.now();
    const threshold = now - SIGNIN_THRESHOLD_MS;
    const shouldAlert = !lastRecord || lastRecord.createdAt < threshold;

    await LastLogin.create({
      userId: user.id,
      email: user.email,
      ipAddress: ip,
      status: user.status,
    });

    if (shouldAlert) {
      sendSigninAttemptEmail(
        user.email,
        device,
        browser,
        user.lastName,
        user.firstName
      );
    }

    // Response user data
    req.user = { id: user.id, role: user.role };
    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: { id: user.id, email: user.email, role: user.role },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token");
  return res.status(200).json({ message: "Logged out successfully" });
};

export const resetPassword = async (req, res) => {
  if (handleValidation(req, res)) return;
  const { email, newPassword } = req.body;

  if (!email || !validator.isEmail(email)) {
    return res.status(400).json({ message: "Invalid email address" });
  }

  try {
    const user = await User.findOne({ email: { $eq: email } });
    if (!user) return res.status(404).json({ message: "User not found" });
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    return res.json({ message: "Password reset successfully" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const changePassword = async (req, res) => {
  if (handleValidation(req, res)) return;
  try {
    const { oldPassword, newPassword } = req.body;
    console.log(req.body);
    const user = await User.findById(req.user.id).select(
      "password email lastName firstName"
    );

    if (!user) return res.status(404).json({ message: "User not found" });
    console.log(oldPassword, user.password);
    const valid = await bcrypt.compare(oldPassword, user.password);
    console.log(valid);
    if (!valid)
      return res.status(401).json({ message: "Current password incorrect" });
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    await sendPasswordChangedEmail(
      user.email,
      user.lastName,
      user.firstName,
      `${process.env.FRONTEND_URL}/${user.role}/settings`
    );
    return res.json({
      message: "Password changed successfully",
      success: true,
    });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const sendPasswordResetLink = async (req, res) => {
  if (handleValidation(req, res)) return;
  try {
    const { email } = req.body;

    if (!email || !validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid email address" });
    }

    const user = await User.findOne({ email: { $eq: email } }).select(
      "_id email"
    );
    if (!user) return res.status(404).json({ message: "User not found" });
    const token = generateTokenAndSetCookie(res, user._id);
    sendPasswordResetEmail(user.email, token);
    return res.json({ message: "Password reset link sent" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};
