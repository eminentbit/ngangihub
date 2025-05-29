import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      enum: ["Monthly", "Quarterly", "Annual", "Custom"], // example types
      required: true,
    },
    status: {
      type: String,
      enum: ["Draft", "Submitted", "Approved", "Rejected"],
      default: "Draft",
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

const Report = mongoose.model("Report", reportSchema);

export default Report;
