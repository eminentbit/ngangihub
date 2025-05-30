import express from "express";
import { viewNjangiDrafts } from "../controllers/bod.view.njangi.controller.js";
import { verifyIfBod } from "../middleware/verify.role.js";
import verifyToken from "../middleware/verify.token.js";
import actionNjangi from "../controllers/bod.action.njangi.controller.js";
import {
  createReport,
  listReports,
} from "../controllers/bod.general.controller.js";
import limiter from "../middleware/limiter.js";

const router = express.Router();

router.use("/", limiter);

// Route to handle approving a Njangi draft
router.post("/approve", verifyToken, verifyIfBod, actionNjangi);

// Route to handle rejecting a Njangi draft
router.post("/reject", verifyToken, verifyIfBod, actionNjangi);

router.get("/drafts", verifyToken, verifyIfBod, viewNjangiDrafts);

router.post("/reports", verifyToken, verifyIfBod, createReport);
router.get("/reports", verifyToken, verifyIfBod, listReports);

export default router;
