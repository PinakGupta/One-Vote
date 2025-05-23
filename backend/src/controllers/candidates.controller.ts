import { ApiResponse, ApiError } from "../utils/handlers";
import mongoose from "mongoose";
import { Request, Response } from "express";
import { Candidate } from "../models/candidate.model";
import { uploadOnCloudinary, deleteFromCloudinary } from "../utils/cloudinary.util";
import { Election } from "../models/election.model";

export const addCandidate = async (req: Request, res: Response) => {
  try {
    console.log("Request body:", req.body);
    console.log("Request file:", req.file);

    // Extract electionId from URL params
    const { electionId } = req.params;

    if (!electionId) {
      throw new ApiError(400, 'Election ID is required');
    }

    // Check if the election exists
    const election = await Election.findOne({ electionId });
    if (!election) {
      throw new ApiError(404, 'Election not found');
    }

    const { promises, ...rest } = req.body;

    // Check if required fields are provided and not empty
    for (const key in rest) {
      const value = rest[key];
      if (typeof value === 'string' && value.trim().length === 0) {
        throw new ApiError(400, 'Required Fields are Mandatory');
      }
    }

    // Check if candidate already exists
    const existedCandidate = await Candidate.findOne({
      email: rest.email
    });

    if (existedCandidate) {
      throw new ApiError(400, 'Candidate with this email already exists');
    }

    // Handle avatar upload - modified for memory storage
    if (!req.file) {
      throw new ApiError(400, 'Avatar is Required');
    }

    // Upload directly from memory to Cloudinary
    const uploadAvatar = await uploadOnCloudinary(req.file);
    if (!uploadAvatar || !uploadAvatar.url) {
      throw new ApiError(400, 'Failed to upload avatar to cloud storage');
    }

    // Process promises based on whether it's an array or comma-separated string
    let promiseArray: string[] = [];

    if (Array.isArray(req.body.promise)) {
      // Handle the array format from the frontend
      promiseArray = req.body.promise;
    } else if (typeof req.body.promise === 'string' && req.body.promise.trim()) {
      // Handle legacy format of comma-separated promises
      promiseArray = req.body.promise.split(', ').map((item: string) => item.trim().replace(/'/g, ''));
    }

    // Create candidate in the database with election reference
    const candidate = await Candidate.create({
      firstName: rest.firstName,
      lastName: rest.lastName,
      email: rest.email,
      avatar: uploadAvatar.url,
      town: rest.town,
      candidateType: rest.candidateType.charAt(0).toUpperCase() + rest.candidateType.slice(1),
      dob: rest.dob,
      promise: promiseArray,
      election: election._id // Associate with the election
    });

    if (!candidate) {
      throw new ApiError(500, 'Problem in creating a candidate');
    }

    // Update the election document to include this candidate
    await Election.findByIdAndUpdate(
      election._id,
      { $push: { candidates: candidate._id } },
      { new: true }
    );

    return ApiResponse(res, 201, 'Candidate Added Successfully', candidate);
  } catch (error) {
    if (error instanceof ApiError) {
      return ApiResponse(res, error.statusCode, error.message, null);
    }
    console.error("Error adding candidate:", error);
    return ApiResponse(res, 500, 'Internal server error', null);
  }
};

export const getCandidateById = async (req: Request, res: Response) => {
  try {
    const { candidateId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(candidateId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid candidate ID format'
      });
    }

    const candidate = await Candidate.findById(candidateId);
    
    if (!candidate) {
      return res.status(404).json({
        success: false,
        message: 'Candidate not found'
      });
    }

    return res.status(200).json({
      success: true,
      candidate
    });
  } catch (error) {
    console.error('Error fetching candidate:', error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while fetching candidate details'
    });
  }
};

export const deleteCandidate = async (req: Request, res: Response) => {
  try {
    const { electionId, candidateId } = req.params;

    // Validate parameters
    if (!electionId) {
      throw new ApiError(400, 'Election ID is required');
    }
    if (!candidateId) {
      throw new ApiError(400, 'Candidate ID is required');
    }
    if (!mongoose.Types.ObjectId.isValid(candidateId)) {
      throw new ApiError(400, 'Invalid Candidate ID format');
    }

    // Find the election
    const election = await Election.findOne({ electionId });
    if (!election) {
      throw new ApiError(404, 'Election not found');
    }

    // Verify the candidate exists and is associated with this election
    const candidate = await Candidate.findOne({
      _id: candidateId,
      election: election._id
    });
    if (!candidate) {
      throw new ApiError(404, 'Candidate not found or not associated with this election');
    }

    // Delete the candidate's avatar from Cloudinary (if it exists)
    if (candidate.avatar) {
      const deleteResult = await deleteFromCloudinary(candidate.avatar);
      if (!deleteResult) {
        console.warn('Failed to delete avatar from Cloudinary, proceeding with candidate deletion');
      }
    }

    // Delete the candidate from the Candidate collection
    await Candidate.findByIdAndDelete(candidateId);

    // Remove the candidate ID from the election's candidates array
    await Election.findByIdAndUpdate(
      election._id,
      { $pull: { candidates: candidateId } },
      { new: true }
    );

    return ApiResponse(res, 200, 'Candidate Removed Successfully');
  } catch (error: any) {
    console.error("Error deleting candidate:", error);
    if (error instanceof ApiError) {
      return ApiResponse(res, error.statusCode, error.message);
    }
    return ApiResponse(res, 500, 'Internal server error');
  }
};

