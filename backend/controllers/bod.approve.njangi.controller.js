import { finalizeNjangiFromDraft } from "../services/finalizeNjangiFromDraft.js";
import NjangiDraft from "../models/NjangiDrafts.js";

export const approveNjangi = async (req, res) => {
  const { draftId, action } = req.body;

  try {
    if (action === "approve") {
      const result = await finalizeNjangiFromDraft(draftId, res); 
      return res.status(200).json({
        success: true,
        message: "Njangi approved and finalized. Redirecting to your Njangi Dashboard...",
        ...result,
      });
    } else if (action === "reject") {
      await NjangiDraft.findByIdAndDelete(draftId);
      return res.status(200).json({ success: true, message: "Njangi draft rejected and deleted." });
    } else {
      return res.status(400).json({ success: false, message: "Invalid action." });
    }
  } catch (error) {
    console.log("BOD approval error:", error);
    return res.status(500).json({ success: false, message: "Approval error." });
  }
};
