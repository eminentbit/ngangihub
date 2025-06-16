import mongoose from "mongoose";
import MODEL_NAMES from "../utils/model.names.js";

const generalSettingsSchema = new mongoose.Schema(
  {
    interestRate: { type: Number, default: 5 },
    penaltyRate: { type: Number, default: 2 },
    defaultRules: {
      type: String,
      default: "Standard Njangi group rules apply.",
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: MODEL_NAMES.GENERALSETTINGS,
    },
  },
  { timestamps: true }
);

const GeneralSettings = mongoose.model(
  MODEL_NAMES.GENERALSETTINGS,
  generalSettingsSchema
);

export default GeneralSettings;
