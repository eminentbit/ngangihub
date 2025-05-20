// Invite model for Njangi Group invitations
import mongoose from "mongoose";

const inviteSchema = new mongoose.Schema(
  {
    groupId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "NjangiGroup",
      required: true,
    },
    emailOrPhone: { type: String, required: true },
    inviteToken: { type: String, required: true, unique: true },
    status: {
      type: String,
      enum: ["pending", "accepted", "expired"],
      default: "pending",
    },
    invitedBy: String,
    expiresAt: { type: Date },
  },
  { timestamps: true }
);

const Invite = mongoose.model("Invite", inviteSchema);

export default Invite;
