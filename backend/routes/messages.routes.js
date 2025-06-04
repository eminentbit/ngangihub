import express from "express";
import Messages from "../models/message.model.js";
import {
  getMessages,
  getMessagesByGroup,
  sendMessage,
} from "../controllers/message.controllers.js";
import { uploadChatAttachment } from "../middleware/upload.js";

const router = express.Router();

// Get all messages
router.get("/", getMessages);

// Send a new message
router.post("/send", uploadChatAttachment, sendMessage);

// Get messages for a specific group
router.get("/group/:groupId", getMessagesByGroup);

export default router;
