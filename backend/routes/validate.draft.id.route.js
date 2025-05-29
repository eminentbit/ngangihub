import express from 'express';
import { validateDraftId } from '../controllers/validate.draft.id.controller.js';

const router = express.Router();

router.get("/", validateDraftId);

export default router;