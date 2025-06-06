import { GroupDetails } from "../types/create-njangi-types";

export function getNextPayout(group: GroupDetails) {
  const payoutHistory = group.payoutHistory || [];
  const lastPaidMemberIds = payoutHistory.map((p) => p.member.toString());

  // Find the first member who hasn't received a payout
  const nextMemberId = group.groupMembers?.find(
    (m) => !lastPaidMemberIds.includes(m.toString())
  );

  // If all have received, start over or return null
  if (!nextMemberId) return null;

  // Calculate next payout date
  const payoutsDone = payoutHistory.length;
  const nextPayoutDate = new Date(group.startDate);
  const freq = group.contributionFrequency;
  if (freq === "Weekly")
    nextPayoutDate.setDate(nextPayoutDate.getDate() + 7 * payoutsDone);
  if (freq === "Monthly")
    nextPayoutDate.setMonth(nextPayoutDate.getMonth() + payoutsDone);
  if (freq === "Bi-weekly")
    nextPayoutDate.setDate(nextPayoutDate.getDate() + 14 * payoutsDone);

  return {
    member: nextMemberId,
    amount: group.contributionAmount * (group.groupMembers?.length || 0),
    date: nextPayoutDate,
  };
}
