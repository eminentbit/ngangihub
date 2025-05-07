// services/groupMember.service.js
import { GroupMember } from "../models/group.member.model.js";

export const addAdminAsGroupMember = async (groupId, userId, groupStatus) => {
  return GroupMember.create({
    groupId,
    userId,
    role: "admin",
    status: groupStatus === "approved" ? "accepted" : "invited",
    joinedAt: groupStatus === "approved" ? new Date() : null,
  });
};
