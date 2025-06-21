// models/GroupMember.js
import mongoose from "mongoose";
import MODEL_NAMES from "../utils/model.names.js";

const groupMemberSchema = new mongoose.Schema(
  {
    groupId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: MODEL_NAMES.GROUP,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: MODEL_NAMES.USER,
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
    tempContact: { type: String },
    tempName: { type: String },
  },
  { timestamps: true }
);

const GroupMember = mongoose.model(MODEL_NAMES.GROUPMEMBER, groupMemberSchema);

export default GroupMember;
