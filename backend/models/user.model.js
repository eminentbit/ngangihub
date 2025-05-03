// Account set up

import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    profilePicUrl: { type: String },
    groups: [{ type: mongoose.Schema.Types.ObjectId, ref: "Group" }],
    role: { type: String, enum: ["admin", "member", "bod"], default: "member" },
    status: {
      type: String,
      enum: ["active", "pending", "invited"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export const user = mongoose.model("User", userSchema);
