export const VERIFICATION_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Your Email - NganjiHub</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
</head>
<body style="font-family: 'Inter', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 0;">
  <div style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); margin: 20px auto;">
    <!-- Header -->
    <div style="background: linear-gradient(to right, #1a56db, #3b82f6); padding: 30px; text-align: center;">
      <h1 style="color: white; margin: 0; font-weight: 700; font-size: 24px;">Verify Your Email</h1>
    </div>
    
    <!-- Content -->
    <div style="background-color: #ffffff; padding: 30px;">
      <p style="margin-top: 0; font-size: 16px;">Hello,</p>
      <p style="font-size: 16px;">Thank you for signing up with <strong>NganjiHub</strong>! Your verification code is:</p>
      
      <div style="text-align: center; margin: 30px 0; background-color: #f3f4f6; padding: 20px; border-radius: 8px;">
        <span style="font-size: 32px; font-weight: 700; letter-spacing: 5px; color: #1a56db;">{verificationCode}</span>
      </div>
      
      <p style="font-size: 16px;">Enter this code on the verification page to complete your registration.</p>
      <p style="font-size: 16px;">This code will expire in 15 minutes for security reasons.</p>
      <p style="font-size: 16px;">If you didn't create an account with us, please ignore this email.</p>
      
      <p style="margin-top: 30px; font-size: 16px;">Best regards,<br><strong>NAAS Team</strong></p>
    </div>
    
    <!-- Footer -->
    <div style="background-color: #f3f4f6; padding: 20px; text-align: center; font-size: 14px; color: #6b7280;">
      <p style="margin: 0;">© 2025 NganjiHub. All rights reserved.</p>
      <p style="margin: 10px 0 0;">This is an automated message, please do not reply to this email.</p>
    </div>
  </div>
</body>
</html>
`;

export const PASSWORD_RESET_SUCCESS_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset Successful - NganjiHub</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
</head>
<body style="font-family: 'Inter', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 0;">
  <div style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); margin: 20px auto;">
    <!-- Header -->
    <div style="background: linear-gradient(to right, #1a56db, #3b82f6); padding: 30px; text-align: center;">
      <h1 style="color: white; margin: 0; font-weight: 700; font-size: 24px;">Password Reset Successful</h1>
    </div>
    
    <!-- Content -->
    <div style="background-color: #ffffff; padding: 30px;">
      <p style="margin-top: 0; font-size: 16px;">Hello,</p>
      <p style="font-size: 16px;">We're writing to confirm that your password has been successfully reset.</p>
      
      <div style="text-align: center; margin: 30px 0;">
        <div style="background-color: #1a56db; color: white; width: 60px; height: 60px; line-height: 60px; border-radius: 50%; display: inline-block; font-size: 30px;">
          ✓
        </div>
      </div>
      
      <p style="font-size: 16px;">If you did not initiate this password reset, please contact our support team immediately.</p>
      
      <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p style="font-size: 16px; margin-top: 0;"><strong>For security reasons, we recommend that you:</strong></p>
        <ul style="font-size: 16px; padding-left: 20px;">
          <li>Use a strong, unique password</li>
          <li>Enable two-factor authentication if available</li>
          <li>Avoid using the same password across multiple sites</li>
        </ul>
      </div>
      
      <p style="font-size: 16px;">Thank you for helping us keep your account secure.</p>
      <p style="margin-top: 30px; font-size: 16px;">Best regards,<br><strong>NAAS Team</strong></p>
    </div>
    
    <!-- Footer -->
    <div style="background-color: #f3f4f6; padding: 20px; text-align: center; font-size: 14px; color: #6b7280;">
      <p style="margin: 0;">© 2025 NganjiHub. All rights reserved.</p>
      <p style="margin: 10px 0 0;">This is an automated message, please do not reply to this email.</p>
    </div>
  </div>
</body>
</html>
`;

