// backend/routes/contact.route.js
import express from "express";
import nodemailer from "nodemailer";
import ContactMessage from "../models/ContactMessage.model.js";
import dotenv from "dotenv";
import { CONTACT_CONFIRMATION_EMAIL_TEMPLATE } from "../mail/emailTemplates.js";
import { sendContact } from "../mail/emails.js";
dotenv.config();

const router = express.Router();

router.post("/", async (req, res) => {
  const { fullName, email, message } = req.body;

  if (!fullName || !email || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    // Save the message in the database
    const doc = new ContactMessage({ fullName, email, message });
    await doc.save();

    await sendContact(fullName, message, email);

    return res.json({ success: true, msg: "Message received and email sent." });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error." });
  }
});

export default router;
