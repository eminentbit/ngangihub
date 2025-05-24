import Nodemailer from "nodemailer";
import { MailtrapTransport } from "mailtrap";
import dotenv from "dotenv";
dotenv.config();

const TOKEN = process.env.MAILTRAP_TOKEN;
// const TOKEN = process.env.SMTP_TOKEN;
export const transporter = Nodemailer.createTransport(
  MailtrapTransport({
    token: TOKEN,
  })
);

export const sender = {
  address: "hello@demomailtrap.co",
  // address: "hello@loopos.org",
  name: "NjangiHub Team",
};
