import express from "express"
import { updateNjangiDetails } from "../controllers/updateNjangiDetails.controller.js";

const router = express.Router();

router.put("/update-njangi-details", updateNjangiDetails);

export default router;