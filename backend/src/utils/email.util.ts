// utils/email.util.ts
import { Resend } from 'resend';
import env from "../utils/env"

// Configure Resend
const resend = new Resend(`${env.RESEND_API_KEY}`);

/**
 * Sends an OTP email to the user using Resend
 * @param email - User's email address
 * @param otp - Generated OTP
 * @returns Promise<boolean> - Returns true if email is sent successfully
 */
export const sendOtpEmail = async (email: string, otp: string): Promise<boolean> => {
  try {
    const { data, error } = await resend.emails.send({
      from: 'OneVote <onboarding@resend.dev>', // Update with your from address
      to: [email],
      subject: 'OneVote - Email Verification OTP',
      html: `
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
      `
    });

    if (error) {
      console.error('Error sending email:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};