import { Router } from "express";
import {
  getCampayToken,
  getPaymentLink,
  initiatePayment,
} from "../controllers/payment.controller.js";
import verifyToken from "../middleware/verify.token.js";
const router = Router();

router.post("/token", verifyToken, getCampayToken);

router.get("/payment-link", verifyToken, getPaymentLink);

router.post("/pay", verifyToken, initiatePayment);

export default router;
