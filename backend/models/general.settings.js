import  { model, Schema } from "mongoose";
import MODEL_NAMES from "../utils/model.names.js";

const generalSettingsSchema = new Schema(
  {
    interestRate: { type: Number, default: 5 },
    penaltyRate: { type: Number, default: 2 },
    defaultRules: {
      type: String,
      default: "Standard Njangi group rules apply.",
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: MODEL_NAMES.GENERALSETTINGS,
    },
  },
  { timestamps: true }
);

const GeneralSettings = model(
  MODEL_NAMES.GENERALSETTINGS,
  generalSettingsSchema
);

export default GeneralSettings;