export const PASSWORD_RESET_REQUEST_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password - NganjiHub</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
</head>
<body style="font-family: 'Inter', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 0;">
  <div style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); margin: 20px auto;">
    <!-- Header -->
    <div style="background: linear-gradient(to right, #1a56db, #3b82f6); padding: 30px; text-align: center;">
      <h1 style="color: white; margin: 0; font-weight: 700; font-size: 24px;">Password Reset</h1>
    </div>
    
    <!-- Content -->
    <div style="background-color: #ffffff; padding: 30px;">
      <p style="margin-top: 0; font-size: 16px;">Hello,</p>
      <p style="font-size: 16px;">We received a request to reset your password. If you didn't make this request, please ignore this email.</p>
      <p style="font-size: 16px;">To reset your password, click the button below:</p>
      
      <div style="text-align: center; margin: 30px 0;">
        <a href="{resetURL}" style="background-color: #1a56db; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: 600; display: inline-block; font-size: 16px;">Reset Password</a>
      </div>
      
      <p style="font-size: 16px;">This link will expire in 1 hour for security reasons.</p>
      <p style="margin-top: 30px; font-size: 16px;">Best regards,<br><strong>NAAS Team</strong></p>
    </div>
    
    <!-- Footer -->
    <div style="background-color: #f3f4f6; padding: 20px; text-align: center; font-size: 14px; color: #6b7280;">
      <p style="margin: 0;">© 2025 NganjiHub. All rights reserved.</p>
      <p style="margin: 10px 0 0;">This is an automated message, please do not reply to this email.</p>
    </div>
  </div>
</body>
</html>
`;

export const INVITE_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>You're Invited to Join NganjiHub</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
</head>
<body style="font-family: 'Inter', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 0;">
  <div style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); margin: 20px auto;">
    <!-- Header -->
    <div style="background: linear-gradient(to right, #1a56db, #3b82f6); padding: 30px; text-align: center;">
      <h1 style="color: white; margin: 0; font-weight: 700; font-size: 24px;">You're Invited!</h1>
    </div>
    
    <!-- Content -->
    <div style="background-color: #ffffff; padding: 30px;">
      <p style="margin-top: 0; font-size: 16px;">Hello,</p>
      <p style="font-size: 16px;"><strong>{senderName}</strong> has invited you to join a Njangi group on <strong>NganjiHub</strong>!</p>
      
      <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p style="font-size: 16px; margin: 0;"><strong>Group Name:</strong> {groupName}</p>
        <p style="font-size: 16px; margin: 10px 0 0;"><strong>Message from {senderName}:</strong> {personalMessage}</p>
      </div>
      
      <p style="font-size: 16px;">Join this Njangi group to save together, support each other, and achieve your financial goals.</p>
      
      <div style="text-align: center; margin: 30px 0;">
        <a href="{inviteURL}" style="background-color: #1a56db; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: 600; display: inline-block; font-size: 16px;">Accept Invitation</a>
      </div>
      
      <p style="font-size: 14px; color: #6b7280;">This invitation link will expire in 7 days.</p>
      <p style="margin-top: 30px; font-size: 16px;">Best regards,<br><strong>NAAS Team</strong></p>
    </div>
    
    <!-- Footer -->
    <div style="background-color: #f3f4f6; padding: 20px; text-align: center; font-size: 14px; color: #6b7280;">
      <p style="margin: 0;">© 2025 NganjiHub. All rights reserved.</p>
      <p style="margin: 10px 0 0;">This is an automated message, please do not reply to this email.</p>
    </div>
  </div>
</body>
</html>
`;

export const NJANGI_APPROVAL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Njangi Group Approved - NganjiHub</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
</head>
<body style="font-family: 'Inter', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 0;">
  <div style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); margin: 20px auto;">
    <!-- Header -->
    <div style="background: linear-gradient(to right, #1a56db, #3b82f6); padding: 30px; text-align: center;">
      <h1 style="color: white; margin: 0; font-weight: 700; font-size: 24px;">Njangi Group Approved!</h1>
    </div>
    
    <!-- Content -->
    <div style="background-color: #ffffff; padding: 30px;">
      <p style="margin-top: 0; font-size: 16px;">Hello {userName},</p>
      <p style="font-size: 16px;">Great news! Your Njangi group <strong>"{groupName}"</strong> has been approved by our board.</p>
      
      <div style="text-align: center; margin: 30px 0;">
        <div style="background-color: #dcfce7; border-radius: 50%; width: 80px; height: 80px; margin: 0 auto; display: flex; align-items: center; justify-content: center;">
          <div style="color: #16a34a; font-size: 40px;">✓</div>
        </div>
        <p style="font-size: 18px; font-weight: 600; color: #16a34a; margin-top: 15px;">Approved</p>
      </div>
      
      <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p style="font-size: 16px; margin-top: 0;"><strong>Group Details:</strong></p>
        <ul style="font-size: 16px; padding-left: 20px;">
          <li>Group Name: {groupName}</li>
          <li>Creation Date: {creationDate}</li>
          <li>Number of Members: {memberCount}</li>
          <li>Contribution Amount: {contributionAmount} FCFA</li>
        </ul>
      </div>
      
      <p style="font-size: 16px;">You can now start inviting members and managing your Njangi group. Click the button below to access your group dashboard:</p>
      
      <div style="text-align: center; margin: 30px 0;">
        <a href="{dashboardURL}" style="background-color: #1a56db; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: 600; display: inline-block; font-size: 16px;">Go to Dashboard</a>
      </div>
      
      <p style="margin-top: 30px; font-size: 16px;">Best regards,<br><strong>NAAS Team</strong></p>
    </div>
    
    <!-- Footer -->
    <div style="background-color: #f3f4f6; padding: 20px; text-align: center; font-size: 14px; color: #6b7280;">
      <p style="margin: 0;">© 2025 NganjiHub. All rights reserved.</p>
      <p style="margin: 10px 0 0;">This is an automated message, please do not reply to this email.</p>
    </div>
  </div>
