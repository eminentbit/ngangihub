import NjangiDrafts from "../models/NjangiDrafts.js";
import { User } from "../models/user.model.js";
import { NjangiGroup } from "../models/njangigroup.model.js";

/**
 * Validates whether an email is already used in a NjangiDraft (temporary creation).
 * This helps prevent duplicate signups during the Njangi creation process.
 */
export const validateEmail = async (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ valid: false, message: "Email is required" });
  }

  try {
    console.log(`Validating email: ${email}`);

    const [inDraft, inUsers] = await Promise.all([
      NjangiDrafts.exists({ "accountSetup.email": email }),
      User.exists({ email }),
    ]);

    const exists = inDraft || inUsers;

    res.json({ valid: !exists });
  } catch (error) {
    res
      .status(500)
      .json({ valid: false, message: "Server error validating email" });
  }
};

/**
 * Validates whether a Njangi group name is already used in a NjangiDraft.
 * Prevents users from creating drafts with conflicting names.
 */
export const validateGroupName = async (req, res) => {
  const { groupName } = req.query;

  if (!groupName) {
    return res
      .status(400)
      .json({ valid: false, message: "Group name is required" });
  }

  try {
    console.log(`Validating group name: ${groupName}`);

    // Trim and sanitize the group name
    const sanitizedGroupName = groupName.trim();

    const [inDrafts, inGroups] = await Promise.all([
      NjangiDrafts.exists({
        "groupDetails.groupName": {
          $regex: new RegExp(`^${sanitizedGroupName}$`, "i"),
        },
      }),
      NjangiGroup.exists({
        name: { $regex: new RegExp(`^${sanitizedGroupName}$`, "i") },
      }),
    ]);

    const exists = inDrafts || inGroups;
    res.json({ valid: !exists });
  } catch (error) {
    res
      .status(500)
      .json({ valid: false, message: "Server error validating group name" });
  }
};
