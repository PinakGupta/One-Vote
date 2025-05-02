import { Request, Response } from 'express';
import { Election } from '../models/election.model';
import { Candidate } from '../models/candidate.model';
import { ApiResponse, ApiError } from '../utils/handlers';
import { uploadOnCloudinary, deleteFromCloudinary } from '../utils/cloudinary.util';
import mongoose from 'mongoose';
import { User } from '../models/user.model';

export const checkEligibility = async (req: Request, res: Response) => {
  try {
    const { userId, electionId } = req.body;

    if (!userId || !electionId) {
      return res.status(400).json({ 
        success: false, 
        message: 'User ID and Election ID are required' 
      });
    }

    // Find the user by MongoDB _id
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    // Find the election by electionId
    const election = await Election.findOne({ electionId });
    if (!election) {
      return res.status(404).json({ 
        success: false, 
        message: 'Election with this ID does not exist' 
      });
    }

    // Check if user's email is in the voters list
    const isEligible = election.voters.includes(user.email);

    return res.status(200).json({
      success: true,
      eligible: isEligible,
      message: isEligible ? 
        'You are eligible to vote in this election' : 
        'You are not eligible to vote in this election'
    });
  } catch (error) {
    console.error('Error checking eligibility:', error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while checking eligibility'
    });
  }
};

export const getCandidatesList = async (req: Request, res: Response) => {
  try {
    const { electionId } = req.params;
    const userId = req.params.id; // MongoDB _id from route params

    const election = await Election.findOne({ electionId })
      .populate('candidates');
    
    if (!election) {
      return res.status(404).json({
        success: false,
        message: 'Election not found'
      });
    }

    // Verify user eligibility
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const isEligible = election.voters.includes(user.email);
    if (!isEligible) {
      return res.status(403).json({
        success: false,
        message: 'You are not eligible to vote in this election'
      });
    }

    return res.status(200).json({
      success: true,
      candidates: election.candidates
    });
  } catch (error) {
    console.error('Error fetching candidates list:', error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while fetching candidates'
    });
  }
};

export const checkVoteStatus = async (req: Request, res: Response) => {
  try {
    const { userId, electionId } = req.params;

    // Validate user ID
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid user ID format'
      });
    }

    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Find the election
    const election = await Election.findOne({ electionId });
    if (!election) {
      return res.status(404).json({
        success: false,
        message: 'Election not found'
      });
    }

    // Check if user's email is in the election's votedUsers array
    const hasVoted = election.votedUsers.includes(user.email) || user.isVoted;

    return res.status(200).json({
      success: true,
      hasVoted
    });
  } catch (error) {
    console.error('Error checking vote status:', error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while checking vote status'
    });
  }
};

export const submitVote = async (req: Request, res: Response) => {
  try {
    const { userId, electionId, candidateId } = req.body;

    // Validate IDs
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid user ID format'
      });
    }

    if (!mongoose.Types.ObjectId.isValid(candidateId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid candidate ID format'
      });
    }

    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Find the election
    const election = await Election.findOne({ electionId });
    if (!election) {
      return res.status(404).json({
        success: false,
        message: 'Election not found'
      });
    }

    // Check if user is eligible to vote in this election
    const isEligible = election.voters.includes(user.email);
    if (!isEligible) {
      return res.status(403).json({
        success: false,
        message: 'User is not eligible to vote in this election'
      });
    }

    // Check if user has already voted
    const hasVoted = election.votedUsers.includes(user.email) || user.isVoted;
    if (hasVoted) {
      return res.status(403).json({
        success: false,
        message: 'User has already voted'
      });
    }

    // Find the candidate
    const candidate = await Candidate.findById(candidateId);
    if (!candidate) {
      return res.status(404).json({
        success: false,
        message: 'Candidate not found'
      });
    }

    // Update candidate's vote count and add user to votedUsers
    candidate.votesCount = (candidate.votesCount || 0) + 1;
    candidate.votedUsers = candidate.votedUsers || [];
    candidate.votedUsers.push(new mongoose.Types.ObjectId(userId));
    await candidate.save();

    // Update election's votedUsers array with user email
    election.votedUsers.push(user.email);
    await election.save();

    // Update user's isVoted status
    user.isVoted = true;
    await user.save();

    return res.status(200).json({
      success: true,
      message: 'Vote submitted successfully'
    });
  } catch (error) {
    console.error('Error submitting vote:', error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while submitting vote'
    });
  }
};

