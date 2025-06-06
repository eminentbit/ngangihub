import express from "express";
import limiter from "../middleware/limiter.js";
import verifyToken from "../middleware/verify.token.js";
import { fetchAllGroups } from "../controllers/najngi.groups.controller.js";
const router = express.Router();

router.use("/", limiter);

router.get("/groups", verifyToken, fetchAllGroups);

export default router;
