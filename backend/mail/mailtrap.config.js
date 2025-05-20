// import { MailtrapClient } from "mailtrap";
import dotenv from "dotenv";
dotenv.config();

// const TOKEN = "17bad88fb89d9cb30d8270846a4414a7";

// export const mailtrapClient = new MailtrapClient({
//   token: process.env.MAILTRAP_TOKEN || TOKEN,
//   testInboxId: 3697449,
// });

export const sender = {
  email: process.env.SENDER_EMAIL,
  name: "NjangiHub Auth",
};
