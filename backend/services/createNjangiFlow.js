import NjangiDraft from "../models/NjangiDrafts.js";

export const createNjangiFlow = async (formData) => {
  const draft = await NjangiDraft.create(formData);
  return { draftId: draft._id };
};
