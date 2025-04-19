// import { Request, Response } from 'express';
// import { Election } from '../models/election.model';
// import { Candidate } from '../models/candidate.model';
// import { ApiResponse, ApiError } from '../utils/handlers';
// import { uploadOnCloudinary } from '../utils/cloudinary.util';
// import mongoose from 'mongoose';

// export const createElection = async (req: Request, res: Response) => {
//     try {
//         const { name, electionId,admin } = req.body;

//         if (!name || !electionId) {
//             throw new ApiError(400, 'Election name and ID are required');
//         }

//         const existingElection = await Election.findOne({ electionId });
//         if (existingElection) {
//             throw new ApiError(400, 'Election ID must be unique');
//         }

//         const election = await Election.create({
//             admin: admin,
//             name,
//             electionId,
//         });

//         // Return the complete election object for frontend use
//         return ApiResponse(res, 201, 'Election created successfully', election);
//     } catch (error: any) {
//         throw new ApiError(error.statusCode || 500, error.message);
//     }
// };

// export const getElection = async (req: Request, res: Response) => {
//     try {
//         const election = await Election.findOne({electionId:req.params.electionId});
//         if (!election) throw new ApiError(404, 'Election not found');
//         return ApiResponse(res, 200, 'Election details', election);
//     } catch (error: any) {
//         throw new ApiError(error.statusCode || 500, error.message);
//     }
// };

// // export const addVoters = async (req: Request, res: Response) => {
// //     try {
// //         const { voters } = req.body;
        
// //         if (!voters || !Array.isArray(voters)) {
// //             throw new ApiError(400, 'Voters array is required');
// //         }
        
// //         const election = await Election.findByIdAndUpdate(
// //             req.params.electionId,
// //             { $addToSet: { voters: { $each: voters.map((v: string) => parseInt(v)) } } },
// //             { new: true }
// //         );
        
// //         if (!election) throw new ApiError(404, 'Election not found');
        
// //         return ApiResponse(res, 200, 'Voters added successfully', election);
// //     } catch (error: any) {
// //         throw new ApiError(error.statusCode || 500, error.message);
// //     }
// // };

// export const addVoters = async (req: Request, res: Response) => {
//     try {
//       const { voters } = req.body;
  
//       // 1. Validate input is an array
//       if (!voters || !Array.isArray(voters)) {
//         throw new ApiError(400, 'Voters array is required');
//       }
  
//       // 2. Parse each voter ID to a number safely
//       const parsedVoters = voters.map((v: string) => {
//         const id = parseInt(v, 10); // always specify radix to avoid unexpected bases :contentReference[oaicite:6]{index=6}
//         if (isNaN(id)) {
//           throw new ApiError(400, `Invalid voter ID: ${v}`);
//         }
//         return id;
//       });
  
//       // 3. Find by custom electionId and add unique voters
//       const election = await Election.findOneAndUpdate(
//         { electionId: req.params.electionId },      // query by custom field :contentReference[oaicite:7]{index=7}
//         {
//           $addToSet: {
//             voters: { $each: parsedVoters }           // use $each with $addToSet for bulk unique inserts :contentReference[oaicite:8]{index=8}
//           }
//         },
//         {
//           new: true,                                  // return the updated document :contentReference[oaicite:9]{index=9}
//           runValidators: true                         // enable schema validation on update :contentReference[oaicite:10]{index=10}
//         }
//       );
  
//       // 4. Handle case where no such election exists
//       if (!election) {
//         throw new ApiError(404, 'Election not found');
//       }
  
//       // 5. Respond with updated election
//       return ApiResponse(res, 200, 'Voters added successfully', election);
//     } catch (error: any) {
//       throw new ApiError(error.statusCode || 500, error.message);
//     }
//   };
  

// export const toggleResultsVisibility = async (req: Request, res: Response) => {
//     try {
//         const election = await Election.findByIdAndUpdate(
//             req.params.electionId,
//             { showResults: req.body.showResults },
//             { new: true }
//         );
        
//         if (!election) throw new ApiError(404, 'Election not found');
        
