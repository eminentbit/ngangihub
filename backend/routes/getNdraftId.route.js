import express from 'express';
import getNjangiDraftId from '../controllers/getNdrafId.controller.js';

const router = express.Router();

router.get("/get-ndraft-id", getNjangiDraftId)

export default router;