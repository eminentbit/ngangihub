import express from "express";
import acceptInvite from "../controllers/accept-invite-members.js";
import limiter from "../middleware/limiter.js";

const router = express.Router();

router.use("/", limiter);

router.post("/accept-member-invite", acceptInvite);

export default router;
