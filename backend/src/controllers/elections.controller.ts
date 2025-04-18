import { Request, Response } from 'express';
import { Election } from '../models/election.model';
import { Candidate } from '../models/candidate.model';
import { ApiResponse, ApiError } from '../utils/handlers';
import { uploadOnCloudinary } from '../utils/cloudinary.util';

export const createElection = async (req: Request, res: Response) => {
    try {
        const { name, electionId,admin } = req.body;

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
            electionId
        });

        return ApiResponse(res, 201, 'Election created successfully', election);
    } catch (error: any) {
        throw new ApiError(error.statusCode || 500, error.message);
    }
};

export const getElection = async (req: Request, res: Response) => {
    try {
        const election = await Election.findById(req.params.electionId);
        if (!election) throw new ApiError(404, 'Election not found');
        return ApiResponse(res, 200, 'Election details', election);
    } catch (error: any) {
        throw new ApiError(error.statusCode || 500, error.message);
    }
};

export const addVoters = async (req: Request, res: Response) => {
    try {
        const { voters } = req.body;
        
        if (!voters || !Array.isArray(voters)) {
            throw new ApiError(400, 'Voters array is required');
        }
        
        const election = await Election.findByIdAndUpdate(
            req.params.electionId,
            { $addToSet: { voters: { $each: voters.map((v: string) => parseInt(v)) } } },
            { new: true }
        );
        
        if (!election) throw new ApiError(404, 'Election not found');
        
        return ApiResponse(res, 200, 'Voters added successfully', election);
    } catch (error: any) {
        throw new ApiError(error.statusCode || 500, error.message);
    }
};

export const toggleResultsVisibility = async (req: Request, res: Response) => {
    try {
        const election = await Election.findByIdAndUpdate(
            req.params.electionId,
            { showResults: req.body.showResults },
            { new: true }
        );
        
        if (!election) throw new ApiError(404, 'Election not found');
        
        return ApiResponse(res, 200, 'Results visibility updated', election);
    } catch (error: any) {
        throw new ApiError(error.statusCode || 500, error.message);
    }
};

export const getElectionResults = async (req: Request, res: Response) => {
    try {
        const election = await Election.findById(req.params.electionId)
            .populate({
                path: 'candidates',
                select: 'firstName lastName votesCount avatar representative'
            });
        
        if (!election) throw new ApiError(404, 'Election not found');
        
        return ApiResponse(res, 200, 'Election results', election);
    } catch (error: any) {
        throw new ApiError(error.statusCode || 500, error.message);
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
        const { ...candidateData } = req.body;
        const avatarPath = req.file?.path;

        const election = await Election.findById(electionId);
        if (!election) throw new ApiError(404, 'Election not found');

        const avatar = await uploadOnCloudinary(avatarPath || '');
        if (!avatar) throw new ApiError(400, 'Avatar upload failed');

        const candidate = await Candidate.create({
            ...candidateData,
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
        if (!election.voters.includes(user.uniqueId)) {
            throw new ApiError(403, 'Not authorized to vote in this election');
        }

        // Check existing vote
        if (election.votedUsers.includes(user.uniqueId)) {
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
        election.votedUsers.push(user.uniqueId);
        await election.save();

        return ApiResponse(res, 200, 'Vote recorded successfully', candidate);
    } catch (error: any) {
        throw new ApiError(error.statusCode || 500, error.message);
    }
};