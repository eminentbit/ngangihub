import { finalizeNjangiFromDraft } from "../services/finalizeNjangiFromDraft.js";

export const approveNjangi = async (req, res) => {
  const { draftId, action } = req.body;

  try {
    if (action === "approve") {
      const result = await finalizeNjangiFromDraft(draftId, res);
      res.status(200).json({
        success: true,
        message: "Njangi approved and finalized.",
        ...result,
      });
    } else if (action === "reject") {
      await NjangiDraft.findByIdAndDelete(draftId);
      res.status(200).json({ success: true, message: "Njangi draft rejected and deleted." });
    } else {
      res.status(400).json({ success: false, message: "Invalid action." });
    }
  } catch (error) {
    console.error("BOD approval error:", error);
    res.status(500).json({ success: false, message: "Approval error." });
  }
};
