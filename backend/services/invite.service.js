// services/invite.service.js
import { Invite } from "../models/invite.model.js";
import { generateToken, sendInvite } from "../utils/inviteUtils.js";

export const inviteMembersToGroup = async (
  inviteMembers,
  groupId,
  adminId,
  groupName
) => {
  return Promise.all(
    inviteMembers.invites.map(async (invite) => {
      const token = generateToken();
      const newInvite = await Invite.create({
        groupId,
        emailOrPhone: invite.contact,
        inviteToken: token,
        invitedBy: adminId,
        status: "pending",
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
      });

      await sendInvite(invite.contact, token, groupName);
      return newInvite;
    })
  );
};
