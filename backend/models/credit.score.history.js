import { model, Schema } from "mongoose";
import MODEL_NAMES from "../utils/model.names.js";

const creditScoreHistorySchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: MODEL_NAMES.USER,
      required: true,
    },
    reason: { type: String, required: true },
    change: { type: Number, required: true },
    newScore: { type: Number, required: true },
    recordedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const CreditScoreHistory = model(
  MODEL_NAMES.CREDIT_SCORE_HISTORY,
  creditScoreHistorySchema
);

export default CreditScoreHistory;
