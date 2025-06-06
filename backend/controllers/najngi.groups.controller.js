import NjangiGroup from "../models/njangi.group.model.js";

// Get all groups
export const fetchAllGroups = async (req, res) => {
  try {
    const groups = await NjangiGroup.find();
    const modifiedGroups = groups.map((group) => ({
      ...group._doc,
      isAdmin: group.adminId == req.user.id,
    }));

    return res.status(200).json({
      status: "success",
      groups: modifiedGroups,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error fetching groups",
      error: error.message,
    });
  }
};
