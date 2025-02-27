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

// Get candidate vote counts (modified to check visibility first)
export const getCandidateVoteCount = async (req: Request, res: Response) => {
    try {
        // Check if the request is from an admin
        const userData = req.data;
        const isAdmin = userData.role === 'admin';
        
        if (!isAdmin) {
            // If it's a regular user, check if results are visible
            const admin = await Admin.findOne({});
            
            if (!admin || !admin.showResults) {
                throw new ApiError(403, 'Election results are not available yet');
            }
        }
        
        const candidates = await Candidate.find();

        const voteCounts = candidates.map(candidate => ({
            candidateId: candidate._id,
            candidateName: `${candidate.firstName} ${candidate.lastName}`,
            voteCount: candidate.votesCount,
            photoUrl: candidate.avatar,
            partyName: candidate.representative
        }));

        return res.status(200).json({
            success: true,
            data: voteCounts
        });
    } catch (error: any) {
        throw new ApiError(error.statusCode || 500, error.message || 'Error fetching vote counts');
    }
};