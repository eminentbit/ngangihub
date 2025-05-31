import express from "express";
import limiter from "../middleware/limiter";
const router = express.Router();

router.use("/", limiter);

router.get("/members",);
