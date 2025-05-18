// services/createNjangiFlow.js
import bcrypt from "bcryptjs";
import NjangiDraft from "../models/njangi.draft.model.js";
import NjangiGroup from "../models/njangigroup.model.js";
import User from "../models/user.model.js";
import dotenv from "dotenv";
dotenv.config();

/**
 * Creates a Njangi draft document from the given form data
 * @param {Object} formData - form data from the Njangi creation form
 * @returns {Object} An object with the created draftId
 */
const createNjangiFlow = async (formData) => {
  try {
    const { accountSetup, groupDetails, inviteMembers } = formData;

    // Check for existing user
    const existingUser = await User.findOne({ email: accountSetup.email });
    if (existingUser) {
      console.log("User already exists with email:", accountSetup.email);
      throw new Error("A user with this email already exists.");
    }

    // Check for existing Njangi group
    const existingNjangi = await NjangiGroup.findOne({
      "groupDetails.groupName": groupDetails.groupName,
    });
    if (existingNjangi) {
      console.log("Group already exists with name:", groupDetails.groupName);
      throw new Error("A Njangi group with this name already exists.");
    }

    // Check for duplicate invite contacts
    const inviteContacts = inviteMembers.map((m) => m.contact);
    const uniqueContacts = new Set(inviteContacts);
    if (inviteContacts.length !== uniqueContacts.size) {
      console.log("Duplicate invite contacts found:", inviteContacts);
      throw new Error("Duplicate invites found in the invite list.");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(accountSetup.password, 15);

    // Ensure groupDetails has proper Date objects
    const parsedGroupDetails = {
      ...groupDetails,
      startDate: groupDetails.startDate
        ? new Date(groupDetails.startDate)
        : null,
      endDate: groupDetails.endDate ? new Date(groupDetails.endDate) : null,
    };

    inviteMembers.map((member) => {
      // Send invitation email
      transporter.sendMail({
        from: process.env.SENDER_EMAIL,
        to: member.contact,
        subject: "Invitation to join Njangi Group",
        html: `
          <h2>You've been invited to join a Njangi Group!</h2>
          <p>You have been invited to join ${groupDetails.groupName}.</p>
          <p>The group will start on ${groupDetails.startDate.toLocaleDateString()}.</p>
          <p>Click the link below to accept the invitation and join the group:</p>
          <a href="${process.env.FRONTEND_URL}/join-njangi/${
          draft._id
        }">Accept Invitation</a>
          <p>Best regards,</p>
          <p>The Njangi Team</p>
        `,
      });
    });

    // Create and save Njangi draft
    const draft = await NjangiDraft.create({
      accountSetup: {
        ...accountSetup,
        password: hashedPassword,
      },
      groupDetails: parsedGroupDetails,
      inviteMembers,
    });

    console.log("Njangi draft created:", draft._id);
    return { draftId: draft._id };
  } catch (error) {
    console.error("Error creating Njangi draft:", error.message);
    throw error;
  }
};

export default createNjangiFlow;
