import { model, Schema } from "mongoose";
import MODEL_NAMES from "../utils/model.names.js";

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
  status: {
    type: String,
    enum: ["pending", "completed", "failed"],
    default: "completed",
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

transactionSchema.post("save", function (doc, next) {
  // Notify admin that a payment was made
  notifyAdminOfPayment(doc.memberId, doc.amount);
  next();
});

const Transaction = model(MODEL_NAMES.TRANSACTION, transactionSchema);

export default Transaction;
