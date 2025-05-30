import express from "express";
import createNjangi from "../controllers/create.njangi.controller.js";
import limiter from "../middleware/limiter.js";

const router = express.Router();

router.use("/", limiter);

router.post("/", createNjangi);

export default router;
