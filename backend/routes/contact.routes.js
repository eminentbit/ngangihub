// backend/routes/contact.route.js
import express from 'express';
import nodemailer from 'nodemailer';
import ContactMessage from '../models/ContactMessage.model.js';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

router.post('/', async (req, res) => {
  const { fullName, email, message } = req.body;

  if (!fullName || !email || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    // Save the message in the database
    const doc = new ContactMessage({ fullName, email, message });
    await doc.save();

    // Create the email transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail', // or 'outlook', 'yahoo', or use host/port for custom SMTP
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email, // send email to the user who filled the form
      subject: 'NAAS Contact Confirmation',
      text: `Hi ${fullName},\n\nThanks for contacting us! We received your message:\n\n"${message}"\n\nWe'll respond soon.\n\nBest regards,\nNAAS Team`,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return res.json({ success: true, msg: 'Message received and email sent.' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error.' });
  }
});

export default router;
