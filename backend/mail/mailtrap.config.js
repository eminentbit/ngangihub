// import Nodemailer from "nodemailer";
// import { MailtrapTransport } from "mailtrap";
import dotenv from "dotenv";
dotenv.config();

// const TOKEN = process.env.MAILTRAP_TOKEN;
// // const TOKEN = process.env.SMTP_TOKEN;
// export const transporter = Nodemailer.createTransport(
//   MailtrapTransport({
//     token: TOKEN,
//   })
// );

// export const sender = {
//   address: "hello@demomailtrap.co",
//   name: "NjangiHub Team",
// };

import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_SERVER,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sender = "NjangiHub Team <" + process.env.SENDER_EMAIL + ">";
