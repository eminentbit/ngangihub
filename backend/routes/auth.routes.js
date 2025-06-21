import { Router } from "express";
import verifyToken from "../middleware/verify.token.js";
import {
  changePassword,
  checkSession,
  login,
  logout,
  resetPassword,
  sendPasswordResetLink,
} from "../controllers/auth.controller.js";
import limiter from "../middleware/limiter.js";
const router = Router();

router.use("/", limiter);

router.get("/session", verifyToken, checkSession);
router.post("/login", login);
router.post("/logout", verifyToken, logout);
router.post("/forgot-password", sendPasswordResetLink);
router.post("/reset-password", resetPassword);
router.post("/change-password", verifyToken, changePassword);

export default router;