export const createElection = async (req: Request, res: Response) => {
  try {
    const { name, electionId, admin } = req.body;

    if (!name || !electionId) {
      throw new ApiError(400, 'Election name and ID are required');
    }

    const existingElection = await Election.findOne({ electionId });
    if (existingElection) {
      throw new ApiError(400, 'Election ID must be unique');
    }

    const election = await Election.create({
      admin: admin,
      name,
      electionId,
    });

    return ApiResponse(res, 201, 'Election created successfully', election);
  } catch (error: any) {
    throw new ApiError(error.statusCode || 500, error.message);
  }
};

export const getElection = async (req: Request, res: Response) => {
  try {
    const election = await Election.findOne({ electionId: req.params.electionId });
    if (!election) throw new ApiError(404, 'Election not found');
    return ApiResponse(res, 200, 'Election details', election);
  } catch (error: any) {
    throw new ApiError(error.statusCode || 500, error.message);
  }
};

export const addVoters = async (req: Request, res: Response) => {
  try {
    const { voters } = req.body;

    // Validate input is an array
    if (!voters || !Array.isArray(voters)) {
      throw new ApiError(400, 'Voters array is required');
    }

    // Validate each voter email
    const validEmails = voters.map((email: string) => {
      if (typeof email !== 'string' || !email.trim()) {
        throw new ApiError(400, `Invalid email: ${email}`);
      }
      return email.trim();
    });

    // Find by custom electionId and add unique voters
    const election = await Election.findOneAndUpdate(
      { electionId: req.params.electionId },
      {
        $addToSet: {
          voters: { $each: validEmails }
        }
      },
      {
        new: true,
        runValidators: true
      }
    );

    // Handle case where no such election exists
    if (!election) {
      throw new ApiError(404, 'Election not found');
    }

    return ApiResponse(res, 200, 'Voters added successfully', election);
  } catch (error: any) {
    throw new ApiError(error.statusCode || 500, error.message);
  }
};

export const toggleResultsVisibility = async (req: Request, res: Response) => {
  try {
    const { electionId } = req.params;
    const { showResults } = req.body;

    // Validate electionId
    if (!electionId) {
      throw new ApiError(400, 'Election ID is required');
    }

    // Validate showResults
    if (showResults === undefined || showResults === null) {
      throw new ApiError(400, 'showResults is required');
    }
    if (typeof showResults !== 'boolean') {
      throw new ApiError(400, 'showResults must be a boolean value');
    }

    // Find and update the election by custom electionId
    const election = await Election.findOneAndUpdate(
      { electionId },
      { showResults },
      { new: true }
    );

    if (!election) {
      throw new ApiError(404, 'Election not found');
    }

    return ApiResponse(
      res,
      200,
      `Results visibility ${showResults ? 'enabled' : 'disabled'} successfully`,
      { showResults: election.showResults }
    );
  } catch (error: any) {
    console.error('Error toggling results visibility:', error);
    return ApiResponse(
      res,
      error.statusCode || 500,
      error.message || 'Error toggling results visibility'
    );
  }
};

export const getElectionResultsVisibility = async (req: Request, res: Response) => {
  try {
    const { electionId } = req.params;

    // Validate electionId
    if (!electionId) {
      throw new ApiError(400, 'Election ID is required');
    }

    // Find the election by custom electionId
    const election = await Election.findOne({ electionId }, 'showResults');
    if (!election) {
      throw new ApiError(404, 'Election not found');
    }

    return ApiResponse(res, 200, 'Results visibility fetched successfully', {
      showResults: election.showResults
    });
  } catch (error: any) {
    console.error('Error fetching results visibility:', error);
    return ApiResponse(
      res,
      error.statusCode || 500,
      error.message || 'Error fetching results visibility'
    );
  }
};

