import User from "../models/user.model.js";
import NjangiDraft from "../models/njangi.draft.model.js";
import bcryptjs from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";

export const checkSession = async (req, res) => {
  if (!req.user || !req.user.id) {
    return res.status(401).json({ message: "Unauthorized: No session found" });
  }

  try {
    const user = await User.findById(req.user.id);
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
      return res.status(401).json({success: false, message: "Invalid email or password!" });
    }
    console.log(user);
    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: "Invalid Credentials!",
      });
    }

    // Check if user is pending approval (adjust field name as needed)
    if (user.status === "pending") {
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
    generateTokenAndSetCookie(res, user._id);

    user.lastlogin = Date.now();
    await user.save();

    req.user = { id: user._id, role: user.role };

    // Send role in response so frontend can redirect
    return res.status(200).json({
      success: true,
      message: "Login successfully!",
      user: {
        id: user._id,
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
