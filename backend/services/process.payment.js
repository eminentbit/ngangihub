import Transaction from "../models/transaction.model.js";
import NjangiGroup from "../models/njangi.group.model.js";

/**
 *
 * @param {import('../models/njangi.group.model.js').default} group
 */

export async function processPayout(group) {
  const { position } = group.getPositionAndRounds();
  const memberId = group.groupMembers[position - 1];

  const amount = group.contributionAmount * group.groupMembers.length;

  // (rotation-based)
  group.payoutHistory.push({
    member: memberId,
    amount,
    status: "completed",
    method: "momo",
    date: new Date(),
  });

  await group.save();

  await Transaction.create({
    amount,
    status: "completed",
    type: "income",
    groupId: group._id,
  });

  console.log(
    `Payout of ${amount} to user ${memberId} in group ${group.name} completed`
  );
}

export async function withdrawFunds({ amount, phone, description }) {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/withdraw/`,
      {
        amount, // e.g. 5000
        to: phone, // e.g. "237679587525"
        description, // e.g. "Njangi payout"
        external_reference: uuidv4(), // Unique UUIDv4 for idempotency
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Withdrawal failed:", error.response?.data || error.message);
    throw error;
  }
}
