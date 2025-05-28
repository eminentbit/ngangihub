import express from "express";
import { validateInviteToken } from "../controllers/validate.invite.token.controller.js";

const router = express.Router();

router.get("/validate-invite-token", validateInviteToken);

export default router;