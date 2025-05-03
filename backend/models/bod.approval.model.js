// models/BODApproval.js
import mongoose from "mongoose";

const bodApprovalSchema = new mongoose.Schema(
  {
    groupId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "NjangiGroup",
      required: true,
    },
    bodId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["approved", "rejected", "pending"],
      default: "pending",
    },
    comment: { type: String },
    approvedAt: { type: Date },
  },
  { timestamps: true }
);

export const BODApproval = mongoose.model("BODApproval", bodApprovalSchema);
