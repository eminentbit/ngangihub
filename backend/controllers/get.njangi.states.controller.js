import NjangiDraft from "../models/njangi.draft.model.js";

/**
 * GET /api/njangi/overview?njangiId=...
 * Returns overview stats for a specific Njangi group
 */
export const getNjangiOverview = async (req, res) => {
  const { njangiId } = req.query;

  if (!njangiId) {
    return res
      .status(400)
      .json({ success: false, message: "njangiId is required" });
  }

  try {
    // Find the Njangi draft by _id
    const njangi = await NjangiDraft.findOne({ _id: njangiId });

    if (!njangi) {
      return res.status(404).json({ message: "Njangi not found" });
    }

    // Count all submissions by this user's draftUserToken
    const totalSubmissions = await NjangiDraft.countDocuments({
      draftUserToken: njangi.draftUserToken,
    });

    // Count status breakdown for this user's drafts
    const approved = await NjangiDraft.countDocuments({
      draftUserToken: njangi.draftUserToken,
      "groupDetails.status": "approved",
    });
    const pending = await NjangiDraft.countDocuments({
      draftUserToken: njangi.draftUserToken,
      "groupDetails.status": "pending",
    });
    const rejected = await NjangiDraft.countDocuments({
      draftUserToken: njangi.draftUserToken,
      "groupDetails.status": "rejected",
    });

    // Fetch recent activities (last 5 submissions for this user)
    const recentActivities = await NjangiDraft.find({
      draftUserToken: njangi.draftUserToken,
    })
      .sort({ submittedAt: -1 }) // newest first
      .limit(5);

    // Map to a simple shape for the frontend
    const recentActivitiesArray = recentActivities.map((item) => ({
      groupName: item.groupDetails?.groupName || "",
      submittedDate: item.submittedAt || item.createdAt || "",
      status: item.groupDetails?.status || "",
    }));

    res.json({
      totalSubmissions,
      approved,
      pending,
      rejected,
      status: njangi.groupDetails.status || "",
      groupName: njangi.groupDetails.groupName || "",
      submittedDate: njangi.submittedAt || njangi.createdAt || "",
      recentActivities: recentActivitiesArray,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getMyNjangis = async (req, res) => {
  const { njangiId } = req.query;

  if (!njangiId) {
    return res
      .status(400)
      .json({ success: false, message: "njangiId is required" });
  }
  try {
    // Assuming you have a model NjangiState to fetch the state data
    const njangis = await NjangiDraft.findOne({ _id: njangiId });
    if (!njangis) {
      return res
        .status(404)
        .json({ message: "No Njangi state found for this user" });
    }

    //Find all submissions by this user
    const mynjangis = await NjangiDraft.find({
      draftUserToken: njangis.draftUserToken,
    });


    // Map to the response shape expected by the frontend
    const response = mynjangis.map((njangi) => ({
      njangiID: njangi._id.toString(),
      njangiName: njangi.groupDetails?.groupName || "",
      startDate: njangi.groupDetails?.startDate || "",
      submittonDate: njangi.submittedAt || njangi.createdAt || "",
      numberOfMember: njangi.groupDetails?.numberOfMember?.toString() || "",
      contributionAmmount:
        njangi.groupDetails?.contributionAmount?.toString() || "",
      status: njangi.groupDetails?.status || "",
      contributionFrequency: njangi.groupDetails?.contributionFrequency || "",
    }));

    res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching Njangi state:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getMyNjangiDetails = async (req, res) => {
  const { njangiId } = req.query;

  if (!njangiId) {
    return res
      .status(400)
      .json({ success: false, message: "njangiId is required" });
  }
  try {
    // First, find the draft to get the draftUserToken
    const njangi = await NjangiDraft.findOne({ _id: njangiId });
    if (!njangi) {
      return res
        .status(404)
        .json({ message: "No Njangi details found for this user" });
    }

    // Now, fetch all drafts with the same draftUserToken
    const njangiDetails = await NjangiDraft.find({
      draftUserToken: njangi.draftUserToken,
    });

    res.status(200).json(njangiDetails);
  } catch (error) {
    console.error("Error fetching Njangi details:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getMyNjangiStatus = async (req, res) => {
  const { njangiId } = req.query;
  if (!njangiId) {
    return res
      .status(400)
      .json({ success: false, message: "NjangiId is required" });
  }
  try {
    // Assuming you have a model NjangiState to fetch the status
    const njangiStatus = await NjangiDraft.findOne({ _id: njangiId });

    if (!njangiStatus) {
      return res
        .status(404)
        .json({ message: "No Njangi status found for this user" });
    }

    // Count status breakdown for this user's drafts
    const approved = await NjangiDraft.countDocuments({
      draftUserToken: njangiStatus.draftUserToken,
      "groupDetails.status": "approved",
    });
    const pending = await NjangiDraft.countDocuments({
      draftUserToken: njangiStatus.draftUserToken,
      "groupDetails.status": "pending",
    });

    res.json({
      approved,
      pending,
      status: njangiStatus.groupDetails.status || "",
      date: njangiStatus.submittedAt || njangiStatus.createdAt || "",
    });
  } catch (error) {
    console.error("Error fetching Njangi status:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
