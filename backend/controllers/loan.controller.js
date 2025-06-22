import { Types } from "mongoose";
import User from "../models/user.model.js";
import NjangiGroup from "../models/njangi.group.model.js";
import NjangiLoan from "../models/njangi.loan.model.js";

export const requestLoan = async (req, res) => {
  try {
    const memberId = req.user?.id;
    const { amount, groupId, durationMonths, notes = "" } = req.body;

    if (!Types.ObjectId.isValid(groupId) || !Types.ObjectId.isValid(memberId)) {
      return res.status(400).json({ error: "Invalid group or user ID." });
    }

    if (!amount || isNaN(amount) || Number(amount) < 1000) {
      return res.status(400).json({ error: "Invalid loan amount." });
    }

    if (![3, 6, 9, 12].includes(Number(durationMonths))) {
      return res.status(400).json({ error: "Invalid repayment duration." });
    }

    const user = await User.findById(memberId);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    if (user.creditScore < 50) {
      return res.status(403).json({
        error: "Loan request denied. Your credit score is too low.",
        creditScore: user.creditScore,
      });
    }

    const group = await NjangiGroup.findById(groupId);
    if (!group) return res.status(404).json({ error: "Group not found." });

    const isMember = group.groupMembers.some((m) => m.toString() === memberId);
    if (!isMember) {
      return res.status(403).json({
        error: "You are not a member of this group.",
      });
    }

    // ✅ Create due date
    const dueDate = new Date();
    dueDate.setMonth(dueDate.getMonth() + Number(durationMonths));

    // ✅ Create loan request
    const loan = await NjangiLoan.create({
      groupId,
      memberId,
      amount,
      dueDate,
      notes,
      requestedAt: new Date(),
      status: "pending",
    });

    return res.status(201).json({
      message: "Loan request submitted successfully.",
      loanId: loan._id,
    });
  } catch (err) {
    console.error("Loan request error:", err);
    return res.status(500).json({ error: "Server error." });
  }
};
