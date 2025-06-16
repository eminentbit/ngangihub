import express from "express";
import limiter from "../middleware/limiter.js";
import {
  getAllMembersOfAdminGroups,
  getMembersOfGroup,
  getAdminGroups as fetchAllAdminGroups,
  fetchGroupById,
  getSubmissionStats,
  getRecentActivity,
  fetchGroupByIdWithoutToken,
  getDraftInfo,
  getStatusHistory,
  getGroupRecentActivities,
  getInvitedMembersOfGroup,
  getActivityTimeline,
  addMemberToGroup,
  cancelInvite,
  removeMember,
} from "../controllers/admin.controllers.js";
import verifyToken from "../middleware/verify.token.js";
import { verifyIfAdmin } from "../middleware/verify.role.js";
const router = express.Router();

router.use("/", limiter);

router.get(
  "/group/members",
  verifyToken,
  verifyIfAdmin,
  getAllMembersOfAdminGroups
);
router.get(
  "/group/:groupId/members",
  verifyToken,
  verifyIfAdmin,
  getMembersOfGroup
);

router.get("/groups", verifyToken, fetchAllAdminGroups);

router.get("/group/:groupId", verifyToken, verifyIfAdmin, fetchGroupById);

router.get("/group/get-info", fetchGroupByIdWithoutToken);

router.get("/drafts", getDraftInfo);

router.get("/submission-stats/", getSubmissionStats);

router.get("/recent-activity", getRecentActivity);

router.get("/status-history", getStatusHistory);

router.get(
  "/group/:groupId/recent-activities",
  verifyToken,
  getGroupRecentActivities
);

router.get(
  "/group/:groupId/invited-members",
  verifyToken,
  getInvitedMembersOfGroup
);
router.post(
  "/group/:groupId/add-member",
  verifyToken,
  verifyIfAdmin,
  addMemberToGroup
);

router.get(
  "/group/:groupId/activity-timeline",
  verifyToken,
  getActivityTimeline
);

// cancel invites for a group
router.delete(
  "/group/:groupId/cancel-invites",
  verifyToken,
  verifyIfAdmin,
  cancelInvite
);

// remove member
router.delete(
  "/group/:groupId/remove-member/:userId",
  verifyToken,
  verifyIfAdmin,
  removeMember
)

export default router;
