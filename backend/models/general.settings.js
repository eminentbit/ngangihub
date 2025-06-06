import mongoose from "mongoose";

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
      ref: "User",
    },
  },
  { timestamps: true }
);

const GeneralSettings = mongoose.model(
  "GeneralSettings",
  generalSettingsSchema
);

export default GeneralSettings;
