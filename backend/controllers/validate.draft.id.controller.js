import NjangiDraft from "../models/njangi.draft.model.js";
import NjangiGroup from "../models/njangigroup.model.js";

export const validateDraftId = async (req, res) => {
  const { draftId } = req.query;
  const draftUserToken =
    req.cookies?.draftUserToken || req.headers["x-draft-user-token"];

  console.log("Draft id form req query" + draftId);
  console.log("Draft user token from cookies or headers: " + draftUserToken);

  if (!draftId) {
    return res.status(400).json({
      valid: false,
      status: "missing",
      message: "No draft ID provided.",
    });
  }

  try {
    const draft = await NjangiDraft.findById({ _id: draftId });

    // Fetch the NjangiGroup using the draftId
    const group = await NjangiGroup.findOne({ draftId });
    if (!draft) {
      return res.status(404).json({
        valid: false,
        status: "invalid",
        message: "Invalid or non-existent draft ID.",
      });
    }
    // Redirect if BOTH: user has no other drafts AND Njangi is approved
    if (draftUserToken) {
      const userDraftCount = await NjangiDraft.countDocuments({
        draftUserToken,
      });
      if (userDraftCount === 0 && group && group.status === "approved") {
        return res.status(200).json({
          valid: false,
          status: "redirect",
          message:
            "Njangi approved and no drafts found. Please login to continue.",
        });
      }
    }

    // If no draft and Njangi is approved
    if (!draft && group && group.status === "approved") {
      return res.status(403).json({
        valid: false,
        status: "redirect",
        message: "Njangi approved! Please login to continue...",
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
