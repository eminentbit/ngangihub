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

router.get("/groups", verifyToken, verifyIfAdmin, fetchAllAdminGroups);

router.get("/group/:groupId", verifyToken, verifyIfAdmin, fetchGroupById);

router.get("/group/get-info", fetchGroupByIdWithoutToken);

router.get("/submission-stats/", getSubmissionStats);

router.get("/recent-activity", getRecentActivity);

export default router;
