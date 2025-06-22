import NjangiLoan from "../models/njangi.loan.model";
import User from "../models/user.model";

export const updateCreditScores = async () => {
  const today = new Date();

  // Fetch loans that are overdue or paid
  const loans = await NjangiLoan.find({
    dueDate: { $lt: today },
    status: { $in: ["approved", "paid"] },
  });

  for (const loan of loans) {
    const user = await User.findById(loan.memberId);
    if (!user) continue;

    const paidDates = loan.repayments.map((r) => r.datePaid);
    const earliestRepayment = paidDates.length
      ? new Date(Math.min(...paidDates.map((d) => new Date(d))))
      : null;

    if (!earliestRepayment) {
      user.creditScore = Math.max(0, user.creditScore - 15);
    } else if (earliestRepayment > loan.dueDate) {
      user.creditScore = Math.max(0, user.creditScore - 10);
    } else if (earliestRepayment < loan.dueDate) {
      user.creditScore = Math.min(100, user.creditScore + 10);
    } else {
      user.creditScore = Math.min(100, user.creditScore + 5);
    }

    await user.save();
  }

  console.log("✅ Credit scores updated.");
};
