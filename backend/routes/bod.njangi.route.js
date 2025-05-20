import express from "express";
import approveNjangi from "../controllers/bod.approve.njangi.controller.js";
import { viewNjangiDrafts } from "../controllers/bod.view.njangi.controller.js";
import verifyIfBod from "../middleware/verify.if.bod.js";

const router = express.Router();

router.post("/approve", approveNjangi);

router.get("/drafts", verifyIfBod, viewNjangiDrafts);

export default router;
