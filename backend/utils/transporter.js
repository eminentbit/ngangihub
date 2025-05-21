import Nodemailer from "nodemailer";
import { MailtrapTransport } from "mailtrap";
import dotenv from "dotenv";
dotenv.config();

// const transporter = nodemailer.createTransport({
//   host: process.env.SMTP_SERVER,
//   port: process.env.SMTP_PORT,
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

export const transporter = Nodemailer.createTransport(
  MailtrapTransport({
    token: process.env.SMTP_TOKEN,
  })
);

export default transporter;
