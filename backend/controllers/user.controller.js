import NjangiGroup from "../models/njangi.group.model.js";
import Transaction from "../models/transaction.model.js";

export const checkMonthlyPaymentStatus = async (req, res) => {
  try {
    const { groupId } = req.params;
    const userIds = req.query.userIds.split(",");

    const group = await NjangiGroup.findById(groupId).lean();
    if (!group) {
      return res
        .status(404)
        .json({ success: false, message: "Group not found" });
    }

    const memberContributions = group.memberContributions || [];
    const paymentStatus = userIds.map((userId) => {
      const contribution = memberContributions.find(
        (c) => c.member.toString() === userId.toString()
      );

      if (!contribution || !contribution.lastPaymentDate) {
        return { userId, hasPaid: false };
      }

      const last = new Date(contribution.lastPaymentDate);
      const now = new Date();
      const hasPaid =
        last.getMonth() === now.getMonth() &&
        last.getFullYear() === now.getFullYear();

      return { userId, hasPaid };
    });

    res.status(200).json({ success: true, paymentStatus });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * GET /api/groups/:groupId/payments
 * Returns both pending payouts and full payout history for the specified Njangi group.
 */
export const getGroupPayments = async (req, res) => {
  try {
    const { groupId } = req.params;
    // Fetch group and populate member names
    const group = await NjangiGroup.findById(groupId)
      .populate("payoutHistory.member", "_id name email")
      .populate("adminId", "_id name email")
      .exec();

    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    // Separate pending payouts from completed/failed
    const pendingPayments = group.payoutHistory
      .filter((p) => p.status === "pending")
      .map((p) => ({
        group: {
          id: group._id,
          name: group.name,
        },
        dueDate: p.date,
        amount: p.amount,
      }));

    const paymentHistory = group.payoutHistory.map((p) => ({
      group: {
        id: group._id,
        name: group.name,
      },
      amount: p.amount,
      date: p.date,
      status: p.status,
      method: p.method,
      actions: {
        payoutId: p._id,
        canRetry: p.status === "failed",
      },
    }));

    return res.json({ pendingPayments, paymentHistory });
  } catch (error) {
    console.error("Error fetching payments:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * Fetch all groups created by an admin
 */
export const getGroups = async (req, res) => {
  try {
    const groups = await NjangiGroup.find({
      groupMembers: req.user.id,
    }).populate("groupMembers", "_id lastName firstName email createdAt");

    const groupsWithDate = groups.map((group) => {
      const nextDue = group.getNextPaymentDate(req.user.id);
      const groupObj = group.toObject();
      const { position, totalRounds } = group.getPositionAndRounds();
      const { totalContributed, totalReceived } = group.getUserFinancialSummary(
        req.user.id
      );
      groupObj.totalContributed = totalContributed;
      groupObj.totalReceived = totalReceived;
      groupObj.position = position;
      groupObj.totalRounds = totalRounds;
      groupObj.nextDue = nextDue;
      return groupObj;
    });

    console.log(groupsWithDate);

    res.status(200).json(groupsWithDate);
  } catch (error) {
    res.status(500).json({ message: "Error fetching groups", error });
  }
};

export const getUserContributionOverview = async (req, res) => {
  try {
    const userId = req.user.id;
    if (!userId) {
      return res.status(400).json({ error: "userId is required" });
    }

    // Find all groups where the user is a member and populate member contributions
    const groups = await NjangiGroup.find({
      groupMembers: userId,
      "memberContributions.member": userId,
    }).lean();

    // For each group, find the user's contribution details
    const overview = groups.map((group) => {
      const memberContribution = group.memberContributions?.find(
        (m) => m.member.toString() === userId.toString()
      );

      return {
        groupId: group._id,
        groupName: group.name,
        totalContributed: memberContribution?.totalAmountPaid || 0,
        lastPaymentDate: memberContribution?.lastPaymentDate || null,
        contributionAmount: group.contributionAmount || 0,
        frequency: group.paymentFrequency || "monthly",
      };
    });

    return res.status(200).json({
      success: true,
      overview: overview,
      totalGroups: overview.length,
      totalContributed: overview.reduce(
        (sum, group) => sum + group.totalContributed,
        0
      ),
    });
  } catch (err) {
    console.error("Error fetching user contribution overview:", err);
    res.status(500).json({
      success: false,
      error: "Failed to fetch user contribution overview",
    });
  }
};

export const getUserPaymentHistory = async (req, res) => {
  try {
    const userId = req.user.id;

    const transactions = await Transaction.find({ memberId: userId })
      .populate("groupId", "name")
      .sort({ date: -1 });

    res.json(transactions);
  } catch (err) {
    console.error("Error fetching payment history:", err);
    res.status(500).json({ error: "Server error" });
  }
};
