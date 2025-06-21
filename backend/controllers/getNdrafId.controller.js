/**
 * Gets the draftid base on getOrSetDraftUserToken, but not a better approach
 */

import NjangiDraft from "../models/njangi.draft.model.js";
import { getOrSetDraftUserToken } from "../utils/getOrSetDraftUserToken.js";

const getNjangiDraftId = async (req, res) => {
  try {
    const draftUserToken = getOrSetDraftUserToken(req, res);

    const draft = await NjangiDraft.findOne({
      draftUserToken,
      "groupDetails.status": "pending",
    }).sort({ createdAt: -1 });

    if (!draft) {
      return res.status(404).json({ draftId: null });
    }

    console.log("Draft ID form getNjangiDraftId controller: ", draft._id);

    res.status(200).json({ draftId: draft._id });
  } catch (err) {
    console.error("Error fetching Njangi draft:", err.message);
    res.status(500).json({ error: "Could not fetch draft" });
  }
};

export default getNjangiDraftId;
