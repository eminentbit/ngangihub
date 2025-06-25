import { Router } from "express";
import {
  checkPaymentStatus,
  getCampayToken,
  getPaymentLink,
  initiatePayment,
} from "../controllers/payment.controller.js";
import verifyToken from "../middleware/verify.token.js";
const router = Router();

router.post("/token", verifyToken, getCampayToken);

router.get("/payment-link", verifyToken, getPaymentLink);

router.post("/pay", verifyToken, initiatePayment);

router.get("/status/:reference", verifyToken, checkPaymentStatus);

export default router;
