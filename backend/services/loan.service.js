import NjangiGroup from "../models/njangi.group.model.js";
import NjangiLoan from "../models/njangi.loan.model.js";
import CreditScoreHistory from "../models/credit.score.history.js";
import NjangiActivityLog from "../models/njangi.activity.log.model.js";

export const updateCreditScores = async () => {
  const today = new Date();
  const currentMonth = today.getMonth(); // 0-based
  const currentYear = today.getFullYear();

  // Get all overdue loans that are not paid
  const overdueLoans = await NjangiLoan.find({
    dueDate: { $lt: today },
    status: { $ne: "paid" },
  }).populate("memberId");

  for (const loan of overdueLoans) {
    const user = loan.memberId;
    if (!user) continue;

    let adjustment = 0;
    let reason = "";

    // Handle loan repayment evaluation
    if (!loan.repayments || loan.repayments.length === 0) {
      adjustment -= 15;
      reason = "No loan repayment made after due date.";
    } else {
      const earliestRepayment = loan.repayments.reduce((earliest, r) =>
        r.datePaid < earliest.datePaid ? r : earliest
      );

      if (earliestRepayment.datePaid < loan.dueDate) {
        adjustment += 10;
        reason = "Early loan repayment.";
      } else if (
        earliestRepayment.datePaid.toDateString() ===
        loan.dueDate.toDateString()
      ) {
        adjustment += 5;
        reason = "On-time loan repayment.";
      } else {
        adjustment -= 10;
        reason = "Late loan repayment.";
      }
    }

    // Check contribution for current month/year
    const group = await NjangiGroup.findById(loan.groupId);
    const contribution = group.memberContributions?.find(
      (mc) =>
        mc.member.toString() === user._id.toString() &&
        mc.month === currentMonth &&
        mc.year === currentYear
    );

    if (contribution?.totalAmountPaid >= group.monthlyAmount) {
      adjustment += 5;
      reason += " Contributed for current month.";
    } else {
      adjustment -= 5;
      reason += " Missed monthly contribution.";
    }

    // Clamp credit score and apply update
    const oldScore = user.creditScore ?? 50;
    const newScore = Math.max(0, Math.min(100, oldScore + adjustment));
    user.creditScore = newScore;
    await user.save();

    await CreditScoreHistory.create({
      userId: user._id,
      reason,
      change: adjustment,
      newScore,
    });

    await NjangiActivityLog.create({
      activityType: "LOAN_REQUEST",
      affectedMember: user._id,
      description: `${user.lastName} ${user.firstName} request to loan ${loan.amount} FCFA`,
    });
  }

  console.log("✅ Credit scores and history updated.");
};
