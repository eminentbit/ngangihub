import User from "../models/user.model.js";
import NjangiDraft from "../models/njangi.draft.model.js";
import bcryptjs from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import LastLogin from "../models/login.attempt.js";
import { getIPAddress } from "../utils/getIPAddress.js";
import { sendPasswordResetEmail } from "../mail/emails.js";

export const checkSession = async (req, res) => {
  if (!req.user || !req.user.id) {
    return res.status(401).json({ message: "Unauthorized: No session found" });
  }

  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    // If not found in User, check NjangiDraft.accountSetup
    if (!user) {
      const ndraftUser = await NjangiDraft.findOne({
        "accountSetup.email": email,
      });
      if (ndraftUser) {
        // You can also check status or other fields here
        if (ndraftUser.accountSetup.status === "pending") {
          return res.status(403).json({
            success: false,
            message:
              "Your account is still pending BOD approval. Please wait for confirmation.",
          });
        }
        if (ndraftUser.accountSetup.status === "suspended") {
          return res
            .status(403)
            .json({ message: "Account suspended. Contact support." });
        }
      }
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password!" });
    }
    // console.log(user);
    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: "Invalid Credentials!",
      });
    }

    // Check if user is pending approval (adjust field name as needed)
    if (user.status === "pending" && user.role != "bod") {
      return res.status(403).json({
        success: false,
        message:
          "Your account is pending approval by the BOD. Please wait for confirmation.",
      });
    }
    if (user.status === "suspended") {
      return res.status(403).json({
        success: false,
        message: "Account suspended. Contact support.",
      });
    }

    // generate token and set cookie for the user
    generateTokenAndSetCookie(res, user.id);

    LastLogin.create({
      email: user.email,
      ipAddress: getIPAddress(req),
      status: user.status,
    });

    req.user = { id: user.id, role: user.role };
    // console.log(req.user);

    // Send role in response so frontend can redirect
    return res.status(200).json({
      success: true,
      message: "Login successfully!",
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("token", "", { maxAge: 0 });
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the user's password
    user.password = await bcryptjs.hash(newPassword, 10);
    await user.save();

    return res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const sendPasswordResetLink = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    sendPasswordResetEmail(email, generateTokenAndSetCookie(res, user._id));

    return res.status(200).json({ message: "Password reset link sent" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
