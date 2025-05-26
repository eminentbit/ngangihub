import express from "express";
import approveNjangi from "../controllers/bod.action.njangi.controller.js";
import { viewNjangiDrafts } from "../controllers/bod.view.njangi.controller.js";
import verifyIfBod from "../middleware/verify.if.bod.js";
import { verifyToken } from "../middleware/verify.token.js";

const router = express.Router();

router.post("/approve", approveNjangi);

router.get("/drafts", verifyToken, verifyIfBod, viewNjangiDrafts);

export default router;
