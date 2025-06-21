import express from "express";
import {
  cancelNjangi,
  updateNjangiDetails,
} from "../controllers/updateNjangiDetails.controller.js";
import limiter from "../middleware/limiter.js";

const router = express.Router();

router.use("/", limiter);

router.put("/update-njangi-details", updateNjangiDetails);
router.delete("/cancel-njangi-details", cancelNjangi);

export default router;
