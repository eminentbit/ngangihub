import bcrypt from "bcryptjs";
import  NjangiDraft  from "../models/NjangiDrafts.js";
import {  NjangiGroup } from "../models/njangigroup.model.js";
import { User } from "../models/user.model.js";

/**
 * Creates a Njangi draft document from the given form data
 * @param {Object} formData - form data from the Njangi creation form
 * @returns {Object} An object with a single property, draftId, which is the ID of the created Njangi draft document
 * @throws {Error} If validation fails or database creation fails
 */
export const createNjangiFlow = async (formData) => {
  try {
    const { accountSetup, groupDetails, inviteMembers } = formData;

    const existingUser = await User.findOne({ email: accountSetup.email });
    if (existingUser) {
      throw new Error("A user with this email already exists.");
    }

    //  Reject if Njangi group name already exists
    const existingNjangi = await NjangiGroup.findOne({
      "groupDetails.groupName": groupDetails.groupName,
    });
    if (existingNjangi) {
      throw new Error("A Njangi group with this name already exists.");
    }

    //  Reject if invite list contains duplicates
    const inviteContacts = inviteMembers.map((m) => m.contact);
    const uniqueContacts = new Set(inviteContacts);
    if (inviteContacts.length !== uniqueContacts.size) {
      throw new Error("Duplicate invites found in the invite list.");
    }

    //  Hash password before saving
    const hashedPassword = await bcrypt.hash(accountSetup.password, 15);

    //  Create the draft safely
    const draft = await NjangiDraft.create({
      ...formData,
      accountSetup: {
        ...accountSetup,
        password: hashedPassword,
      },
    });

    return { draftId: draft._id };
  } catch (error) {
    console.log("Error creating Njangi draft:", error.message);
    throw error;
  }
};
