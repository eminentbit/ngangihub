export const generateToken = () => crypto.randomBytes(20).toString("hex");
import { transporter } from "../mail/mailtrap.config.js";

export const sendInvite = async (
  contact,
  token,
  groupName,
  adminfirstName,
  adminlastName,
  startDate
) => {
  await transporter.sendMail({
    from: process.env.SENDER_EMAIL,
    to: contact,
    subject: `Invitation to join ${adminlastName}'s Njangi Group`,
    html: `
          <h2>You've been invited to join a Njangi Group by !</h2>
          <p>You have been invited to join ${groupName} by ${adminlastName} ${adminfirstName}.</p>
          <p>The group will start on ${startDate}.</p>
          <p>Click the link below to accept the invitation and join the group:</p>
          <a href="${process.env.FRONTEND_URL}/join-njangi/${token}">Accept Invitation</a>
          <p>Best regards,</p>
          <p>The NjangiHub Team</p>
        `,
  });
};
