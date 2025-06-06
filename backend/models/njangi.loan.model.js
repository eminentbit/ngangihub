import mongoose from "mongoose";

const njangiLoanSchema = new mongoose.Schema(
  {
    groupId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "NjangiGroup",
      required: true,
    },
    memberId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: { type: Number, required: true },
    interest: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "paid"],
      default: "pending",
    },
    repayments: [
      {
        amountPaid: { type: Number, required: true },
        datePaid: { type: Date, default: Date.now },
      },
    ],
    requestedAt: { type: Date, default: Date.now },
    approvedAt: { type: Date },
    dueDate: { type: Date },
    notes: { type: String },
  },
  { timestamps: true }
);

const NjangiLoan = mongoose.model("NjangiLoan", njangiLoanSchema);

export default NjangiLoan;
