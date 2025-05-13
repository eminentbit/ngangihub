// this file is responsible for handling the logic of inviting members to a group
// and sending them an invite link. It includes functions to create invites,

import Invite from "../models/invite.model.js";
import NjangiGroup from "../models/njangigroup.model.js";
import User from "../models/user.model.js";
import { generateToken, sendInvite } from "../utils/inviteUtils.js";

export const inviteMembersToGroup = async (
  inviteMembers,
  groupId,
  adminId,
  groupName,
  adminFirstName,
  adminLastName
) => {
  const group = await NjangiGroup.findById(groupId);
  if (!group) throw new Error("Group not found");

  const invites = await Promise.all(
    inviteMembers.invites.map(async (invite) => {
      const contact = invite.contact || invite.emailOrPhone;
      if (!contact) throw new Error("Missing contact for invite");

      // Avoid duplicate invites
      const existingInvite = await Invite.findOne({
        groupId,
        emailOrPhone: contact,
      });
      if (existingInvite) return existingInvite;

      // Check if user exists (just for logging or future use)
      const user = await User.findOne({
        $or: [{ email: contact }, { phoneNumber: contact }],
      });

      // Generate invite token
      const token = generateToken();

      // Save invite
      const newInvite = await Invite.create({
        groupId,
        emailOrPhone: contact,
        inviteToken: token,
        invitedBy: adminId,
        status: "pending",
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24), // 24h
      });

      // Send SMS/email invite
      await sendInvite(
        contact,
        token,
        groupName,
        adminFirstName,
        adminLastName
      );

      return newInvite;
    })
  );

  return invites;
};
