// services/createNjangiFlow.js
import { createUser } from "./user.service.js";
import { createNjangiGroup } from "./njangi.service.js";
import { addAdminAsGroupMember } from "./groupMember.service.js";
import { inviteMembersToGroup } from "./invite.service.js";

export const createNjangiFlow = async (formData) => {
  const { accountSetup, groupDetails, inviteMembers } = formData;

  const adminUser = await createUser(accountSetup);
  const group = await createNjangiGroup(groupDetails, adminUser._id);
  await addAdminAsGroupMember(group._id, adminUser._id);
  const invites = await inviteMembersToGroup(
    inviteMembers,
    group._id,
    adminUser._id,
    group.name
  );

  return {
    adminUserId: adminUser._id,
    groupId: group._id,
    inviteCount: invites.length,
  };
};
