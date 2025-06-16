import mongoose from "mongoose";
import MODEL_NAMES from "../utils/model.names.js";

const bodApprovalSchema = new mongoose.Schema(
  {
    draftId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: MODEL_NAMES.NJANGIDRAFT,
      required: true,
    },
    bodId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: MODEL_NAMES.USER,
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

export const BODApproval = mongoose.model(
  MODEL_NAMES.BODAPPROVAL,
  bodApprovalSchema
);

export default BODApproval;
