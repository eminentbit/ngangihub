// Account set up

import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePicUrl: { type: String },
    groups: [{ type: mongoose.Schema.Types.ObjectId, ref: "Group" }],
    role: { type: String, enum: ["admin", "member", "bod"], default: "member" },
    status: {
      type: String,
      enum: ["active", "pending", "invited"],
      default: "pending",
    },
    lastlogin: {
      type: Date,
      default: Date.now,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    resetPasswordToken: String,
    resetPasswordExpireAt: Date,
    verificationToken: String,
    verificationTokenExpireAt: Date,
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
