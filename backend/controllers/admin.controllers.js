import njangiDraftModel from "../models/njangi.draft.model.js";
import NjangiGroup from "../models/njangi.group.model.js";
import User from "../models/user.model.js";
import validator from "validator";
import { config } from "dotenv";
import NjangiActivityLog from "../models/njangi.activity.log.model.js";
import Invite from "../models/invite.model.js";
import { inviteMembersToGroup } from "../services/invite.service.js";

config();

/**
 * Fetch members of a specific group created by an admin
 */
export const getMembersOfGroup = async (req, res) => {
  const { groupId } = req.params;

  try {
    const group = await NjangiGroup.findOne({
      _id: { $eq: groupId },
      adminId: req.user.id,
    }).populate("groupMembers", "-password"); // exclude password

    if (!group) {
      return res
        .status(404)
        .json({ message: "Group not found or not owned by this admin." });
    }

    res.status(200).json({
      groupId: group._id,
      groupName: group.name,
      members: group.groupMembers,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching group members", error });
  }
};

/**
 * Fetch all members of all groups created by an admin (no duplicates)
 */
export const getAllMembersOfAdminGroups = async (req, res) => {
  try {
    const groups = await NjangiGroup.find({ adminId: req.user.id }).populate(
      "groupMembers",
      "-password"
    );

    const allMembersMap = new Map();

    for (const group of groups) {
      for (const member of group.groupMembers) {
        allMembersMap.set(member._id.toString(), member);
      }
    }

    const uniqueMembers = Array.from(allMembersMap.values());

    res.status(200).json({
      adminId,
      totalGroups: groups.length,
      totalUniqueMembers: uniqueMembers.length,
      members: uniqueMembers,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching members of admin's groups", error });
  }
};

/**
 * Fetch all groups created by an admin
 */
export const getAdminGroups = async (req, res) => {
  try {
    const groups = await NjangiGroup.find({ adminId: req.user.id }).populate(
      "groupMembers"
    );
    console.log(groups);
    const groupsWithIsAdmin = groups.map((group) => {
      const groupObj = group.toObject();
      groupObj.isAdmin = String(group.adminId) === String(req.user.id);
      return groupObj;
    });
    res.status(200).json(groupsWithIsAdmin);
  } catch (error) {
    res.status(500).json({ message: "Error fetching admin's groups", error });
  }
};

/**
 * Create a new njangi group
 */
export const createGroup = async (req, res) => {
  try {
    const admin = await User.findById(req.user.id);
    if (admin.groupsCreated >= 1) {
      return res.status(403).json({
        message:
          "Maximum number of groups (1) reached, Please upgrade your plan to create more groups.",
      });
    }
    const newGroup = new NjangiGroup({
      ...req.body,
      adminId: req.user.id,
    });
    const savedGroup = await newGroup.save();
    res.status(201).json(savedGroup);
  } catch (error) {
    res.status(500).json({ message: "Error creating group", error });
  }
};

/**
 * Fetch a specific group by ID
 */
export const fetchGroupById = async (req, res) => {
  const { groupId } = req.params;

  try {
    const group = await NjangiGroup.findOne({
      _id: { $eq: groupId },
      adminId: req.user.id,
    });

    if (!group) {
      return res.status(404).json({
        message: "Group not found or not owned by this admin.",
      });
    }

    const totalFunds = group.memberContributions.reduce(
      (sum, mc) => sum + (mc.totalAmountPaid || 0),
      0
    );

    const groupInfo = {
      ...group.toObject(),
      totalFunds,
    };

    res.status(200).json(groupInfo);
  } catch (error) {
    res.status(500).json({ message: "Error fetching group", error });
  }
};

export const fetchGroupByIdWithoutToken = async (req, res) => {
  console.log(req.query);
  const { groupId } = req.query;

  try {
    const group = await NjangiGroup.findOne({
      _id: { $eq: groupId },
    });

    if (!group) {
      return res.status(404).json({
        message: "Group not found or not owned by this admin.",
      });
    }

    res.status(200).json(group);
  } catch (error) {
    res.status(500).json({ message: "Error fetching group", error });
  }
};

/**
 * Get submission statistics for a group
 */
export const getSubmissionStats = async (req, res) => {
  const { email } = req.query;
  if (!email || !validator.isEmail(email)) {
    return res.status(400).json({ message: "Invalid email address" });
  }

  try {
    const user = await User.findOne({ email: { $eq: email } });
    console.log("User:", user);

    let createdGroups = [];
    if (user) {
      createdGroups = await NjangiGroup.find({
        adminId: user._id,
      });
    }

    const drafts = await njangiDraftModel.find({
      "accountSetup.email": { $eq: email },
    });

    let createdGroupsCount = 0;
    if (createdGroups && createdGroups.length)
      createdGroupsCount = createdGroups.length;
    const draftGroupsCount = drafts.length;
    res.status(200).json({
      approved: createdGroupsCount,
      pending: draftGroupsCount,
      rejected: 0,
      total: createdGroupsCount + draftGroupsCount,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching submission statistics", error });
  }
};

export const getRecentActivity = async (req, res) => {
  const { email } = req.query;

  if (!email || !validator.isEmail(email)) {
    return res.status(400).json({ message: "Invalid email address" });
  }

  try {
    const user = await User.findOne({ email: { $eq: email } });
    const createdGroups = user
      ? await NjangiGroup.find({
          adminId: user?.id,
        })
      : [];

    const pendingGroups = await njangiDraftModel.find({
      "accountSetup.email": { $eq: email },
    });

    return res.status(200).json({ createdGroups, pendingGroups });
  } catch (error) {
    res.status(500).json({ message: "Error fetching recent activity", error });
  }
};

export const getDraftInfo = async (req, res) => {
  const { groupId } = req.query;
  try {
    const draft = await njangiDraftModel.findOne({
      _id: { $eq: groupId },
    });

    if (!draft || draft.length === 0) {
      return res.status(404).json({
        message: "No drafts found for this user.",
      });
    }

    res.status(200).json(draft);
  } catch (error) {
    res.status(500).json({ message: "Error fetching drafts", error });
  }
};

export const getStatusHistory = async (req, res) => {
  const { email } = req.query;

  if (!email || !validator.isEmail(email)) {
    return res.status(400).json({ message: "Invalid email address" });
  }

  try {
    const user = await User.findOne({ email: { $eq: email } });

    const createdGroups = user
      ? await NjangiGroup.find({ adminId: user._id })
          .select("name status createdAt")
          .sort({ createdAt: -1 })
      : [];

    const drafts = await njangiDraftModel
      .find({
        "accountSetup.email": { $eq: email },
      })
      .sort({ createdAt: -1 });

    const formatGroup = (group, isDraft = false) => {
      const timeline = [
        {
          status: "submitted",
          date: new Date(group.createdAt).toLocaleDateString(),
          time: new Date(group.createdAt).toLocaleTimeString(),
          description: "Application submitted successfully",
          completed: true,
        },
      ];

      // For approved groups (in createdGroups)
      if (!isDraft) {
        timeline.push({
          status: "approved",
          date: new Date(group.createdAt).toLocaleDateString(),
          time: new Date(group.createdAt).toLocaleTimeString(),
          description: "Application approved by board",
          completed: true,
        });
      }

      return {
        id: group._id,
        groupName: isDraft ? group.groupDetails.groupName : group.name,
        currentStatus: isDraft ? "pending" : "approved",
        timeline,
      };
    };

    const formattedGroups = createdGroups.map((group) => formatGroup(group));
    const formattedDrafts = drafts.map((draft) => formatGroup(draft, true));

    const combinedHistory = [...formattedGroups, ...formattedDrafts].sort(
      (a, b) => new Date(b.timeline[0].date) - new Date(a.timeline[0].date)
    );

    res.status(200).json(combinedHistory);
  } catch (error) {
    res.status(500).json({ message: "Error fetching status history", error });
  }
};

export const getGroupRecentActivities = async (req, res) => {
  const { groupId } = req.params;
  try {
    const activities = await NjangiActivityLog.find({ groupId })
      .sort({ createdAt: -1 })
      .limit(20);

    res.status(200).json(activities);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching recent activities", error });
  }
};

export const getInvitedMembersOfGroup = async (req, res) => {
  const { groupId } = req.params;
  try {
    const invites = await Invite.find({ groupId }).select(
      "email phone status invitedBy expiresAt createdAt updatedAt"
    );
    res.status(200).json(invites);
  } catch (error) {
    res.status(500).json({ message: "Error fetching invited members", error });
  }
};

export const inviteMemberToGroup = async (req, res) => {
  const { groupId } = req.params;
  const adminId = req.user.id;
  const {
    groupName,
    adminFirstName,
    adminLastName,
    contributionFrequency,
    contributionAmount,
  } = req.body;
  // Accepts a single invite or an array of invites
  const invites = Array.isArray(req.body.invites)
    ? req.body.invites
    : [req.body.invite || req.body];

  try {
    const result = await inviteMembersToGroup(
      { invites },
      groupId,
      adminId,
      groupName,
      adminFirstName,
      adminLastName,
      contributionFrequency,
      contributionAmount
    );
    res
      .status(201)
      .json({ message: "Invites sent successfully", invites: result });
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message || "Error inviting member(s)", error });
  }
};

export const getActivityTimeline = async (req, res) => {
  try {
    const { groupId } = req.params;

    // Fetch logs for the group, most recent first, and populate user info
    const logs = await NjangiActivityLog.find({ groupId })
      .sort({ createdAt: -1 })
      .populate("performedBy", "firstName lastName email profilePicUrl")
      .populate("affectedMember", "firstName lastName email profilePicUrl")
      .lean();

    res.status(200).json({ success: true, timeline: logs });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch activity timeline",
      error: error.message,
    });
  }
};
