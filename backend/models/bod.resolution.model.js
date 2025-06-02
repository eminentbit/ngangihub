import mongoose from "mongoose";
import User from "./user.model.js";

const resolutionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    submittedBy: { type: mongoose.Schema.Types.ObjectId, ref: User },
  },
  { timestamps: true }
);

const BodResolution = mongoose.model("Resolution", resolutionSchema);

export default BodResolution;
