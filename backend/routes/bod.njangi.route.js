import express from "express";
import { approveNjangi } from "../controllers/bod.approve.njangi.controller.js";
import { viewNjangiDrafts } from "../controllers/bod.view.njangi.controller.js";
import { verifyToken } from "../middleware/verify.token.js";

const router = express.Router();

router.post("/approve", approveNjangi);

router.post("/", verifyToken, viewNjangiDrafts);

export default router;
