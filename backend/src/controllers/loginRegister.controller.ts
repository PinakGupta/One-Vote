import { Admin } from '../models/admin.model';
import bcrypt from "bcrypt"
import { Request, Response } from 'express';
import { addCookie, removeCookie } from '../utils/cookies.util';
import { User } from '../models/user.model';
import { uploadOnCloudinary } from '../utils/cloudinary.util';
import { ApiResponse, ApiError } from '../utils/handlers';
import { generateAccessToken } from "../utils/tokens.util"
import { Candidate } from '../models/candidate.model';
import { Resend } from 'resend';
import { otpEmailTemplate } from '../utils/email-templates';
import { OTP } from '../models/otp.model';
import env from "../utils/env"

export const login = async (req: Request, res: Response) => {
   try {
      const { email, password } = req.body;
      if (!email || !password) {
         throw new ApiError(400, "Incomplete credentials");
      }

      const userData = await User.findOne({ email });
      
      if (userData) {
         // Check if user is verified
         if (!userData.verified && userData.role !== "admin") {
            throw new ApiError(403, "Email not verified. Please verify your email before logging in.");
         }
         
         const validatePassword = await bcrypt.compare(password, userData.password);

         if (!validatePassword) throw new ApiError(401, 'Either ID or password is incorrect');
         
         const accessToken = generateAccessToken(userData);
         const cook = addCookie(accessToken);
         
         return ApiResponse(res, 200, "User logged in successfully", { data: userData, accessToken }, cook);
      }

      if (!userData) {
         const adminData = await Admin.findOne({ email });

         if (!adminData) {
            throw new ApiError(400, "User with this Id does not exists");
         }

         const isMatch = await bcrypt.compare(password, adminData.password);
         if (!isMatch) {
            throw new ApiError(401, "Incorrect password");
         }

         const token = generateAccessToken(adminData);
         const cookie = addCookie(token);
         
         return ApiResponse(res, 200, 'Admin login successfully', { user: adminData, token }, cookie);
      }

   } catch (err: any) {
      throw new ApiError(err.statusCode || 500, err.message || "Error while login the user");
   }
};

export const logout = async (_req: Request, res: Response) => {
   const clearCookies = removeCookie()
   return ApiResponse(res, 200, 'Logout successfully', null, null, clearCookies)
}

// Initialize Resend
const resend = new Resend(`${env.RESEND_API_KEY}`);

export const register = async (req: Request, res: Response) => {
   try {
      const { firstName, lastName, email, password, role } = req.body;

      // Validate required fields
      if (!password || (role !== "admin" && (!firstName || !lastName || !email))) {
         throw new ApiError(400, 'Required fields are mandatory');
      }

      // Check for existing user or admin by uniqueId
      const existsUser = await User.findOne({ email });
      const existsAdmin = await Admin.findOne({ email });

      if (existsUser || existsAdmin) {
         throw new ApiError(400, "User or Admin with this ID already exists");
      }

      // Additional check for user-specific fields if role is not admin
      if (role !== "admin") {
         const isCandidate = await Candidate.findOne({ email });
         if (isCandidate) {
            throw new ApiError(400, "Candidate cannot register");
         }
      }

      if (role === "admin") {
         // Create Admin
         const admin = await Admin.create({
            email,
            password: await bcrypt.hash(password, 10),
            role: "admin" // Explicitly set, though schema default exists
         });
         await admin.save();

         const token = generateAccessToken(admin);
         const cookie = addCookie(token);

         return ApiResponse(res, 200, "Admin registered successfully", admin, cookie);
      } else {
         // Create User
         const avatarFile = req.file?.path;
         let savedAvatar;

         if (avatarFile) {
            savedAvatar = await uploadOnCloudinary(avatarFile);
         }

         // Set verified to false for new user registration
         const user = await User.create({
            firstName: firstName.toLowerCase(),
            lastName: lastName.toLowerCase(),
            email,
            password: await bcrypt.hash(password, 10),
            avatar: savedAvatar?.url || "",
            verified: false // Initially set to false until email is verified
         });
         await user.save();

         // Generate OTP for email verification
         const otp = Math.floor(100000 + Math.random() * 900000).toString();
         
         // Set expiration time (1 minute from now)
         const expiresAt = new Date();
         expiresAt.setMinutes(expiresAt.getMinutes() + 1);
         
         // Save OTP to database
         await OTP.create({
            email,
            otp,
            expiresAt
         });
         
         // Send OTP via email using Resend
         const { error } = await resend.emails.send({
            from: 'OneVote <onboarding@resend.dev>', // Update with your domain
            to: [email],
            subject: 'OneVote - Email Verification OTP',
            html: otpEmailTemplate(otp)
         });
         
         if (error) {
            console.error('Error sending verification email:', error);
            throw new ApiError(500, "User registered but failed to send verification email");
         }

         const token = generateAccessToken(user);
         const cookie = addCookie(token);

         return ApiResponse(res, 200, "User registered successfully. Please verify your email with the OTP sent to your email address.", user, cookie);
      }
   } catch (err: any) {
      throw new ApiError(err.statusCode || 500, err.message || "Error while registering");
   }
};

export const forgetPassword = async (req: Request, res: Response) => {
   try {
      const { email } = req.body;

      if (!email) throw new ApiError(400, "Incomplete credentials")
      const userData = await User.findOne({ email })

      if (!userData) throw new ApiError(400, `User with this ID doesn't exist`)

      if (userData) {
         if (email === userData.email) {
            return ApiResponse(res, 200, "User verified successfully", userData)
         }
         else {
            throw new ApiError(400, 'Voter Id is incorrect')
         }
      } else {
         throw new ApiError(400, "Id is incorrect")
      }
   } catch (error: any) {
      throw new ApiError(error.statusCode || 400, error.message || 'Error while updating the password')
   }
}

export const newPassword = async (req: Request, res: Response) => {
   try {
      const { id } = req.params
      const { password } = req.body
      const hashPassword = await bcrypt.hash(password, 10)
      const updateData = await User.findByIdAndUpdate(id, { password: hashPassword }, { new: true })

      return ApiResponse(res, 200, "Password updated successfully", updateData)
   } catch (error: any) {
      throw new ApiError(error.statusCode || 400, error.message || 'Error while setting up the new password')
   }
}