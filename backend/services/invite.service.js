import { Invite } from "../models/invite.model.js";
import { User } from "../models/user.model.js";
import { GroupMember } from "../models/group.member.model.js";
import { NjangiGroup } from "../models/njangigroup.model.js";
import { generateToken, sendInvite } from "../utils/inviteUtils.js";

export const inviteMembersToGroup = async (
  inviteMembers,
  groupId,
  adminId,
  groupName
) => {
  const group = await NjangiGroup.findById(groupId);
  if (!group) throw new Error("Group not found");

  return Promise.all(
    inviteMembers.invites.map(async (invite) => {
      const contact = invite.contact || invite.emailOrPhone;
      if (!contact) throw new Error("Missing contact for invite");

      // 1. Find or create user
      let user = await User.findOne({ email: contact });
      if (!user) {
        user = await User.create({
          firstName: invite.firstName || "Unknown",
          lastName: invite.lastName || "User",
          email: contact,
          phoneNumber: "999" + Math.floor(1000000 + Math.random() * 9000000).toString(), // to be updated later
          passwordHash: "placeholder", //to be updated later
          status: "invited",
          isVerified: false,
        });
      }

      // 2. Create group member
      await GroupMember.create({
        groupId,
        userId: user._id,
        role: "member",
        status: "invited",
        joinedAt: null,
      });

      // 3. Add user to group.members if not already added
      if (!group.groupMembers.includes(user._id)) {
        group.groupMembers.push(user._id);
      }

      // 4. Send invite + store invite document
      const token = generateToken();
      const newInvite = await Invite.create({
        groupId,
        emailOrPhone: contact,
        inviteToken: token,
        invitedBy: adminId,
        status: "pending",
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
      });

      await sendInvite(contact, token, groupName);
      return newInvite;
    })
  ).then(async (invites) => {
    await group.save();
    return invites;
  });
};
