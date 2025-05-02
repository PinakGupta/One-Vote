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