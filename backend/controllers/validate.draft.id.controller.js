import NjangiDraft from "../models/njangi.draft.model.js";
import NjangiGroup from "../models/njangi.group.model.js";

export const validateDraftId = async (req, res) => {
  const { draftId } = req.query;
  const draftUserToken =
    req.cookies?.draftUserToken || req.headers["x-draft-user-token"];

  if (!draftId) {
    return res.status(400).json({
      valid: false,
      status: "missing",
      message: "No draft ID provided.",
    });
  }

  try {
    // Check if Njangi has been approved using the draftId
    const group = await NjangiGroup.findOne({ draftId });

    if (group && group.status === "approved") {
      return res.status(200).json({
        valid: false,
        status: "redirect",
        message: "Njangi already approved. Please login to continue.",
      });
    }

    // Check for the draft
    const draft = await NjangiDraft.findById({ _id: draftId });

    if (!draft) {
      return res.status(404).json({
        valid: false,
        status: "invalid",
        message: "Invalid or non-existent draft ID.",
      });
    }

    // Check if user has no other drafts but Njangi was approved
    if (draftUserToken) {
      const userDraftCount = await NjangiDraft.countDocuments({ draftUserToken });

      if (userDraftCount === 0 && group && group.status === "approved") {
        return res.status(200).json({
          valid: false,
          status: "redirect",
          message: "Njangi approved and no drafts found. Please login to continue.",
        });
      }
    }

    // Step 4: Valid draft
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

