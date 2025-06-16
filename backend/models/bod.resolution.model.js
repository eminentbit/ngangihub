import { Schema, model } from "mongoose";
import MODEL_NAMES from "../utils/model.names.js";

const resolutionSchema = new Schema(
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
    submittedBy: { type: Schema.Types.ObjectId, ref: MODEL_NAMES.USER },
  },
  { timestamps: true }
);

const BodResolution = model(MODEL_NAMES.BODRESOLUTION, resolutionSchema);

export default BodResolution;
