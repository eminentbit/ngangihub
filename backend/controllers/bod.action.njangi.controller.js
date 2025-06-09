import { finalizeNjangiFromDraft } from "../services/finalizeNjangiFromDraft.js";
import NjangiDraft from "../models/njangi.draft.model.js";
import NjangiActivityLog from "../models/njangi.activity.log.model.js";

const actionNjangi = async (req, res) => {
  const { draftId, action, reason } = req.body;
  console.log("Action Njangi Request:", req.body);
  if (!draftId || !action) {
    return res
      .status(400)
      .json({ success: false, message: "Draft ID and action are required." });
  }
  if (action === "reject" && !reason) {
    return res
      .status(400)
      .json({ success: false, message: "Reason for rejection is required." });
  }
  if (!req.user || !req.user.id) {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized: No session found" });
  }
  if (!req.user.isBod) {
    return res
      .status(403)
      .json({ success: false, message: "Forbidden: BOD access required." });
  }
  try {
    if (action == "approve") {
      const result = await finalizeNjangiFromDraft(draftId, res);

      await NjangiActivityLog.create({
        groupId: result.groupId,
        activityType: "NJANGI_CREATION_SUCCESS",
        performedBy: req.user.id,
        affectedMember: result.adminUserId,
        description: "Njangi group created by admin.",
      });

      return res.status(200).json({
        success: true,
        message:
          "Njangi approved and finalized. Redirecting to your Njangi Dashboard...",
        ...result,
      });
    } else if (action == "reject") {
      await NjangiDraft.findByIdAndDelete(draftId);

      await NjangiActivityLog.create({
        groupId: draftId,
        activityType: "NJANGI_CREATION_FAILURE",
        performedBy: req.user.id,
        description: reason
          ? `Njangi group submission rejected because ${reason}`
          : "Njangi group creation failed",
      });
      return res
        .status(200)
        .json({ success: true, message: "Njangi draft rejected and deleted." });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Invalid action." });
    }
  } catch (error) {
    console.log("BOD approval error:", error);
    return res.status(500).json({
      success: false,
      message:
        "An Error occured while approving Njangi. Please try again later.",
    });
  }
};

export default actionNjangi;
