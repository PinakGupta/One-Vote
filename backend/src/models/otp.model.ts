// models/otp.model.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface OtpModel extends Document {
  email: string;
  otp: string;
  createdAt: Date;
  expiresAt: Date;
}

const otpSchema: Schema = new Schema({
  email: {
    type: String,
    required: true
  },
  otp: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 // Auto-delete after 60 seconds
  },
  expiresAt: {
    type: Date,
    required: true
  }
});

export const OTP = mongoose.model<OtpModel>('OTP', otpSchema);