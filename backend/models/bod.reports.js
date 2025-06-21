import { Schema, model } from "mongoose";
import MODEL_NAMES from "../utils/model.names.js";

const reportSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    submittedBy: {
      type: Schema.Types.ObjectId,
      ref: MODEL_NAMES.USER,
    },
    type: {
      type: String,
      enum: ["Monthly", "Quarterly", "Annual", "Custom"],
      required: true,
    },
    status: {
      type: String,
      enum: ["Submitted", "Approved", "Rejected", "Pending"],
      default: "Pending",
    },
    summary: {
      type: String,
      trim: true,
    },
    reportContent: {
      type: String,
      required: true,
    },
    revenue: {
      type: Number,
      default: 0,
      min: 0,
    },
    expenses: {
      type: Number,
      default: 0,
      min: 0,
    },
    profit: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  { timestamps: true }
);

const BodReport = model(MODEL_NAMES.BODREPORTS, reportSchema);

export default BodReport;
