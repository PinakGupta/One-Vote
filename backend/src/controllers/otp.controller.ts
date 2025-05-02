// controllers/otp.controller.ts (Updated for Resend)
import { Request, Response } from 'express';
import { ApiResponse, ApiError } from '../utils/handlers';
import { OTP } from '../models/otp.model';
import { User } from '../models/user.model';
import { sendOtpEmail } from '../utils/email.util';
import { Resend } from 'resend';
import env from "../utils/env"
import { otpEmailTemplate, welcomeEmailTemplate } from '../utils/email-templates';

// Initialize Resend
const resend = new Resend(`${env.RESEND_API_KEY}`);

/**
 * Generates a random 6-digit OTP
 * @returns string - 6-digit OTP
 */
const generateOTP = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

/**
 * Sends OTP to user's email for verification
 * @param req - Express Request object
 * @param res - Express Response object
 */
export const sendOTP = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    if (!email) {
      throw new ApiError(400, "Email is required");
    }

    // Check if user exists
    const user = await User.findOne({ email });
    
    if (!user) {
      throw new ApiError(404, "User not found");
    }
    
    if (user.verified) {
      return ApiResponse(res, 200, "User is already verified", null);
    }

    // Generate OTP
    const otp = generateOTP();
    
    // Set expiration time (1 minute from now)
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 1);
    
    // Delete any existing OTP for this email
    await OTP.deleteMany({ email });
    
    // Save OTP to database
    await OTP.create({
      email,
      otp,
      expiresAt
    });
    
    // Send OTP via email using Resend
    const { data, error } = await resend.emails.send({
      from: 'OneVote <onboarding@resend.dev>', // Update this with your domain
      to: [email],
      subject: 'OneVote - Email Verification OTP',
      html: otpEmailTemplate(otp)
    });
    
    if (error) {
      console.error('Error sending email:', error);
      throw new ApiError(500, "Failed to send OTP email");
    }
    
    return ApiResponse(res, 200, "OTP sent successfully. Valid for 1 minute", { emailId: data?.id });
  } catch (error: any) {
    throw new ApiError(error.statusCode || 500, error.message || "Error sending OTP");
  }
};

/**
 * Verifies OTP and updates user verification status
 * @param req - Express Request object
 * @param res - Express Response object
 */
export const verifyOTP = async (req: Request, res: Response) => {
  try {
    const { email, otp } = req.body;
    
    if (!email || !otp) {
      throw new ApiError(400, "Email and OTP are required");
    }
    
    // Find OTP document
    const otpRecord = await OTP.findOne({ email });
    
    if (!otpRecord) {
      throw new ApiError(404, "OTP not found or expired");
    }
    
    // Check if OTP has expired
    if (new Date() > otpRecord.expiresAt) {
      await OTP.deleteOne({ _id: otpRecord._id });
      throw new ApiError(400, "OTP has expired");
    }
    
    // Verify OTP
    if (otpRecord.otp !== otp) {
      throw new ApiError(400, "Invalid OTP");
    }
    
    // Update user verification status
    const updatedUser = await User.findOneAndUpdate(
      { email },
      { verified: true },
      { new: true }
    );
    
    // Delete the used OTP
    await OTP.deleteOne({ _id: otpRecord._id });
    
    // Send welcome email
    if (updatedUser) {
      await resend.emails.send({
        from: 'OneVote <onboarding@resend.dev>', // Update with your domain
        to: [email],
        subject: 'Welcome to OneVote!',
        html: welcomeEmailTemplate(updatedUser.firstName)
      });
    }
    
    return ApiResponse(res, 200, "Email verified successfully", updatedUser);
  } catch (error: any) {
    throw new ApiError(error.statusCode || 500, error.message || "Error verifying OTP");
  }
};

/**
 * Resends OTP to user's email
 * @param req - Express Request object
 * @param res - Express Response object
 */
export const resendOTP = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      throw new ApiError(400, "Email is required");
    }
    
    // Check if user exists
    const user = await User.findOne({ email });
    
    if (!user) {
      throw new ApiError(404, "User not found");
    }
    
    if (user.verified) {
      return ApiResponse(res, 200, "User is already verified", null);
    }
    
    // Delete any existing OTP
    await OTP.deleteMany({ email });
    
    // Generate new OTP
    const otp = generateOTP();
    
    // Set expiration time (1 minute from now)
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 1);
    
    // Save new OTP to database
    await OTP.create({
      email,
      otp,
      expiresAt
    });
    
    // Send OTP via email using Resend
    const { data, error } = await resend.emails.send({
      from: 'OneVote <verification@onevote.app>', // Update with your domain
      to: [email],
      subject: 'OneVote - Email Verification OTP',
      html: otpEmailTemplate(otp)
    });
    
    if (error) {
      console.error('Error sending email:', error);
      throw new ApiError(500, "Failed to send OTP email");
    }
    
    return ApiResponse(res, 200, "OTP resent successfully. Valid for 1 minute", { emailId: data?.id });
  } catch (error: any) {
    throw new ApiError(error.statusCode || 500, error.message || "Error resending OTP");
  }
};