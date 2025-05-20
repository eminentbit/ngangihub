// import { MailtrapClient } from "mailtrap";
// import Nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const TOKEN = process.env.SMTP_TOKEN;

// export const transporter = Nodemailer.createTransport(
//   MailtrapTransport({
//     token: TOKEN,
//   })
// );

export const sender = {
  email: process.env.SENDER_EMAIL,
  name: "NjangiHub Auth",
};
