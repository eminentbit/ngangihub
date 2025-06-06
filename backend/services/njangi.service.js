// services/njangi.service.js
import NjangiGroup from "../models/njangi.group.model.js";
export const createNjangiGroup = async (groupDetails, adminId, draftId) => {
  // check if njangi group with the same name already exists
  const existingGroup = await NjangiGroup.findOne({
    name: groupDetails.groupName,
  });
  if (existingGroup) {
    throw new Error("Please choose a different name for your Njangi group.");
  }

  return NjangiGroup.create({
    name: groupDetails.groupName,
    adminId,
    contributionAmount: Number(groupDetails.contributionAmount),
    contributionFrequency: groupDetails.contributionFrequency,
    draftId,
    payoutMethod: groupDetails.payoutMethod,
    startDate: new Date(groupDetails.startDate),
    endDate: groupDetails.endDate ? new Date(groupDetails.endDate) : null,
    expectedMembers: Number(groupDetails.numberOfMember) || undefined,
    rules: groupDetails.rules,
    status: "approved",
    createdAt: new Date(),
  });
};
