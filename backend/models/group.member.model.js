// models/GroupMember.js
import { model, Schema } from "mongoose";
import MODEL_NAMES from "../utils/model.names.js";

const groupMemberSchema = new Schema(
  {
    groupId: {
      type: Schema.Types.ObjectId,
      ref: MODEL_NAMES.GROUP,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
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

const GroupMember = model(MODEL_NAMES.GROUPMEMBER, groupMemberSchema);

export default GroupMember;
