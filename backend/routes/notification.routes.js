import express from "express";
import {
  getAllNotifications,
  getUserNotifications,
  createNotification,
  deleteNotification,
  markAsRead,
} from "../controllers/notification.controller.js";
import { verifyToken } from "../middleware/verify.token.js";

const router = express.Router();

router.get("/", getAllNotifications);

// Get notifications for a specific user
router.get("/user", verifyToken, getUserNotifications);

// Create a new notification
router.post("/", verifyToken, createNotification);

// Mark notification as read
router.patch("/:notificationId", verifyToken, markAsRead);

// Delete a notification
router.delete("/:notificationId", verifyToken, deleteNotification);

export default router;
