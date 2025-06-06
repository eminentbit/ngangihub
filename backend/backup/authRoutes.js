import express from "express";
const router = express.Router();
import { register, login, logout } from "./authController.js";
import limiter from "../middleware/limiter.js";

router.use("/", limiter);

// @desc Register a new user
// @route POST /api/auth/register
// @access Public
router.post("/register", register);

// @desc Login a user
// @route POST /api/auth/login
// @access Public
router.post("/login", login);

// @desc Logout a user
// @route POST /api/auth/logout
// @access Public
router.post("/logout", logout);

// @desc Get user profile
// @route GET /api/auth/profile
// @access Private
// router.get("/profile", verifyToken, getUserProfile);

export default router;
