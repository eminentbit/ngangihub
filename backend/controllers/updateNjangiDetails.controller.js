import njangiDraftModel from "../models/njangi.draft.model.js";

export const updateNjangiDetails = async (req, res) => {
  const { draftId } = req.query;

  if (!draftId) {
    return res
      .status(400)
      .json({ sucess: false, message: "draftId is required" });
  }

  try {
    // Fetch the draft first
    const draft = await njangiDraftModel.findById({ _id: draftId });
    if (!draft) {
      return res
        .status(404)
        .json({
          sucess: false,
          message: "Njangi not found for the given draftId!",
        });
    }

    // Check if within 24 hours of creation
    const createdAt = draft.createdAt;
    const now = new Date();
    const diffMs = now - createdAt;
    const hours24 = 24 * 60 * 60 * 1000;
    if (diffMs > hours24) {
      return res
        .status(403)
        .json({
          sucess: false,
          message: "Editing is only allowed within 24 hours of creation.",
        });
    }

    // Proceed with update
    const {
      groupName,
      contributionAmount,
      contributionFrequency,
      numberOfMember,
      startDate,
      endDate,
      payoutMethod,
      rules,
    } = req.body;

    const update = {
      "groupDetails.groupName": groupName,
      "groupDetails.contributionAmount": contributionAmount,
      "groupDetails.contributionFrequency": contributionFrequency,
      "groupDetails.numberOfMember": numberOfMember,
      "groupDetails.startDate": new Date(startDate),
      "groupDetails.endDate": new Date(endDate),
      "groupDetails.payoutMethod": payoutMethod,
      "groupDetails.rules": rules,
      updatedAt: new Date(),
    };

    const njangi = await njangiDraftModel.findByIdAndUpdate(
      draftId,
      { $set: update },
      { new: true }
    );

    res
      .status(200)
      .json({ sucess: true, message: "Njangi details updated successfully!" });
  } catch (error) {
    res.status(500).json({ sucess: false, message: error.message });
  }
};
