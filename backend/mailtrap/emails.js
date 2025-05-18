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

const replacePlaceholders = (template, data) => {
  return Object.entries(data).reduce((html, [key, value]) => {
    return html.replaceAll(`{${key}}`, value);
  }, template);
};

export const sendVerificationEmail = async (email, verificationToken) => {
  const recipient = [{ email }];

  try {
    const response = await mailtrapClient.testing.send({
      from: sender,
      to: recipient,
      subject: "Verify your email",
      html: replacePlaceholders(VERIFICATION_EMAIL_TEMPLATE, {
        verificationCode: verificationToken,
      }),
      category: "Email Verification",
    });
    console.log("Email sent successfully", response);
  } catch (error) {
    console.error(`Error sending email: ${error}`);
    throw new Error("Error sending email");
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
  const recipients = [{ email }];

  console.log("Sending email with payload:", {
    from: sender,
    to: recipients,
    subject: "Njangi Creation Approved",
    html: replacePlaceholders(NJANGI_CREATION_NOTIFICATION_TEMPLATE, {
      userName,
      groupName,
      creationDate,
      memberCount,
      contributionAmount,
      viewURL,
    }),
  });


  console.log(`recipient: ${recipients}`);

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipients,
      subject: "Njangi Creation Pending",
      html: replacePlaceholders(NJANGI_CREATION_NOTIFICATION_TEMPLATE, {
        userName,
        groupName,
        creationDate,
        memberCount,
        contributionAmount,
        viewURL,
      }),
      category: "Njangi Creation Pending Approval",
    });
    console.log("Njangi Pending Approval Email sent successfully", response);
  } catch (error) {
    console.error(`Error sending email: ${error}`);
    throw new Error("Error sending email");
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
      html: replacePlaceholders(NJANGI_APPROVAL_TEMPLATE, {
        userName,
        groupName,
        creationDate,
        memberCount,
        contributionAmount,
        dashboardURL,
      }),
      category: "Njangi Creation Notification",
    });
    console.log("Njangi Approval Email sent successfully", response);
  } catch (error) {
    console.error(`Error sending email: ${error}`);
    throw new Error("Error sending email");
  }
};

export const sendWelcomeEmail = async (email, username, dashboardURL) => {
  const recipient = [{ email }];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Welcome to NjangiHub- NAAS(Njangi As A Service)",
      html: replacePlaceholders(WELCOME_TEMPLATE, {
        userName: username,
        dashboardURL,
      }),
    });
    console.log("Welcome Email sent successfully", response);
  } catch (error) {
    console.error(`Error sending welcome email: ${error}`);
    throw new Error("Error sending email");
  }
};

export const sendPasswordResetEmail = async (email, resetToken) => {
  const recipient = [{ email }];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Reset your password",
      html: replacePlaceholders(PASSWORD_RESET_REQUEST_TEMPLATE, {
        resetURL: resetToken,
      }),
      category: "Password Reset",
    });
    console.log("Password reset email sent successfully", response);
  } catch (error) {
    console.error(`Error sending password reset email: ${error}`);
    throw new Error("Error sending password reset email");
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
    throw new Error("Error sending password reset success email");
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
      html: replacePlaceholders(INVITE_TEMPLATE, {
        senderName,
        groupName,
        personalMessage,
        inviteURL,
      }),
      category: "Njangi Invitation",
    });
    console.log("Njangi Invitation Email sent successfully", response);
  } catch (error) {
    console.error(`Error sending email: ${error}`);
    throw new Error("Error sending email");
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
      html: replacePlaceholders(GROUP_MEMBER_ADDITION_TEMPLATE, {
        creatorName,
        userName,
        contributionAmount,
        paymentFrequency,
        groupName,
        dashboardURL,
      }),
      category: "Invited to Njangi Group",
    });
    console.log("Njangi already add member Email sent successfully", response);
  } catch (error) {
    console.error(`Error sending email: ${error}`);
    throw new Error("Error sending email");
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
      html: replacePlaceholders(NJANGI_REJECTION_TEMPLATE, {
        userName,
        groupName,
        rejectionReason,
        editURL,
      }),
      category: "Njangi Invitation Not Approved",
    });
    console.log("Njangi Rejection Email sent successfully", response);
  } catch (error) {
    console.error(`Error sending email: ${error}`);
    throw new Error("Error sending email");
  }
};
