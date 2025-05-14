import express from "express";
import {
  validateEmail,
  validateGroupName,
  validateInviteContact,
  validatPhoneNumber,
} from "../controllers/validationController.js";

const router = express.Router();

router.get("/validate-email", validateEmail);
router.get("/validate-group-name", validateGroupName);
router.get("/validate-phone-number", validatPhoneNumber);
router.get("/validate-invite-contact", validateInviteContact);

export default router;
