import { mailtrapClient, sender } from "./mailtrap.config.js";
import {
  VERIFICATION_EMAIL_TEMPLATE,
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  NJANGI_CREATION_NOTIFICATION_TEMPLATE,
  NJANGI_APPROVAL_TEMPLATE,
  WELCOME_TEMPLATE,
  INVITE_TEMPLATE,
  NJANGI_REJECTION_TEMPLATE,
  GROUP_MEMBER_ADDITION_TEMPLATE,
} from "./emailTemplates.js";

export const sendVerificationEmail = async (email, verificationToken) => {
  const recipient = [{ email }];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Verify your email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationToken
      ),
      category: "Email Verification",
    });
    console.log("Email sent successfully", response);
  } catch (error) {
    console.error(`Error sending email: ${error}`);
    throw new Error("Error sending email: ", error);
  }
};
export const sendNjangiCreatedPendingEmail = async (
  email,
  userName,
  groupName,
  creationDate,
  memberCount,
  contributionAmount,
  viewURL
) => {
  const recipient = [{ email }];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Njangi Creation Pending",
      html: NJANGI_CREATION_NOTIFICATION_TEMPLATE.replace(
        "{userName}",
        userName,
        "{groupName}",
        groupName,
        "{creationDate}",
        creationDate,
        "{memberCount}",
        memberCount,
        "{contributionAmount}",
        contributionAmount,
        "{viewURL}",
        viewURL
      ),
      category: "Njangi Creation Pending Approval",
    });
    console.log(
      "Njangi Pending Approval Email sent successfully",
      response
    );
  } catch (error) {
    console.error(`Error sending email: ${error}`);
    throw new Error("Error sending email: ", error);
  }
};
export const sendNjangiCreatedApprovalEmail = async (
  email,
  userName,
  groupName,
  creationDate,
  memberCount,
  contributionAmount,
  dashboardURL
) => {
  const recipient = [{ email }];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Njangi Creation Approved",
      html: NJANGI_APPROVAL_TEMPLATE.replace(
        "{userName}",
        userName,
        "{groupName}",
        groupName,
        "{creationDate}",
        creationDate,
        "{memberCount}",
        memberCount,
        "{contributionAmount}",
        contributionAmount,
        "{dashboardURL}",
        dashboardURL
      ),
      category: "Njangi Creation Notification",
    });
    console.log("Njangi Approval Email sent successfully", response);
  } catch (error) {
    console.error(`Error sending email: ${error}`);
    throw new Error("Error sending email: ", error);
  }
};

export const sendWelcomeEmail = async (email, username, dashboardURL) => {
  const recipient = [{ email }];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Welcome to NjangiHub- NAAS(Njangi As A Service)",
      html: WELCOME_TEMPLATE.replace(
        "{userName}",
        username,
        "{dashboardURL}",
        dashboardURL
      ),
    });
    console.log("Welcome Email sent successfully", response);
  } catch (error) {
    console.error(`Error sending welcome email: ${error}`);
    throw new Error("Error sending email: ", error);
  }
};

export const sendPasswordResetEmail = async (email, resetToken) => {
  const recipient = [{ email }];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Reset your password",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetToken),
      category: "Password Reset",
    });
    console.log("Password reset email sent successfully", response);
  } catch (error) {
    console.error(`Error sending password reset email: ${error}`);
    throw new Error("Error sending password reset email: ", error);
  }
};

export const sentResetSuccessEmail = async (email) => {
  const recipient = [{ email }];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Password reset successful",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
      category: "Password Reset",
    });
    console.log("Password reset success email sent successfully", response);
  } catch (error) {
    console.error(`Error sending password reset success email: ${error}`);
    throw new Error("Error sending password reset success email: ", error);
  }
};

export const sendNjangiInvitationEmail = async (
  email,
  senderName,
  personalMessage,
  groupName,
  inviteURL
) => {
  const recipient = [{ email }];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Njangi Creation Approved",
      html: INVITE_TEMPLATE.replace(
        "{senderName}",
        senderName,
        "{groupName}",
        groupName,
        "{personalMessage}",
        personalMessage,
        "{inviteURL}",
        inviteURL
      ),
      category: "Njangi Invitation",
    });
    console.log("Njangi Invitation Email sent successfully", response);
  } catch (error) {
    console.error(`Error sending email: ${error}`);
    throw new Error("Error sending email: ", error);
  }
};
export const sendNjangiAleadyAddMemberEmail = async (
  email,
  userName,
  creatorName,
  contributionAmount,
  paymentFrequency,
  dashboardURL,
  groupName
) => {
  const recipient = [{ email }];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: `You have been added to ${groupName}.`,
      html: GROUP_MEMBER_ADDITION_TEMPLATE.replace(
        "{creatorName}",
        creatorName,
        "{userName}",
        userName,
        "{contributionAmount}",
        contributionAmount,
        "{paymentFrequency}",
        paymentFrequency,
        "{groupName}",
        groupName,
        "{dashboardURL}",
        dashboardURL
      ),
      category: "Invited to Njangi Group",
    });
    console.log("Njangi already add member Email sent successfully", response);
  } catch (error) {
    console.error(`Error sending email: ${error}`);
    throw new Error("Error sending email: ", error);
  }
};
export const sendNjangiRejectionEmail = async (
  email,
  userName,
  rejectionReason,
  editURL,
  groupName
) => {
  const recipient = [{ email }];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Njangi Creation Not Approved",
      html: NJANGI_REJECTION_TEMPLATE.replace(
        "{userName}",
        userName,
        "{groupName}",
        groupName,
        "{rejectionReason}",
        rejectionReason,
        "{editURL}",
        editURL
      ),
      category: "Njangi Invitation Not Approved",
    });
    console.log("Njangi Rejection Email sent successfully", response);
  } catch (error) {
    console.error(`Error sending email: ${error}`);
    throw new Error("Error sending email: ", error);
  }
};
