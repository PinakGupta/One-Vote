// utils/email-templates.ts
// You can create more advanced email templates here if needed

/**
 * Generates the HTML for OTP verification email
 * @param otp - The OTP to include in the email
 * @returns string - The HTML email template
 */
export const otpEmailTemplate = (otp: string): string => {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
        <h2 style="color: #333; text-align: center;">OneVote Email Verification</h2>
        <p>Hello,</p>
        <p>Thank you for registering with OneVote. To complete your registration, please verify your email address using the OTP below:</p>
        <div style="background-color: #f9f9f9; padding: 15px; text-align: center; border-radius: 5px; margin: 20px 0;">
          <h3 style="margin: 0; color: #333;">${otp}</h3>
        </div>
        <p>This OTP is valid for <strong>1 minute</strong> only.</p>
        <p>If you did not request this OTP, please ignore this email.</p>
        <p>Best regards,<br>The OneVote Team</p>
      </div>
    `;
  };
  
  /**
   * Generates the HTML for welcome email after successful verification
   * @param firstName - User's first name
   * @returns string - The HTML email template
   */
  export const welcomeEmailTemplate = (firstName: string): string => {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
        <h2 style="color: #333; text-align: center;">Welcome to OneVote!</h2>
        <p>Hello ${firstName},</p>
        <p>Thank you for verifying your email address. Your account is now fully activated.</p>
        <p>You can now participate in elections and exercise your voting right through our secure platform.</p>
        <p>Best regards,<br>The OneVote Team</p>
      </div>
    `;
  };

  export const voterNotificationTemplate = (electionName: string, electionId: string): string => {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>You've Been Added as a Voter</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
          }
          .container {
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 5px;
          }
          .header {
            text-align: center;
            padding-bottom: 10px;
            border-bottom: 1px solid #eee;
            margin-bottom: 20px;
          }
          .content {
            margin-bottom: 20px;
          }
          .election-id {
            background-color: #f5f5f5;
            padding: 10px;
            text-align: center;
            font-size: 18px;
            font-weight: bold;
            border-radius: 5px;
            margin: 15px 0;
          }
          .footer {
            text-align: center;
            font-size: 12px;
            color: #999;
            margin-top: 20px;
            padding-top: 10px;
            border-top: 1px solid #eee;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>OneVote</h2>
          </div>
          <div class="content">
            <p>Hello,</p>
            <p>You have been added as a voter in the <strong>"${electionName}"</strong> election.</p>
            <p>You can now participate in this election using the election ID provided below:</p>
            
            <div class="election-id">
              ${electionId}
            </div>
            
            <p>To vote in this election, please log in to your OneVote account and enter this election ID when prompted.</p>
            <p>If you don't have an account yet, please register and verify your email before voting.</p>
          </div>
          <div class="footer">
            <p>This is an automated message. Please do not reply to this email.</p>
            <p>&copy; ${new Date().getFullYear()} OneVote. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;
  };