</body>
</html>
`;

export const NJANGI_REJECTION_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Njangi Group Needs Revision - NganjiHub</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
</head>
<body style="font-family: 'Inter', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 0;">
  <div style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); margin: 20px auto;">
    <!-- Header -->
    <div style="background: linear-gradient(to right, #1a56db, #3b82f6); padding: 30px; text-align: center;">
      <h1 style="color: white; margin: 0; font-weight: 700; font-size: 24px;">Njangi Group Needs Revision</h1>
    </div>
    
    <!-- Content -->
    <div style="background-color: #ffffff; padding: 30px;">
      <p style="margin-top: 0; font-size: 16px;">Hello {userName},</p>
      <p style="font-size: 16px;">Thank you for submitting your Njangi group <strong>"{groupName}"</strong> for approval. After careful review, our board has determined that some revisions are needed before we can approve your group.</p>
      
      <div style="text-align: center; margin: 30px 0;">
        <div style="background-color: #fee2e2; border-radius: 50%; width: 80px; height: 80px; margin: 0 auto; display: flex; align-items: center; justify-content: center;">
          <div style="color: #dc2626; font-size: 40px;">!</div>
        </div>
        <p style="font-size: 18px; font-weight: 600; color: #dc2626; margin-top: 15px;">Revision Required</p>
      </div>
      
      <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p style="font-size: 16px; margin-top: 0;"><strong>Reason for Revision:</strong></p>
        <p style="font-size: 16px; margin-bottom: 0;">{rejectionReason}</p>
      </div>
      
      <p style="font-size: 16px;">Please make the necessary changes to your Njangi group and resubmit for approval. If you have any questions or need assistance, please don't hesitate to contact our support team.</p>
      
      <div style="text-align: center; margin: 30px 0;">
        <a href="{editURL}" style="background-color: #1a56db; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: 600; display: inline-block; font-size: 16px;">Edit Group</a>
      </div>
      
      <p style="margin-top: 30px; font-size: 16px;">Best regards,<br><strong>NAAS Team</strong></p>
    </div>
    
    <!-- Footer -->
    <div style="background-color: #f3f4f6; padding: 20px; text-align: center; font-size: 14px; color: #6b7280;">
      <p style="margin: 0;">© 2025 NganjiHub. All rights reserved.</p>
      <p style="margin: 10px 0 0;">This is an automated message, please do not reply to this email.</p>
    </div>
  </div>
</body>
</html>
`;

