import { Request, Response } from 'express';
import { Candidate } from '../models/candidate.model';

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