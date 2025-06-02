import express from "express";
import { viewNjangiDrafts } from "../controllers/bod.view.njangi.controller.js";
import { verifyIfBod } from "../middleware/verify.role.js";
import verifyToken from "../middleware/verify.token.js";
import actionNjangi from "../controllers/bod.action.njangi.controller.js";
import {
  createReport,
  listReports,
} from "../controllers/bod.reports.controller.js";
import limiter from "../middleware/limiter.js";
import {
  createMeeting,
  createResolution,
  fetchAttendance,
  fetchMembers,
  fetchResolutions,
  listMeetings,
} from "../controllers/bod.general.controllers.js";

const router = express.Router();

router.use("/", limiter);

router.post("/approve", verifyToken, verifyIfBod, actionNjangi);
router.post("/reject", verifyToken, verifyIfBod, actionNjangi);
router.get("/drafts", verifyToken, verifyIfBod, viewNjangiDrafts);

router.post("/reports", verifyToken, verifyIfBod, createReport);
router.get("/reports", verifyToken, verifyIfBod, listReports);

router.get("/members", verifyToken, verifyIfBod, fetchMembers);

router.get("/resolutions", verifyToken, verifyIfBod, fetchResolutions);
router.post("/resolutions", verifyToken, verifyIfBod, createResolution);

router.get("/attendance", verifyToken, verifyIfBod, fetchAttendance);

router.get("/meetings", verifyToken, verifyIfBod, listMeetings);
router.post("/meetings", verifyToken, verifyIfBod, createMeeting);

export default router;
