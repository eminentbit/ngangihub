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

/**
 * Get submission statistics for a group
 */
export const getSubmissionStats = async (req, res) => {
  const { groupId, email } = req.query;
  console.log(
    "Fetching submission stats for groupId:",
    groupId,
    "and email:",
    email
  );

  try {
    const user = await User.findOne({ email });

    const createdGroups = await NjangiGroup.find({
      adminId: user._id,
    });

    const drafts = await njangiDraftModel.find({
      accountSetup: { email: user.email },
    });

    if (!createdGroups || createdGroups.length === 0) {
      return res.status(404).json({
        message: "Group not found or not owned by this admin.",
      });
    }

    const createdGroupsCount = createdGroups.length;
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
