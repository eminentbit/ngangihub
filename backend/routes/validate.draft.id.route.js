import express from "express";
import { validateDraftId } from "../controllers/validate.draft.id.controller.js";
import limiter from "../middleware/limiter.js";

const router = express.Router();

router.use("/", limiter);

router.get("/validate-draft-id", validateDraftId);

export default router;
