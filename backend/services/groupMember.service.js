// services/groupMember.service.js
import { GroupMember } from "../models/group.member.model.js";

export const addAdminAsGroupMember = async (groupId, userId) => {
  return GroupMember.create({
    groupId,
    userId,
    role: "admin",
    status: groupStatus === "approved" ? "accepted" : "pending",
    joinedAt: groupStatus === "approved" ? new Date() : null,
  });
};