export const NJANGI_CREATION_NOTIFICATION_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Njangi Group Created - NganjiHub</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
</head>
<body style="font-family: 'Inter', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 0;">
  <div style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); margin: 20px auto;">
    <!-- Header -->
    <div style="background: linear-gradient(to right, #1a56db, #3b82f6); padding: 30px; text-align: center;">
      <h1 style="color: white; margin: 0; font-weight: 700; font-size: 24px;">Njangi Group Created</h1>
    </div>
    
    <!-- Content -->
    <div style="background-color: #ffffff; padding: 30px;">
      <p style="margin-top: 0; font-size: 16px;">Hello {userName},</p>
      <p style="font-size: 16px;">Your Njangi group <strong>"{groupName}"</strong> has been successfully created and is now pending approval from our board.</p>
      
      <div style="text-align: center; margin: 30px 0;">
        <div style="background-color: #dbeafe; border-radius: 50%; width: 80px; height: 80px; margin: 0 auto; display: flex; align-items: center; justify-content: center;">
          <div style="color: #1a56db; font-size: 40px;">🔔</div>
        </div>
        <p style="font-size: 18px; font-weight: 600; color: #1a56db; margin-top: 15px;">Pending Approval</p>
      </div>
      
      <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p style="font-size: 16px; margin-top: 0;"><strong>Group Details:</strong></p>
        <ul style="font-size: 16px; padding-left: 20px;">
          <li>Group Name: {groupName}</li>
          <li>Creation Date: {creationDate}</li>
          <li>Number of Members: {memberCount}</li>
          <li>Contribution Amount: {contributionAmount} FCFA</li>
        </ul>
      </div>
      
      <p style="font-size: 16px;">Our board will review your Njangi group within 24-48 hours. You will receive another email once the review is complete.</p>
      <p style="font-size: 16px;">In the meantime, you can view your pending group by clicking the button below:</p>
      
      <div style="text-align: center; margin: 30px 0;">
  <a href="{viewURL}" style="background-color: #1a56db; color: white; padding: 14px 36px; text-decoration: none; border-radius: 8px; font-weight: 700; display: inline-flex; align-items: center; gap: 8px; font-size: 17px; letter-spacing: 1px; box-shadow: 0 2px 8px rgba(26,86,219,0.08); transition: background 0.2s;">
    <span>View Njangi Status</span>
    <svg width="20" height="20" fill="none" style="vertical-align: middle;" xmlns="http://www.w3.org/2000/svg">
      <circle cx="10" cy="10" r="10" fill="#fff" opacity="0.15"/>
      <path d="M8 6l4 4-4 4" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </a>
</div>

      
      <p style="margin-top: 30px; font-size: 16px;">Best regards,<br><strong>NAAS Team</strong></p>
    </div>
    
    <!-- Footer -->
    <div style="background-color: #f3f4f6; padding: 20px; text-align: center; font-size: 14px; color: #6b7280;">
      <p style="margin: 0;">© 2025 NganjiHub. All rights reserved.</p>
      <p style="margin: 10px 0 0;">This is an automated message, please do not reply to this email.</p>
    </div>
  </div>
