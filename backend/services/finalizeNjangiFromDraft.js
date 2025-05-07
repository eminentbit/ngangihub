// services/finalizeNjangiFromDraft.js
import NjangiDraft from "../models/NjangiDrafts.js";
import { createUser } from "./user.service.js";
import { createNjangiGroup } from "./njangi.service.js";
import { addAdminAsGroupMember } from "./groupMember.service.js";
import { inviteMembersToGroup } from "./invite.service.js";
import { User } from "../models/user.model.js";

export const finalizeNjangiFromDraft = async (draftId, res) => {
  const draft = await NjangiDraft.findById(draftId);
  if (!draft) throw new Error("Draft not found");

  const { accountSetup, groupDetails, inviteMembers } = draft;

  // create the user(admin or member)
  const adminUser = await createUser(accountSetup, res, "admin", "verified");

  // Update role and status
  if (adminUser.status !== "active") {
    adminUser.status = "active";
  }
  if (adminUser.role !== "admin") {
    adminUser.role = "admin";
  }
  await adminUser.save();

  const group = await createNjangiGroup(groupDetails, adminUser._id);

  // Add admin as first group member in Njangigroup model
  group.groupMembers.push(adminUser._id);
  await group.save();

  // add user to group members in GroupMember model

  await addAdminAsGroupMember(group._id, adminUser._id, group.status);

  //Update users group array
  await User.findByIdAndUpdate(adminUser._id, {
    $push: { groups: group._id },
  });

  const invites = await inviteMembersToGroup(
    { invites: inviteMembers },
    group._id,
    adminUser._id,
    group.name
  );

  // delete the draft after finalizing
  await NjangiDraft.deleteOne({ _id: draftId });

  return {
    adminUserId: adminUser._id,
    groupId: group._id,
    inviteCount: invites.length,
  };
};
