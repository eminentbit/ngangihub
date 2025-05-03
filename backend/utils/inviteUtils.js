import crypto from "crypto";

export const generateToken = () => crypto.randomBytes(16).toString("hex");

export const sendInvite = async (contact, token, groupName) => {
  //  use Twilio, SendGrid, etc.
  console.log(
    `Sending invite to ${contact} with token: ${token} for group ${groupName}`
  );
};
