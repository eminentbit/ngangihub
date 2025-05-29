import NjangiDraft from "../models/njangi.draft.model.js";

export const validateDraftId = async (req, res) => {
  const { draftId } = req.query;

  if (!draftId) {
    return res.status(400).json({
      valid: false,
      status: "missing",
      message: "No draft ID provided.",
    });
  }

  try {
    const draft = await NjangiDraft.findById({ _id: draftId });

    if (!draft) {
      return res.status(404).json({
        valid: false,
        status: "invalid",
        message: "Invalid or non-existent draft ID.",
      });
    }

    // Draft is valid
    return res.json({ valid: true, status: "valid", draft });
  } catch (error) {
    console.error("Error validating draft ID:", error);
    res.status(500).json({
      valid: false,
      status: "error",
      message: "Server error validating draft ID.",
    });
  }
};
