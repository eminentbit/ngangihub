const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
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
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  amount: {
    type: Number,
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

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
