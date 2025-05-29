import express from 'express';
import { validateDraftId } from '../controllers/validate.draft.id.controller.js';

const router = express.Router();

router.get("/validate-draft-id", validateDraftId);

export default router;