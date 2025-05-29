import { Router } from "express";
import verifyToken from "../middleware/verify.token.js";
import { checkSession, login } from "../controllers/auth.controller.js";
const router = Router();

router.get("/session", verifyToken, checkSession);
router.post("/login", login);

export default router;
