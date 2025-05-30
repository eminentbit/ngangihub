import { Router } from "express";
import verifyToken from "../middleware/verify.token.js";
import { checkSession, login, logout } from "../controllers/auth.controller.js";
import limiter from "../middleware/limiter.js";
const router = Router();

router.use("/", limiter);

router.get("/session", verifyToken, checkSession);
router.post("/login", login);
router.post("/logout", verifyToken, logout);

export default router;
