import bcryptjs from "bcryptjs";
import { User } from "../models/user.model.js";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";

export const createUser = async (accountData, res) => {
  const existing = await User.findOne({ email: accountData.email });
  if (existing) {
    return res
      .status(400)
      .json({ success: false, message: "User already exists. Please try again!" });
  }

  const passwordHash = await bcryptjs.hash(accountData.password, 12);

  //verification code
  const verificationToken = Math.floor(
    100000 + Math.random() * 900000
  ).toString();

  const user = new User({
    firstName: accountData.firstName,
    lastName: accountData.lastName,
    email: accountData.email,
    phoneNumber: accountData.phoneNum,
    passwordHash,
    role: "admin",
    status: "pending",
    verificationToken,
    verificationTokenExpireAt: Date.now() + 24 * 60 * 60 * 1000, //24hrs
  });

  const savedUser = await user.save();

  console.log("savedUser:", savedUser);

  generateTokenAndSetCookie(res, savedUser._id);

  //send verification email
  //  await sendVerificationEmail(newUser.email, verificationToken);

  return savedUser;
};
