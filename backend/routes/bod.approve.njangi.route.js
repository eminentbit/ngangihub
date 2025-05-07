import express from "express";
import { approveNjangi } from "../controllers/bod.approve.njangi.controller.js";

const router = express.Router();

router.post("/bod", approveNjangi);

export default router;