export const updateCandidate = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) throw new ApiError(400, "Candidate ID is required");

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new ApiError(400, "Invalid Candidate ID format");
    }

    // Find the candidate
    const candidateData = await Candidate.findById(id);
    if (!candidateData) throw new ApiError(404, "Candidate not found");

    // Update only provided fields
    const updateFields: Partial<Record<string, any>> = {};

    const { firstName, lastName, email, town, candidateType, dob, promise } = req.body;

    if (firstName) updateFields.firstName = firstName;
    if (lastName) updateFields.lastName = lastName;
    if (email) updateFields.email = email;
    if (town) updateFields.town = town;
    if (candidateType) updateFields.candidateType = candidateType;
    if (dob) updateFields.dob = new Date(dob);
    if (promise) updateFields.promise = Array.isArray(promise) ? promise : [promise];

    // Handle avatar update - modified for memory storage
    if (req.file) {
      // Upload new avatar directly from memory
      const uploadAvatar = await uploadOnCloudinary(req.file);
      if (!uploadAvatar?.url) throw new ApiError(500, "Failed to upload avatar");

      // Delete old avatar
      if (candidateData.avatar) {
        const deleteFile = await deleteFromCloudinary(candidateData.avatar);
        if (!deleteFile) {
          console.warn("Old avatar file not found or could not be deleted");
        }
      }

      updateFields.avatar = uploadAvatar.url;
    }

    // Update the candidate document
    const updatedCandidate = await Candidate.findByIdAndUpdate(id, updateFields, {
      new: true,
      runValidators: true,
    });

    return ApiResponse(res, 200, "Candidate updated successfully", updatedCandidate);
  } catch (error: any) {
    console.error("Update Candidate Error:", error);
    throw new ApiError(error.statusCode || 500, error.message || "Internal Server Error");
  }
};

export const getCandidate = async (_req: Request, res: Response) => {
  const candidateData = await Candidate.find();
  return ApiResponse(res, 200, 'All candidates fetched Successfully', candidateData);
};

export const getCandidates = async (req: Request, res: Response) => {
  try {
    const { electionId } = req.params;

    if (!electionId) {
      throw new ApiError(400, 'Election ID is required');
    }

    // Find the election by electionId
    const election = await Election.findOne({ electionId });

    if (!election) {
      throw new ApiError(404, 'Election not found');
    }

    // Find all candidates associated with this election
    const candidates = await Candidate.find({ election: election._id })
      .select('-__v')
      .sort({ firstName: 1 });

    // Return success response with candidates
    return ApiResponse(
      res,
      200,
      'Candidates fetched successfully',
      {
        count: candidates.length,
        candidates
      }
    );
  } catch (error) {
    if (error instanceof ApiError) {
      return ApiResponse(res, error.statusCode, error.message, null);
    }
    console.error("Error fetching candidates:", error);
    return ApiResponse(res, 500, 'Internal server error', null);
  }
};

export const getSpecificCandidate = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) throw new ApiError(400, 'ID is required');

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid ID format");
  }
  const candidateData = await Candidate.findById({ _id: id });
  return ApiResponse(res, 200, `Details of ${id}`, candidateData);
};

export const getCandidateDetails = async (req: Request, res: Response) => {
  try {
    const { electionId, candidateId } = req.params;

    if (!electionId || !candidateId) {
      throw new ApiError(400, 'Election ID and Candidate ID are required');
    }

    // Find the election by electionId
    const election = await Election.findOne({ electionId });

    if (!election) {
      throw new ApiError(404, 'Election not found');
    }

    // Find the specific candidate
    const candidate = await Candidate.findById(candidateId);

    if (!candidate) {
      throw new ApiError(404, 'Candidate not found');
    }

    // Return success response with candidate details
    return ApiResponse(
      res,
      200,
      'Candidate details fetched successfully',
      candidate
    );
  } catch (error) {
    if (error instanceof ApiError) {
      return ApiResponse(res, error.statusCode, error.message, null);
    }
    console.error("Error fetching candidate details:", error);
    return ApiResponse(res, 500, 'Internal server error', null);
  }
};