export const getElectionResults = async (req: Request, res: Response) => {
  try {
    const { userId, electionId } = req.params;

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid user ID format'
      });
    }

    // Find the election by electionId
    const election = await Election.findOne({ electionId });

    if (!election) {
      return res.status(404).json({
        success: false,
        message: 'Election not found'
      });
    }

    // Check if results are allowed to be shown
    if (!election.showResults) {
      return res.status(403).json({
        success: false,
        message: 'Results are not yet declared by admin',
        isResultsAvailable: false
      });
    }

    // Get candidates for this election with populated data
    const candidates = await Candidate.find({ election: election._id })
      .sort({ votesCount: -1 }) // Sort by vote count in descending order
      .select('firstName lastName avatar town candidateType votesCount promise');

    // Calculate total votes
    const totalVotes = candidates.reduce((sum, candidate) => sum + (candidate.votesCount || 0), 0);

    // Calculate vote percentage for each candidate
    const candidatesWithPercentage = candidates.map(candidate => {
      const percentage = totalVotes > 0 ? ((candidate.votesCount || 0) / totalVotes * 100).toFixed(2) : '0.00';
      return {
        ...candidate.toObject(),
        percentage: parseFloat(percentage)
      };
    });

    // Get winner (if there are candidates)
    const winner = candidates.length > 0 ? candidates[0] : null;

    return res.status(200).json({
      success: true,
      message: 'Election results fetched successfully',
      data: {
        election,
        candidates: candidatesWithPercentage,
        totalVotes,
        winner,
        isResultsAvailable: true
      }
    });
  } catch (error: unknown) {
    console.error('Error fetching election results:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch election results',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

export const getElectionCandidates = async (req: Request, res: Response) => {
  try {
    const election = await Election.findById(req.params.electionId)
      .populate('candidates');

    if (!election) throw new ApiError(404, 'Election not found');

    return ApiResponse(res, 200, 'Election candidates', election.candidates);
  } catch (error: any) {
    throw new ApiError(error.statusCode || 500, error.message);
  }
};

export const addCandidateToElection = async (req: Request, res: Response) => {
  try {
    const { electionId } = req.params;
    const { firstName, lastName, email, town, candidateType, dob, promise } = req.body;
    const avatarPath = req.file?.path;

    const election = await Election.findById(electionId);
    if (!election) throw new ApiError(404, 'Election not found');

    const avatar = await uploadOnCloudinary(avatarPath || '');
    if (!avatar) throw new ApiError(400, 'Avatar upload failed');

    const candidate = await Candidate.create({
      firstName,
      lastName,
      email,
      town,
      candidateType,
      dob,
      promise,
      election: electionId,
      avatar: avatar.url
    });

    election.candidates.push(candidate._id);
    await election.save();

    return ApiResponse(res, 201, 'Candidate added to election', candidate);
  } catch (error: any) {
    throw new ApiError(error.statusCode || 500, error.message);
  }
};

export const voteCandidate = async (req: Request, res: Response) => {
  try {
    const user = req.data;
    const { electionId, candidateId } = req.params;

    const election = await Election.findById(electionId);
    if (!election) throw new ApiError(404, 'Election not found');

    // Check voter eligibility
    if (!election.voters.includes(user.email)) {
      throw new ApiError(403, 'Not authorized to vote in this election');
    }

    // Check existing vote
    if (election.votedUsers.includes(user.email)) {
      throw new ApiError(400, 'Already voted in this election');
    }

    // Update candidate votes
    const candidate = await Candidate.findByIdAndUpdate(
      candidateId,
      { $inc: { votesCount: 1 } },
      { new: true }
    );

    if (!candidate) throw new ApiError(404, 'Candidate not found');

    // Record vote
    election.votedUsers.push(user.email);
    await election.save();

    return ApiResponse(res, 200, 'Vote recorded successfully', candidate);
  } catch (error: any) {
    throw new ApiError(error.statusCode || 500, error.message);
  }
};

export const deleteCandidate = async (req: Request, res: Response) => {
  try {
    const { electionId, candidateId } = req.params;
    console.log('Election ID:', electionId);
    console.log('Candidate ID:', candidateId);

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

    // Find the election by custom electionId
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
    await Election.findOneAndUpdate(
      { electionId },
      { $pull: { candidates: candidateId } },
      { new: true }
    );

    return ApiResponse(res, 200, 'Candidate removed successfully');
  } catch (error: any) {
    console.error("Error deleting candidate:", error);
    if (error instanceof ApiError) {
      return ApiResponse(res, error.statusCode, error.message);
    }
    return ApiResponse(res, 500, 'Internal server error');
  }
};

export const getElectionCandidateVoteCount = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { electionId } = req.params;

    // Validate electionId
    if (!electionId) {
      throw new ApiError(400, 'Election ID is required');
    }

    // Find the election by custom electionId
    const election = await Election.findOne({ electionId }).populate({
      path: 'candidates',
      select: 'firstName lastName votesCount avatar'
    });

    if (!election) {
      throw new ApiError(404, 'Election not found');
    }

    // Map candidates to the required response format
    const voteCounts = election.candidates.map((candidate: any) => ({
      candidateId: candidate._id,
      candidateName: `${candidate.firstName} ${candidate.lastName}`,
      voteCount: candidate.votesCount || 0,
      photoUrl: candidate.avatar || ''
    }));

    return ApiResponse(res, 200, 'Candidate vote counts retrieved successfully', voteCounts);
  } catch (error: any) {
    console.error('Error fetching election candidate vote counts:', error);
    if (error instanceof ApiError) {
      return ApiResponse(res, error.statusCode, error.message);
    }
    return ApiResponse(res, 500, 'Internal server error');
  }
};