</body>
</html>
`;

export const WELCOME_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to NganjiHub - NAAS</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
</head>
<body style="font-family: 'Inter', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 0;">
  <div style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); margin: 20px auto;">
    <!-- Header -->
    <div style="background: linear-gradient(to right, #1a56db, #3b82f6); padding: 30px; text-align: center;">
      <h1 style="color: white; margin: 0; font-weight: 700; font-size: 24px;">Welcome to NganjiHub!</h1>
    </div>
    
    <!-- Content -->
    <div style="background-color: #ffffff; padding: 30px;">
      <p style="margin-top: 0; font-size: 16px;">Hello {userName},</p>
      <p style="font-size: 16px;">Welcome to <strong>NganjiHub</strong> - your digital platform for <strong>Njangi as a Service (NAAS)</strong>! We're thrilled to have you join our community.</p>
      
      <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #1a56db;">
        <p style="font-size: 16px; margin-top: 0;"><strong>What is Njangi?</strong></p>
        <p style="font-size: 16px; margin-bottom: 0;">Njangi is a traditional rotating savings and credit association where members contribute money regularly, and each member takes turns receiving the collected sum. It's a community-based financial system built on trust and mutual support that has helped communities save and invest for generations.</p>
      </div>
      
      <div style="text-align: center; margin: 30px 0;">
        <div style="background-color: #dbeafe; border-radius: 50%; width: 80px; height: 80px; margin: 0 auto; display: flex; align-items: center; justify-content: center;">
          <div style="color: #1a56db; font-size: 40px;">🎉</div>
        </div>
      </div>
      
      <p style="font-size: 16px;"><strong>NAAS (Njangi as a Service)</strong> brings this traditional financial practice to the digital world, making it more accessible, transparent, and secure. Our platform helps you create, manage, and participate in Njangi groups without the traditional limitations of physical meetings or cash handling.</p>
      
      <p style="font-size: 16px;">With NganjiHub, you can:</p>
      
      <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <ul style="font-size: 16px; padding-left: 20px; margin: 0;">
          <li>Create and manage Njangi groups with friends, family, or colleagues</li>
          <li>Invite members to join your groups from anywhere in the world</li>
          <li>Track contributions and payouts with complete transparency</li>
          <li>Set up automatic reminders for payments</li>
          <li>Securely manage your finances with digital payments</li>
          <li>Build savings and access funds when you need them most</li>
        </ul>
      </div>
      
      <p style="font-size: 16px;">Our mission is to preserve the community spirit and financial benefits of traditional Njangi while eliminating geographical barriers and security concerns.</p>
      
      <p style="font-size: 16px;">To get started, click the button below to access your dashboard:</p>
      
      <div style="text-align: center; margin: 30px 0;">
        <a href="{dashboardURL}" style="background-color: #1a56db; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: 600; display: inline-block; font-size: 16px;">Go to Dashboard</a>
      </div>
      
      <p style="font-size: 16px;">If you have any questions or need assistance, our support team is always here to help.</p>
      <p style="margin-top: 30px; font-size: 16px;">Best regards,<br><strong>NAAS Team</strong></p>
    </div>
    
    <!-- Footer -->
    <div style="background-color: #f3f4f6; padding: 20px; text-align: center; font-size: 14px; color: #6b7280;">
      <p style="margin: 0;">© 2025 NganjiHub. All rights reserved.</p>
      <p style="margin: 10px 0 0;">This is an automated message, please do not reply to this email.</p>
    </div>
  </div>
</body>
</html>
`;
export const GROUP_MEMBER_ADDITION_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Njangi Group Invitation - NganjiHub</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
</head>
<body style="font-family: 'Inter', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 0;">
  <div style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); margin: 20px auto;">
    <!-- Header -->
    <div style="background: linear-gradient(to right, #1a56db, #3b82f6); padding: 30px; text-align: center;">
      <h1 style="color: white; margin: 0; font-weight: 700; font-size: 24px;">You've Been Added to a Njangi Group</h1>
    </div>
    
    <!-- Content -->
    <div style="background-color: #ffffff; padding: 30px;">
      <p style="margin-top: 0; font-size: 16px;">{userName},</p>
      <p style="font-size: 16px;">
        Great news! The Board of Directors has officially approved a Njangi group created by <strong>{creatorName}</strong>, and you've been added as a member of <strong>"{groupName}"</strong> on NganjiHub.
      </p>

      <p style="font-size: 16px; background-color: #fef3c7; padding: 10px; border-left: 4px solid #f59e0b; border-radius: 4px;">
        <strong>Note:</strong> For security reasons, your invitation link will expire in <strong>24 hours</strong>. Please complete your registration before then.
      </p>
      
      <div style="text-align: center; margin: 30px 0;">
        <div style="background-color: #dbeafe; border-radius: 50%; width: 80px; height: 80px; margin: 0 auto; display: flex; align-items: center; justify-content: center;">
          <div style="color: #1a56db; font-size: 40px;">👥</div>
        </div>
      </div>
      
      <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p style="font-size: 16px; margin-top: 0;"><strong>Group Details:</strong></p>
        <ul style="font-size: 16px; padding-left: 20px; margin-bottom: 0;">
          <li>Group Name: {groupName}</li>
          <li>Created By: {creatorName}</li>
          <li>Your Role: Member</li>
          <li>Contribution Amount: {contributionAmount} FCFA</li>
          <li>Payment Frequency: {paymentFrequency}</li>
        </ul>
      </div>
      
      <p style="font-size: 16px;">To join the group and activate your membership, click the button below:</p>
      
      <div style="text-align: center; margin: 30px 0;">
        <a href="{registrationUrl}" style="background-color: #1a56db; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: 600; display: inline-block; font-size: 16px;">Accept Invitation</a>
      </div>
      
      <p style="font-size: 16px;">If you believe you've received this email in error, please contact our support team or speak with {creatorName}.</p>
      
      <p style="margin-top: 30px; font-size: 16px;">Best regards,<br><strong>NAAS Team</strong></p>
    </div>
    
    <!-- Footer -->
    <div style="background-color: #f3f4f6; padding: 20px; text-align: center; font-size: 14px; color: #6b7280;">
      <p style="margin: 0;">© 2025 NganjiHub. All rights reserved.</p>
      <p style="margin: 10px 0 0;">This is an automated message, please do not reply to this email.</p>
    </div>
  </div>
</body>
</html>
`;
