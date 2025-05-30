import express from "express";
import { validateInviteToken } from "../controllers/validate.invite.token.controller.js";
import limiter from "../middleware/limiter.js";

const router = express.Router();

router.use("/", limiter);

router.get("/validate-invite-token", validateInviteToken);

export default router;