export const updateCandidate = async (req: Request, res: Response) => {
  try {
    const { electionId, candidateId } = req.params;
    const { firstName, lastName, email, town, candidateType, dob, promise } = req.body;
    const avatarPath = req.file?.path;

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

    // Find the election by custom electionId
    const election = await Election.findOne({ electionId });
    if (!election) {
      throw new ApiError(404, 'Election not found');
    }

    // Find the candidate and verify it belongs to the election
    const candidate = await Candidate.findOne({
      _id: candidateId,
      election: election._id,
    });
    if (!candidate) {
      throw new ApiError(404, 'Candidate not found or not associated with this election');
    }

    // Prepare update object
    const updateData: any = {};
    if (firstName) updateData.firstName = firstName;
    if (lastName) updateData.lastName = lastName;
    if (email) updateData.email = email;
    if (town) updateData.town = town;
    if (candidateType) updateData.candidateType = candidateType;
    if (dob) updateData.dob = new Date(dob);
    if (promise) updateData.promise = Array.isArray(promise) ? promise : [promise];

    // Handle avatar update
    if (avatarPath) {
      // Upload new avatar to Cloudinary
      const avatar = await uploadOnCloudinary(avatarPath);
      if (!avatar) {
        throw new ApiError(400, 'Avatar upload failed');
      }
      updateData.avatar = avatar.url;

      // Delete old avatar from Cloudinary (if it exists)
      if (candidate.avatar) {
        const deleteResult = await deleteFromCloudinary(candidate.avatar);
        if (!deleteResult) {
          console.warn('Failed to delete old avatar from Cloudinary, proceeding with update');
        }
      }
    }

    // Update candidate
    const updatedCandidate = await Candidate.findByIdAndUpdate(
      candidateId,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedCandidate) {
      throw new ApiError(500, 'Failed to update candidate');
    }

    return ApiResponse(res, 200, 'Candidate updated successfully', updatedCandidate);
  } catch (error: any) {
    console.error('Error updating candidate:', error);
    throw new ApiError(error.statusCode || 500, error.message || 'Internal server error');
  }
};