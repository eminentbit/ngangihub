import njangiDraftModel from "../models/njangi.draft.model.js";
import NjangiGroup from "../models/njangi.group.model.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { config } from "dotenv";

config();

/**
 * Fetch members of a specific group created by an admin
 */
export const getMembersOfGroup = async (req, res) => {
  const { groupId } = req.params;

  try {
    const group = await NjangiGroup.findOne({
      _id: groupId,
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
    const groups = await NjangiGroup.find({ adminId: req.user.id });
    res.status(200).json(groups);
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
      _id: groupId,
      adminId: req.user.id,
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

export const fetchGroupByIdWithoutToken = async (req, res) => {
  console.log(req.query);
  const { groupId } = req.query;

  try {
    const group = await NjangiGroup.findOne({
      _id: groupId,
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

  try {
    const user = await User.findOne({ email });
    console.log("User:", user);

    let createdGroups = [];
    if (user) {
      createdGroups = await NjangiGroup.find({
        adminId: user._id,
      });
    }

    const drafts = await njangiDraftModel.find({
      "accountSetup.email": email,
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

  try {
    const user = await User.findOne({ email });
    const createdGroups = user
      ? await NjangiGroup.find({
          adminId: user?.id,
        })
      : [];

    const pendingGroups = await njangiDraftModel.find({
      "accountSetup.email": email,
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
      _id: groupId,
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
  try {
    const user = await User.findOne({ email });

    const createdGroups = user
      ? await NjangiGroup.find({ adminId: user._id })
          .select("name status createdAt")
          .sort({ createdAt: -1 })
      : [];

    const drafts = await njangiDraftModel
      .find({
        "accountSetup.email": email,
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
