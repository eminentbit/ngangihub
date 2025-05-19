// services/createNjangiFlow.js
import bcrypt from "bcryptjs";
import NjangiDraft from "../models/njangi.draft.model.js";
import NjangiGroup from "../models/njangigroup.model.js";
import User from "../models/user.model.js";
import dotenv from "dotenv";
import emailQueue from "../bullMQ/queues/emailQueue.js";
// import { sendNjangiCreatedPendingEmail } from "../mailtrap/emails.js";
dotenv.config();

const viewURL = process.env.FRONTEND_URL || "http://localhost:5173";

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
    const hashedPassword = await bcrypt.hash(accountSetup.password, 20);

    // Ensure groupDetails has proper Date objects
    const parsedGroupDetails = {
      ...groupDetails,
      startDate: groupDetails.startDate
        ? new Date(groupDetails.startDate)
        : null,
      endDate: groupDetails.endDate ? new Date(groupDetails.endDate) : null,
    };

    console.time("💾 Save draft to Mongo");
    // Create and save Njangi draft
    const draft = await NjangiDraft.create({
      accountSetup: {
        ...accountSetup,
        password: hashedPassword,
      },
      groupDetails: parsedGroupDetails,
      inviteMembers,
    });
    console.timeEnd("💾 Save draft to Mongo");

    // Add email job to Redis
    console.time("📬 Add email job to Redis");
    await emailQueue.add(
      "send-njangi-pending-email",
      {
        email: accountSetup.email,
        userName: `${accountSetup.firstName} ${accountSetup.lastName}`,
        groupName: groupDetails.groupName,
        creationDate: draft.createdAt,
        memberCount: groupDetails.numberOfMember || 0,
        contributionAmount: groupDetails.contributionAmount,
        viewURL,
      },
      {
        removeOnComplete: true, // Optional: auto-remove from Redis when done
        attempts: 3, // Retry email 3 times if it fails
        backoff: { type: "exponential", delay: 1000 }, // Retry with delay
      }
    );
    console.timeEnd("📬 Add email job to Redis");

    console.log("Njangi draft created:", draft._id);
    return { draftId: draft._id };
  } catch (error) {
    console.error("Error creating Njangi draft:", error.message);
    throw error;
  }
};

export default createNjangiFlow;