//         return ApiResponse(res, 200, 'Results visibility updated', election);
//     } catch (error: any) {
//         throw new ApiError(error.statusCode || 500, error.message);
//     }
// };

// export const getElectionResults = async (req: Request, res: Response) => {
//     try {
//         const election = await Election.findById(req.params.electionId)
//             .populate({
//                 path: 'candidates',
//                 select: 'firstName lastName votesCount avatar representative'
//             });
        
//         if (!election) throw new ApiError(404, 'Election not found');
        
//         return ApiResponse(res, 200, 'Election results', election);
//     } catch (error: any) {
//         throw new ApiError(error.statusCode || 500, error.message);
//     }
// };

// export const getElectionCandidates = async (req: Request, res: Response) => {
//     try {
//         const election = await Election.findById(req.params.electionId)
//             .populate('candidates');
            
//         if (!election) throw new ApiError(404, 'Election not found');
        
//         return ApiResponse(res, 200, 'Election candidates', election.candidates);
//     } catch (error: any) {
//         throw new ApiError(error.statusCode || 500, error.message);
//     }
// };

// export const addCandidateToElection = async (req: Request, res: Response) => {
//     try {
//         const { electionId } = req.params;
//         const { ...candidateData } = req.body;
//         const avatarPath = req.file?.path;

//         const election = await Election.findById(electionId);
//         if (!election) throw new ApiError(404, 'Election not found');

//         const avatar = await uploadOnCloudinary(avatarPath || '');
//         if (!avatar) throw new ApiError(400, 'Avatar upload failed');

//         const candidate = await Candidate.create({
//             ...candidateData,
//             election: electionId,
//             avatar: avatar.url
//         });

//         election.candidates.push(candidate._id);
//         await election.save();

//         return ApiResponse(res, 201, 'Candidate added to election', candidate);
//     } catch (error: any) {
//         throw new ApiError(error.statusCode || 500, error.message);
//     }
// };

// export const voteCandidate = async (req: Request, res: Response) => {
//     try {
//         const user = req.data;
//         const { electionId, candidateId } = req.params;

//         const election = await Election.findById(electionId);
//         if (!election) throw new ApiError(404, 'Election not found');

//         // Check voter eligibility
//         if (!election.voters.includes(user.uniqueId)) {
//             throw new ApiError(403, 'Not authorized to vote in this election');
//         }

//         // Check existing vote
//         if (election.votedUsers.includes(user.uniqueId)) {
//             throw new ApiError(400, 'Already voted in this election');
//         }

//         // Update candidate votes
//         const candidate = await Candidate.findByIdAndUpdate(
//             candidateId,
//             { $inc: { votesCount: 1 } },
//             { new: true }
//         );
        
//         if (!candidate) throw new ApiError(404, 'Candidate not found');

//         // Record vote
//         election.votedUsers.push(user.uniqueId);
//         await election.save();

//         return ApiResponse(res, 200, 'Vote recorded successfully', candidate);
//     } catch (error: any) {
//         throw new ApiError(error.statusCode || 500, error.message);
//     }
// };
import { Request, Response } from 'express';
import { Election } from '../models/election.model';
import { Candidate } from '../models/candidate.model';
import { ApiResponse, ApiError } from '../utils/handlers';
import { uploadOnCloudinary, deleteFromCloudinary } from '../utils/cloudinary.util';
import mongoose from 'mongoose';

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

        // Return the complete election object for frontend use
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

        // 1. Validate input is an array
        if (!voters || !Array.isArray(voters)) {
            throw new ApiError(400, 'Voters array is required');
        }

        // 2. Parse each voter ID to a number safely
        const parsedVoters = voters.map((v: string) => {
            const id = parseInt(v, 10);
            if (isNaN(id)) {
                throw new ApiError(400, `Invalid voter ID: ${v}`);
            }
            return id;
        });

        // 3. Find by custom electionId and add unique voters
        const election = await Election.findOneAndUpdate(
            { electionId: req.params.electionId },
            {
                $addToSet: {
                    voters: { $each: parsedVoters }
                }
            },
            {
                new: true,
                runValidators: true
            }
        );

        // 4. Handle case where no such election exists
        if (!election) {
            throw new ApiError(404, 'Election not found');
        }

        // 5. Respond with updated election
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

