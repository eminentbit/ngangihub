import express from "express"
import { cancelNjangi, updateNjangiDetails } from "../controllers/updateNjangiDetails.controller.js";

const router = express.Router();

router.put("/update-njangi-details", updateNjangiDetails);
router.delete("/cancel-njangi-details", cancelNjangi)


export default router;