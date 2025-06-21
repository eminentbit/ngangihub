import express from "express";
import {
  getNjangiOverview,
  getMyNjangis,
  getMyNjangiDetails,
  getMyNjangiStatus,
} from "../controllers/get.njangi.states.controller.js";
import limiter from "../middleware/limiter.js";

const router = express.Router();

router.use("/", limiter);

router.get("/admin/my-njangi-overview", getNjangiOverview);
router.get("/admin/my-njangis", getMyNjangis);
router.get("/admin/my-njangi-details", getMyNjangiDetails);
router.get("/admin/my-njangi-status", getMyNjangiStatus);

export default router;
