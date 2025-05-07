// services/finalizeNjangiFromDraft.js
import  NjangiDraft  from "../models/NjangiDraft.js";
import { createUser } from "./user.service.js";
import { createNjangiGroup } from "./njangi.service.js";
import { addAdminAsGroupMember } from "./groupMember.service.js";
import { inviteMembersToGroup } from "./invite.service.js";

export const finalizeNjangiFromDraft = async (draftId, res) => {
  const draft = await NjangiDraft.findById(draftId);
  if (!draft) throw new Error("Draft not found");

  const { accountSetup, groupDetails, inviteMembers } = draft;

  const adminUser = await createUser(accountSetup, res);
  const group = await createNjangiGroup(groupDetails, adminUser._id);
  await addAdminAsGroupMember(group._id, adminUser._id);
  const invites = await inviteMembersToGroup(
    { invites: inviteMembers },
    group._id,
    adminUser._id,
    group.name
  );

  await NjangiDraft.deleteOne({ _id: draftId });

  return {
    adminUserId: adminUser._id,
    groupId: group._id,
    inviteCount: invites.length,
  };
};
