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
      enum: ["invited", "accepted", "rejected"],
      default: "invited",
    },
    inviteToken: { type: String },
    joinedAt: { type: Date },
  },
  { timestamps: true }
);

export const GroupMember = mongoose.model("GroupMember", groupMemberSchema);
