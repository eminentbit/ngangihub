import express from 'express';
import acceptInvite from '../controllers/accept-invite-members.js';

const router = express.Router();

router.post("/accept-member-invite", acceptInvite)

export default router;