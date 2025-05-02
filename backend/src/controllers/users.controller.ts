import { uploadOnCloudinary, deleteFromCloudinary } from "../utils/cloudinary.util";
import { Candidate } from "../models/candidate.model";
import { User } from "../models/user.model";
import { Election } from "../models/election.model";
import bcrypt from "bcrypt";
import { Updates } from "../utils/types.util";
import { Response, Request } from "express";
import { ApiError, ApiResponse } from "../utils/handlers";
import mongoose, { HydratedDocument } from "mongoose";
import { ElectionModel } from "../utils/types.util";

// Explicitly type the Election document to ensure _id is mongoose.Types.ObjectId
type ElectionDocument = HydratedDocument<ElectionModel> & { _id: mongoose.Types.ObjectId };

export const getUser = async (req: Request, res: Response) => {
  try {
    const currentUser = req.data;
    if (!currentUser) throw new ApiError(400, 'User is not authorized');
    return ApiResponse(res, 200, 'User data fetched successfully', currentUser);
  } catch (error: any) {
    console.error('Error fetching user:', error);
    return ApiResponse(res, error.statusCode || 500, error.message || 'Internal server error', null, null, null, error);
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName } = req.body;
    let updates: Updates = {};

    const currentUser = req.data;
    if (!currentUser) throw new ApiError(401, 'User is not authorized');

    const avatarLocalPath = req.file?.path;

    if (avatarLocalPath) {
      const alreadyHaveAvatar = currentUser.avatar;
      const uploadAvatar = await uploadOnCloudinary(avatarLocalPath);
      if (!uploadAvatar?.url) throw new ApiError(500, 'Failed to upload avatar');
      updates.avatar = uploadAvatar.url;

      if (alreadyHaveAvatar) {
        const deleteFile = await deleteFromCloudinary(alreadyHaveAvatar);
        if (!deleteFile) throw new ApiError(400, 'Avatar file not found');
      }
    }

    if (firstName) updates.firstName = firstName;
    if (lastName) updates.lastName = lastName;

    const user = await User.findByIdAndUpdate(
      currentUser._id,
      { $set: updates },
      { new: true }
    ).select("-password -role");

    if (!user) throw new ApiError(404, 'User not found');

    return ApiResponse(res, 200, 'User updated successfully', user);
  } catch (error: any) {
    console.error('Error updating user:', error);
    return ApiResponse(res, error.statusCode || 500, error.message || 'Internal server error', null, null, null, error);
  }
};

export const updateUserPassword = async (req: Request, res: Response) => {
  try {
    const { currentPassword, newPassword, confirmNewPassword } = req.body;
    const currentUser = req.data;
    if (!currentUser) throw new ApiError(401, 'User is not authorized');

    if (!currentPassword || !newPassword || !confirmNewPassword) {
      throw new ApiError(400, 'Current password, new password, and confirm new password are required');
    }

    // Validate non-empty fields
    for (const value of [currentPassword, newPassword, confirmNewPassword]) {
      if (typeof value === 'string' && value.trim().length === 0) {
        throw new ApiError(400, 'Required fields cannot be empty');
      }
    }

    const isPassCorrect = await bcrypt.compare(currentPassword, currentUser.password);
    if (!isPassCorrect) throw new ApiError(400, 'Current password is incorrect');

    if (newPassword === currentPassword) {
      throw new ApiError(400, 'New password cannot be the same as the current password');
    }

    if (newPassword !== confirmNewPassword) {
      throw new ApiError(400, 'New password and confirm password do not match');
    }

    const newHashedPassword = await bcrypt.hash(newPassword, 10);

    const updatedUser = await User.findByIdAndUpdate(
      currentUser._id,
      { password: newHashedPassword },
      { new: true }
    ).select("-password -role");

    if (!updatedUser) throw new ApiError(404, 'User not found');

    return ApiResponse(res, 200, 'Password updated successfully', updatedUser);
  } catch (error: any) {
    console.error('Error updating user password:', error);
    return ApiResponse(res, error.statusCode || 500, error.message || 'Internal server error', null, null, null, error);
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const currentUser = req.data;
    if (!currentUser) throw new ApiError(401, 'User verification failed');

    // Delete the avatar from Cloudinary if it exists
    if (currentUser.avatar) {
      const deleteResult = await deleteFromCloudinary(currentUser.avatar);
      if (!deleteResult) {
        console.warn('Failed to delete avatar from Cloudinary, proceeding with user deletion');
      }
    }

    // Delete the user from the database
    const deletedUser = await User.findByIdAndDelete(currentUser._id);
    if (!deletedUser) throw new ApiError(404, 'User not found');

    const cookieOptions = {
      httpOnly: true,
      secure: true
    };

    // Clear multiple cookies using removeCookies
    return ApiResponse(
      res,
      200,
      'User deleted successfully',
      null,
      null,
      { tokenName: 'accessToken', options: cookieOptions },
      null
    ).clearCookie('refreshToken', cookieOptions);
  } catch (error: any) {
    console.error('Error deleting user:', error);
    return ApiResponse(res, error.statusCode || 500, error.message || 'Internal server error', null, null, null, error);
  }
};

export const voteCandidate = async (req: Request, res: Response) => {
  try {
    const currentUser = req.data;
    if (!currentUser) throw new ApiError(401, 'User is not authorized');

    const { id, electionId } = req.params;
    if (!id) throw new ApiError(400, 'Candidate ID is required');
    if (!electionId) throw new ApiError(400, 'Election ID is required');

    // Validate MongoDB ObjectId for candidate
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new ApiError(400, 'Invalid candidate ID format');
    }

    // Find the election with explicit typing
    const election: ElectionDocument | null = await Election.findOne({ electionId });
    if (!election) throw new ApiError(404, 'Election not found');

    // Check if user is eligible to vote
    if (!election.voters.includes(currentUser.email)) {
      throw new ApiError(403, 'User is not eligible to vote in this election');
    }

    // Check if user has already voted
    if (election.votedUsers.includes(currentUser.email) || currentUser.isVoted) {
      throw new ApiError(400, 'User has already voted');
    }

    // Find the candidate
    const candidate = await Candidate.findById(id);
    if (!candidate) throw new ApiError(404, 'Candidate not found');

    // Verify candidate belongs to the election
    if (candidate.election.toString() !== election._id.toString()) {
      throw new ApiError(400, 'Candidate is not associated with this election');
    }

    // Update candidate's vote count and votedUsers
    candidate.votedUsers = candidate.votedUsers || [];
    candidate.votedUsers.push(currentUser._id);
    candidate.votesCount = (candidate.votesCount || 0) + 1;
    await candidate.save();

    // Update election's votedUsers with user email
    election.votedUsers.push(currentUser.email);
    await election.save();

    // Update user's isVoted status
    const updatedUser = await User.findByIdAndUpdate(
      currentUser._id,
      { isVoted: true },
      { new: true }
    ).select("-password -role");

    if (!updatedUser) throw new ApiError(404, 'User not found');

    return ApiResponse(res, 200, 'Thanks for voting, your submission recorded successfully', updatedUser);
  } catch (error: any) {
    console.error('Error voting for candidate:', error);
    return ApiResponse(res, error.statusCode || 500, error.message || 'Internal server error', null, null, null, error);
  }
};