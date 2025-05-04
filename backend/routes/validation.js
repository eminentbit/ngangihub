import express from "express";
import {
  validateEmail,
  validateGroupName,
} from "../controllers/validationController.js";

const router = express.Router();

router.get("/validate-email", validateEmail);
router.get("/validate-group-name", validateGroupName);

export default router;
