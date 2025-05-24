// services/finalizeNjangiFromDraft.js
import NjangiDraft from "../models/njangi.draft.model.js";
import User from "../models/user.model.js";
import { createUser } from "./user.service.js";
import { createNjangiGroup } from "./njangi.service.js";
import { addAdminAsGroupMember } from "./groupMember.service.js";
import { inviteMembersToGroup } from "./invite.service.js";
import { sendNjangiCreatedApprovalEmail } from "../mail/emails.js";

export const finalizeNjangiFromDraft = async (draftId, res) => {
  const draft = await NjangiDraft.findById(draftId);
  if (!draft) throw new Error("Draft not found! Please try again.");

  const { accountSetup, groupDetails, inviteMembers } = draft;

  // 1) accountSetup

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

  // 2) groupDetails
  const group = await createNjangiGroup(groupDetails, adminUser._id, draftId);

  // Add admin as first group member in Njangigroup model
  group.groupMembers.push(adminUser._id);
  await group.save();

  // add user to group members in GroupMember model

  await addAdminAsGroupMember(group._id, adminUser._id, group.status);

  //Update users group array
  await User.findByIdAndUpdate(adminUser._id, {
    $push: { groups: group._id },
  });

  // 3) inviteMembers
  const invites = await inviteMembersToGroup(
    { invites: inviteMembers },
    group._id,
    adminUser._id,
    group.name,
    adminUser.firstName,
    adminUser.lastName,
    groupDetails.contributionFrequency,
    groupDetails.contributionAmount
  );

  console.log(
    `Njangi group created with ID: ${group._id} and admin user ID: ${adminUser._id}`
  );
  console.log(
    `Invites sent to ${invites.length} members for group ID: ${group._id}`
  );

  //send approve invite to the admin after creation
  await sendNjangiCreatedApprovalEmail(
    adminUser.email,
    `${accountSetup.firstName} ${accountSetup.lastName}`,
    groupDetails.groupName,
    draft.createdAt,
    groupDetails.numberOfMember || null,
    groupDetails.contributionAmount,
    `${process.env.ADMIN_DASHBOARD_URL}`
  );
  console.log(
    `Njangi created approval email sent to ${adminUser.email}`
  );

  // delete the draft after finalizing
  await NjangiDraft.deleteOne({ _id: draftId });

  return {
    adminUserId: adminUser._id,
    groupId: group._id,
    inviteCount: invites.length,
  };
};
