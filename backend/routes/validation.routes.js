import express from "express";
import {
  validateEmail,
  validateGroupName,
  validateInviteContact,
  validatePhoneNumber,
} from "../controllers/validationController.js";
import limiter from "../middleware/limiter.js";

const router = express.Router();

router.use("/", limiter);

router.get("/validate-email", validateEmail);
router.get("/validate-group-name", validateGroupName);
router.get("/validate-phone-number", validatePhoneNumber);
router.get("/validate-invite-contact", validateInviteContact);

export default router;
