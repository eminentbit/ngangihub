import { Router } from "express";
import { verifyToken } from "../middleware/verify.token.js";
import { checkSession } from "../controllers/auth.controller.js";
const router = Router();

router.get("/session", verifyToken, checkSession);

// export default router;
