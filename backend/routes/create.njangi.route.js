import express from "express";
import createNjangi from "../controllers/create.njangi.controller.js";
import acceptInvite from "../controllers/accept-invite-members.js";

const router = express.Router();

router.post("/", createNjangi);

export default router;
