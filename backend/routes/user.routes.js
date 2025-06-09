import { Router } from "express";
import {
  checkMonthlyPaymentStatus,
  getGroupPayments,
} from "../controllers/user.controller.js";
import limiter from "../middleware/limiter.js";
import verifyToken from "../middleware/verify.token.js";

const router = Router();

router.use("/", limiter);

router.get(
  "/group/:groupId/payment-status",
  verifyToken,
  checkMonthlyPaymentStatus
);

router.get("/group/:groupId/payments", verifyToken, getGroupPayments);

export default router;
