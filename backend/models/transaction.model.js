import { model, Schema } from "mongoose";
import MODEL_NAMES from "../utils/model.names";

const transactionSchema = new Schema({
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  type: {
    type: String,
    required: true,
    enum: ["income", "expense"],
  },
  memberId: {
    type: Schema.Types.ObjectId,
    ref: MODEL_NAMES.USER,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  groupId: {
    type: Schema.Types.ObjectId,
    ref: MODEL_NAMES.GROUP,
    required: true,
  },
  note: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Transaction = model(MODEL_NAMES.TRANSACTION, transactionSchema);

export default Transaction;
