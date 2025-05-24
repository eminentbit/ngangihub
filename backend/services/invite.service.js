// this file is responsible for handling the logic of inviting members to a group
// and sending them an invite link. It includes functions to create invites,
import crypto from "crypto";
import Invite from "../models/invite.model.js";
import NjangiGroup from "../models/njangigroup.model.js";
import User from "../models/user.model.js";
import { sendNjangiAleadyAddMemberEmail } from "../mail/emails.js";

// Utility function to generate a random token for invites
const generateToken = () => crypto.randomBytes(20).toString("hex");

export const inviteMembersToGroup = async (
  inviteMembers,
  groupId,
  adminId,
  groupName,
  adminFirstName,
  adminLastName,
  contributionFrequency,
  contributionAmount
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
      const Invitetoken = generateToken();

      // Utility function to check if a string is an email
      const isEmail = (contact) => /\S+@\S+\.\S+/.test(contact);

      // Save invite
      const newInvite = await Invite.create({
        groupId,
        emailOrPhone: contact,
        inviteToken: token,
        invitedBy: adminId,
        status: "pending",
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24), // 24h
      });

      // Print the contact for debugging
      console.log("Inviting contact form invite.servic: ", contact);

      // Send email invite only if contact is an email. Will implement SMS invite later
      if (isEmail(contact)) {
        await sendNjangiAleadyAddMemberEmail(
          contact,
          "Hi there",
          `${adminFirstName} ${adminLastName}`,
          contributionAmount,
          contributionFrequency,
          Invitetoken, //will need to be a link to a password generated invite page or sign up page
          groupName
        );
      }

      return newInvite;
    })
  );

  return invites;
};
