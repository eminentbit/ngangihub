import { User } from "../models/user.model.js";
import { NjangiGroup } from "../models/njangigroup.model.js";

/** This file contains validation functions that validates user info and group name opon filling form */

export const validateEmail = async (req, res) => {
  const { email } = req.query;
  console.log(`Validating email: ${email}`);
  const exists = await User.exists({ email });
  res.json({ valid: !exists });
};

export const validateGroupName = async (req, res) => {
  const { groupName } = req.query;
  console.log(`Validating group name: ${groupName}`);
  const exists = await NjangiGroup.exists({ name: groupName });
  res.json({ valid: !exists });
};
