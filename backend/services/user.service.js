import bcryptjs from "bcryptjs";
import { User } from "../models/user.model.js";

export const createUser = async (accountData) => {
  const existing = await User.findOne({ email: accountData.email });
  if (existing) throw new Error("User already exists");

  const passwordHash = await bcryptjs.hash(accountData.password, 12);

  const user = new User({
    firstName: accountData.firstName,
    lastName: accountData.lastName,
    email: accountData.email,
    phoneNumber: accountData.phoneNum,
    passwordHash,
    role: "admin",
    status: "pending",
  });

  return await user.save();
};
