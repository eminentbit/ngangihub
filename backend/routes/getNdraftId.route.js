import express from "express";
import getNjangiDraftId from "../controllers/getNdrafId.controller.js";
import limiter from "../middleware/limiter.js";

const router = express.Router();

router.use("/", limiter);

router.get("/get-ndraft-id", getNjangiDraftId);

export default router;
