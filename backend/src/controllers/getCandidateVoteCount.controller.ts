import { Request, Response } from 'express';
import { Admin } from '../models/admin.model';
import { Candidate } from '../models/candidate.model';
import { Election } from '../models/election.model';
import { ApiError, ApiResponse } from '../utils/handlers';
import mongoose, { HydratedDocument } from 'mongoose';
import { ElectionModel } from '../utils/types.util';

// Define ElectionDocument to match Mongoose's document type with explicit _id
type ElectionDocument = HydratedDocument<ElectionModel, {}, { _id: mongoose.Types.ObjectId }>;

export const getCandidatesByElection = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { electionId } = req.params;

    if (!electionId) throw new ApiError(400, 'Election ID is required');

    // Find the election by electionId and populate the candidates
    const election = await Election.findOne({ electionId }).populate('candidates') as ElectionDocument | null;

    if (!election) {
      throw new ApiError(404, 'Election not found');
    }

    // Map the candidates to the desired response format
    const candidates = election.candidates.map((candidate: any) => ({
      candidateId: candidate._id,
      candidateName: `${candidate.firstName} ${candidate.lastName}`,
      voteCount: candidate.votesCount || 0,
      photoUrl: candidate.avatar || ''
    }));

    return ApiResponse(res, 200, 'Candidates fetched successfully', {
      electionId,
      electionName: election.name,
      candidates
    });
  } catch (error: any) {
    console.error('Error fetching candidates for election:', error);
    return ApiResponse(
      res,
      error.statusCode || 500,
      error.message || 'Error fetching candidates',
      null,
      null,
      null,
      error
    );
  }
};

export const toggleResultsVisibility = async (req: Request, res: Response) => {
  try {
    const admin = req.data;
    if (!admin) throw new ApiError(401, 'Admin is not authorized');

    const { electionId, showResults } = req.body;

    if (!electionId) throw new ApiError(400, 'Election ID is required');
    if (typeof showResults !== 'boolean') {
      throw new ApiError(400, 'showResults must be a boolean value');
    }

    // Find the election by electionId
    const election = await Election.findOne({ electionId }) as ElectionDocument | null;
    if (!election) {
      throw new ApiError(404, 'Election not found');
    }

    // Verify the admin owns the election
    if (election.admin.toString() !== admin._id.toString()) {
      throw new ApiError(403, 'Admin is not authorized to modify this election');
    }

    // Update the election's showResults field
    election.showResults = showResults;
    await election.save();

    return ApiResponse(
      res,
      200,
      `Results visibility ${showResults ? 'enabled' : 'disabled'} successfully`,
      { electionId, showResults }
    );
  } catch (error: any) {
    console.error('Error toggling results visibility:', error);
    return ApiResponse(
      res,
      error.statusCode || 500,
      error.message || 'Error toggling results visibility',
      null,
      null,
      null,
      error
    );
  }
};

export const getResultsVisibility = async (req: Request, res: Response) => {
  try {
    const { electionId } = req.params;

    if (!electionId) throw new ApiError(400, 'Election ID is required');

    // Find the election by electionId
    const election = await Election.findOne({ electionId }, 'showResults') as ElectionDocument | null;
    if (!election) {
      throw new ApiError(404, 'Election not found');
    }

    return ApiResponse(res, 200, 'Results visibility fetched successfully', {
      electionId,
      showResults: election.showResults
    });
  } catch (error: any) {
    console.error('Error fetching results visibility:', error);
    return ApiResponse(
      res,
      error.statusCode || 500,
      error.message || 'Error fetching results visibility',
      null,
      null,
      null,
      error
    );
  }
};

export const getCandidateVoteCount = async (_: Request, res: Response): Promise<Response> => {
  try {
    const candidates = await Candidate.find();

    const voteCounts = candidates.map(candidate => ({
      candidateId: candidate._id,
      candidateName: `${candidate.firstName} ${candidate.lastName}`,
      voteCount: candidate.votesCount || 0,
      photoUrl: candidate.avatar || ''
    }));

    return ApiResponse(res, 200, 'Candidate vote counts fetched successfully', voteCounts);
  } catch (error: any) {
    console.error('Error fetching vote counts:', error);
    return ApiResponse(
      res,
      error.statusCode || 500,
      error.message || 'Internal server error',
      null,
      null,
      null,
      error
    );
  }
};