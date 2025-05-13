// Invite model for Njangi Group invitations
import mongoose from "mongoose";

const inviteSchema = new mongoose.Schema(
  {
    groupId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "NjangiGroup",
      required: true,
    },
    emailOrPhone: { type: String, required: true, unique: true },
    inviteToken: { type: String, required: true, unique: true },
    status: {
      type: String,
      enum: ["pending", "accepted", "expired"],
      default: "pending",
    },
    invitedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    expiresAt: { type: Date },
  },
  { timestamps: true }
);

export const Invite = mongoose.model("Invite", inviteSchema);