// export const deleteCandidate = async (req: Request, res: Response) => {
//     try {
//         const { electionId, candidateId } = req.params;
//         console.log(electionId)
//         console.log(candidateId)
//         // Validate parameters
//         if (!electionId) {
//             throw new ApiError(400, 'Election ID is required');
//         }
//         if (!candidateId) {
//             throw new ApiError(400, 'Candidate ID is required');
//         }
//         if (!mongoose.Types.ObjectId.isValid(electionId) || !mongoose.Types.ObjectId.isValid(candidateId)) {
//             throw new ApiError(400, 'Invalid ID format');
//         }

//         // Find the election
//         const election = await Election.findById(electionId);
//         if (!election) {
//             throw new ApiError(404, 'Election not found');
//         }

//         // Verify the candidate exists and is associated with this election
//         const candidate = await Candidate.findOne({
//             _id: candidateId,
//             election: election._id
//         });
//         if (!candidate) {
//             throw new ApiError(404, 'Candidate not found or not associated with this election');
//         }

//         // Delete the candidate's avatar from Cloudinary (if it exists)
//         if (candidate.avatar) {
//             const deleteResult = await deleteFromCloudinary(candidate.avatar);
//             if (!deleteResult) {
//                 console.warn('Failed to delete avatar from Cloudinary, proceeding with candidate deletion');
//             }
//         }

//         // Delete the candidate from the Candidate collection
//         await Candidate.findByIdAndDelete(candidateId);

//         // Remove the candidate ID from the election's candidates array
//         await Election.findByIdAndUpdate(
//             electionId,
//             { $pull: { candidates: candidateId } },
//             { new: true }
//         );

//         return ApiResponse(res, 200, 'Candidate removed successfully');
//     } catch (error: any) {
//         console.error("Error deleting candidate:", error);
//         if (error instanceof ApiError) {
//             return ApiResponse(res, error.statusCode, error.message);
//         }
//         return ApiResponse(res, 500, 'Internal server error');
//     }
// };
// export const deleteCandidate = async (req: Request, res: Response) => {
//     try {
//         const { electionId, candidateId } = req.params;
//         console.log('Election ID:', electionId);
//         console.log('Candidate ID:', candidateId);

//         // Validate parameters
//         if (!electionId) {
//             throw new ApiError(400, 'Election ID is required');
//         }
//         if (!candidateId) {
//             throw new ApiError(400, 'Candidate ID is required');
//         }
//         if (!mongoose.Types.ObjectId.isValid(candidateId)) {
//             throw new ApiError(400, 'Invalid Candidate ID format');
//         }

//         // Find the election by custom electionId
//         const election = await Election.findOne({ electionId });
//         if (!election) {
//             throw new ApiError(404, 'Election not found');
//         }

//         // Verify the candidate exists and is associated with this election
//         const candidate = await Candidate.findOne({
//             _id: candidateId,
//             election: election._id // Use election._id (MongoDB ObjectId)
//         });
//         if (!candidate) {
//             throw new ApiError(404, 'Candidate not found or not associated with this election');
//         }

//         // Delete the candidate's avatar from Cloudinary (if it exists)
//         if (candidate.avatar) {
//             const deleteResult = await deleteFromCloudinary(candidate.avatar);
//             if (!deleteResult) {
//                 console.warn('Failed to delete avatar from Cloudinary, proceeding with candidate deletion');
//             }
//         }

//         // Delete the candidate from the Candidate collection
//         await Candidate.findByIdAndDelete(candidateId);

//         // Remove the candidate ID from the election's candidates array
//         await Election.findOneAndUpdate(
//             { electionId },
//             { $pull: { candidates: candidateId } },
//             { new: true }
//         );

//         return ApiResponse(res, 200, 'Candidate removed successfully');
//     } catch (error: any) {
//         console.error("Error deleting candidate:", error);
//         if (error instanceof ApiError) {
//             return ApiResponse(res, error.statusCode, error.message);
//         }
//         return ApiResponse(res, 500, 'Internal server error');
//     }
// };
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