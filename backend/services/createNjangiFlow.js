import NjangiDraft from "../models/NjangiDrafts.js";

/**
 * Creates a Njangi draft document from the given form data
 * @param {Object} formData - form data from the Njangi creation form
 * @returns {Object} An object with a single property, draftId, which is the ID of the created Njangi draft document
 * @throws {Error} If there is an error while creating the Njangi draft document
 */
export const createNjangiFlow = async (formData) => {
  try {
    const draft = await NjangiDraft.create(formData);
    return { draftId: draft._id };
  } catch (error) {
    console.log("Error creating Njangi draft:", error);
    throw error;
  }
};

