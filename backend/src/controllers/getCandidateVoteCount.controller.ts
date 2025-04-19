// import { Request, Response } from 'express';
// import { Candidate } from '../models/candidate.model';

// export const getCandidateVoteCount = async (_: Request, res: Response): Promise<Response> => {
//     try {
//         const candidates = await Candidate.find();

//         const voteCounts = candidates.map(candidate => ({
//             candidateId: candidate._id,
//             candidateName: `${candidate.firstName} ${candidate.lastName}`,
//             voteCount: candidate.votesCount,
//             photoUrl: candidate.avatar,
//             partyName: candidate.representative
//         }));

//         return res.status(200).json(voteCounts);
//     } catch (error) {
//         console.error('Error fetching vote counts:', error);
//         return res.status(500).json({ message: 'Internal server error' });
//     }
// };


import { Request, Response } from 'express';
import { Admin } from '../models/admin.model';
import { Candidate } from '../models/candidate.model';
import { ApiError } from '../utils/handlers';
import { Election } from '../models/election.model';


export const getCandidatesByElection = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { electionId } = req.params; // Get electionId from URL params

        // Find the election by electionId and populate the candidates
        const election = await Election.findOne({ electionId }).populate('candidates');

        if (!election) {
            throw new ApiError(404, 'Election not found');
        }

        // Map the candidates to the desired response format
        const candidates = election.candidates.map((candidate: any) => ({
            candidateId: candidate._id,
            candidateName: `${candidate.firstName} ${candidate.lastName}`,
            voteCount: candidate.votesCount,
            photoUrl: candidate.avatar,
            partyName: candidate.representative
        }));

        return res.status(200).json({
            success: true,
            electionId,
            electionName: election.name,
            candidates
        });
    } catch (error: any) {
        console.error('Error fetching candidates for election:', error);
        throw new ApiError(error.statusCode || 500, error.message || 'Error fetching candidates');
    }
};


// Toggle the visibility of election results
export const toggleResultsVisibility = async (req: Request, res: Response) => {
    try {
        const admin = req.data; // From your middleware
        const { showResults } = req.body;
        
        if (typeof showResults !== 'boolean') {
            throw new ApiError(400, 'showResults must be a boolean value');
        }
        
        const updatedAdmin = await Admin.findByIdAndUpdate(
            admin._id,
            { showResults },
            { new: true }
        );
        
        if (!updatedAdmin) {
            throw new ApiError(404, 'Admin not found');
        }
        
        return res.status(200).json({ 
            success: true,
            message: `Results visibility ${showResults ? 'enabled' : 'disabled'} successfully`,
            showResults: updatedAdmin.showResults
        });
    } catch (error: any) {
        throw new ApiError(error.statusCode || 500, error.message || 'Error toggling results visibility');
    }
};

// Get the current status of results visibility
export const getResultsVisibility = async (_req: Request, res: Response) => {
    try {
        // Get the first admin's settings
        const admin = await Admin.findOne({});
        
        if (!admin) {
            throw new ApiError(404, 'No admin found');
        }
        
        return res.status(200).json({ 
            success: true,
            showResults: admin.showResults 
        });
    } catch (error: any) {
        throw new ApiError(error.statusCode || 500, error.message || 'Error getting results visibility');
    }
};

export const getCandidateVoteCount = async (_: Request, res: Response): Promise<Response> => {
    try {
        const candidates = await Candidate.find();

        const voteCounts = candidates.map(candidate => ({
            candidateId: candidate._id,
            candidateName: `${candidate.firstName} ${candidate.lastName}`,
            voteCount: candidate.votesCount,
            photoUrl: candidate.avatar,
            partyName: candidate.representative
        }));

        return res.status(200).json(voteCounts);
    } catch (error) {
        console.error('Error fetching vote counts:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};