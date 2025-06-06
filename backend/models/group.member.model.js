// models/GroupMember.js
import mongoose from "mongoose";

const groupMemberSchema = new mongoose.Schema(
  {
    groupId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "NjangiGroup",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    role: { type: String, enum: ["member", "admin"], default: "member" },
    status: {
      type: String,
      enum: ["invited", "accepted", "rejected", "active"],
      default: "pending",
    },
    inviteToken: { type: String },
    joinedAt: { type: Date },
    tempContact: { type: String }, // for storing raw contact if user doesn't exist
    tempName: { type: String }, // for storing name if user doesn't exist
  },
  { timestamps: true }
);

const GroupMember = mongoose.model("GroupMember", groupMemberSchema);

export default GroupMember;
