
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
        uniqueId: rest.uniqueId,
        voterId: rest.voterId
     });
     
     if (existedCandidate) {
        throw new ApiError(400, 'Candidate with this Unique ID and Voter ID already exists');
     }
     
     // Handle avatar upload
     const avatarLocalPath = req.file?.path;
     if (!avatarLocalPath) {
        throw new ApiError(400, 'Avatar is Required');
     }
     
     const uploadAvatar = await uploadOnCloudinary(avatarLocalPath);
     if (!uploadAvatar) {
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
        uniqueId: rest.uniqueId,
        voterId: rest.voterId,
        avatar: uploadAvatar.url,
        representative: rest.representative,
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
     // Pass the error to your error handling middleware
     if (error instanceof ApiError) {
        return ApiResponse(res, error.statusCode, error.message, null);
     }
     console.error("Error adding candidate:", error);
     return ApiResponse(res, 500, 'Internal server error', null);
  }
};

// export const deleteCandidate = async (req: Request, res: Response) => {
//    try {
//       const { id } = req.params

//       if (!mongoose.Types.ObjectId.isValid(id)) {
//          throw new ApiError(400, "Invalid ID format")
//       }

//       const candidateData = await Candidate.findById({ _id: id })
//       if (!candidateData) throw new ApiError(400, "Candidate with this ID does not exist")

//       const avatarFile = candidateData.avatar

//       const publicIdMatch = avatarFile.match(/\/upload\/(?:v\d+\/)?([^\/]+)\/([^\/]+)\.[a-z]+$/);
//       if (!publicIdMatch || publicIdMatch.length < 3) {
//          throw new Error('Invalid Cloudinary URL');
//       }
//       const folder = decodeURIComponent(publicIdMatch[1]);
//       const publicId = `${folder}/${publicIdMatch[2]}`;

//       const deleteFile = await deleteFromCloudinary(publicId)
//       if (!deleteFile) throw new ApiError(400, 'Not found the file')

//       await Candidate.findByIdAndDelete({ _id: id })


//       return ApiResponse(res, 200, 'Candidate Deleted Successfully')

//    } catch (error: any) {
//       throw new ApiError(error.statusCode || 500, error.message || ' Internal server error')
//    }
// }


// export const deleteCandidate = async (req: Request, res: Response) => {
//    try {
//       const { id } = req.params;
//       if (!mongoose.Types.ObjectId.isValid(id)) {
//          return ApiResponse(res, 400, "Invalid ID format");
//       }

//       const candidateData = await Candidate.findById(id);
//       if (!candidateData) return ApiResponse(res, 400, "Candidate with this ID does not exist");

//       if (candidateData.avatar) {
//          const avatarFile = candidateData.avatar;
//          const publicIdMatch = avatarFile.match(/\/upload\/(?:v\d+\/)?([^\/]+)\/([^\/]+)\.[a-z]+$/);
//          if (!publicIdMatch || publicIdMatch.length < 3) {
//             return ApiResponse(res, 400, 'Invalid Cloudinary URL');
//          }
//          const folder = decodeURIComponent(publicIdMatch[1]);
//          const publicId = `${folder}/${publicIdMatch[2]}`;
//          const deleteFile = await deleteFromCloudinary(publicId);
//          if (!deleteFile) return ApiResponse(res, 400, 'Failed to delete candidate image');
//       }

//       await Candidate.findByIdAndDelete(id);
//       return ApiResponse(res, 200, 'Candidate Removed Successfully');
//    } catch (error: any) {
//       return ApiResponse(res, error.statusCode || 500, error.message || 'Internal server error');
//    }
// };
export const deleteCandidate = async (req: Request, res: Response) => {
   try {
      const { id } = req.params;
      if (!mongoose.Types.ObjectId.isValid(id)) {
         return ApiResponse(res, 400, "Invalid ID format");
      }

      const candidateData = await Candidate.findById(id);
      if (!candidateData) {
         return ApiResponse(res, 400, "Candidate with this ID does not exist");
      }

      await Candidate.findByIdAndDelete(id);

      return ApiResponse(res, 200, 'Candidate Removed Successfully');
   } catch (error: any) {
      return ApiResponse(res, error.statusCode || 500, error.message || 'Internal server error');
   }
};

// export const updateCandidate = async (req: Request, res: Response) => {

//    try {
//       const { id } = req.params
//       if (!id) throw new ApiError(400, "Id is required")

//       if (!mongoose.Types.ObjectId.isValid(id)) {
//          throw new ApiError(400, "Invalid ID format");
//       }

//       const candidateData = await Candidate.findById({ _id: id })
//       if (!candidateData) throw new ApiError(400, "Id is not valid")

//       const { firstName, lastName, representative } = req.body

//       if (firstName) candidateData.firstName = firstName
//       if (lastName) candidateData.lastName = lastName
//       if (representative) candidateData.representative = representative

//       const avatar = req.file?.path

//       if (avatar) {
//          const avatarLocalPath = req.file?.path
//          if (!avatarLocalPath) throw new ApiError(400, 'Avatar is Required')

//          const uploadAvatar = await uploadOnCloudinary(avatarLocalPath)

//          const avatarFile = candidateData.avatar

//          const deleteFile = await deleteFromCloudinary(avatarFile)
//          if (!deleteFile) throw new ApiError(400, 'Not found the file')

//          candidateData.avatar = uploadAvatar.url
//       }
//       await candidateData.save()

//       return ApiResponse(res, 200, 'Candidate Updated Successfully', candidateData)

//    } catch (error: any) {
//       throw new ApiError(error.statusCode || 500, error.message || ' Internal server error')
//    }

// }

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

      const { firstName, lastName, representative, town, candidateType, dob, promise } = req.body;

      if (firstName) updateFields.firstName = firstName;
      if (lastName) updateFields.lastName = lastName;
      if (representative) updateFields.representative = representative;
      if (town) updateFields.town = town;
      if (candidateType) updateFields.candidateType = candidateType;
      if (dob) updateFields.dob = new Date(dob);
      if (promise) updateFields.promise = Array.isArray(promise) ? promise : [promise];

      // Handle avatar update
      if (req.file) {
         const newAvatarPath = req.file.path;
         if (!newAvatarPath) throw new ApiError(400, "Avatar file is required");

         // Upload new avatar
         const uploadAvatar = await uploadOnCloudinary(newAvatarPath);
         if (!uploadAvatar?.url) throw new ApiError(500, "Failed to upload avatar");

         // Delete old avatar
         if (candidateData.avatar) {
            const deleteFile = await deleteFromCloudinary(candidateData.avatar);
            if (!deleteFile) throw new ApiError(400, "Old avatar file not found");
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
   const candidateData = await Candidate.find()
   return ApiResponse(res, 200, 'All candidated fetched Successfully', candidateData)
}

export const getCandidates = async (req: Request, res: Response) => {
  try {
      const { electionId } = req.params;
      
      if (!electionId) {
          throw new ApiError(400, 'Election ID is required');
      }
      
      // First, find the election by electionId
      const election = await Election.findOne({ electionId });
      
      if (!election) {
          throw new ApiError(404, 'Election not found');
      }
      
      // Find all candidates associated with this election
      const candidates = await Candidate.find({ election: election._id })
          .select('-__v') // Exclude version field
          .sort({ firstName: 1 }); // Sort by firstName alphabetically (optional)
      
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
      // Handle errors
      if (error instanceof ApiError) {
          return ApiResponse(res, error.statusCode, error.message, null);
      }
      console.error("Error fetching candidates:", error);
      return ApiResponse(res, 500, 'Internal server error', null);
  }
};

export const getSpecificCandidate = async (req: Request, res: Response) => {

   const { id } = req.params
   console.log(id);
   if (!id) throw new ApiError(400, 'ID is required')

   if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new ApiError(400, "Invalid ID format");
   }
   const candidateData = await Candidate.findById({ _id: id })
   return ApiResponse(res, 200, `Details of ${id}`, candidateData)

}

export const getCandidateDetails = async (req: Request, res: Response) => {
  try {
      const { electionId, candidateId } = req.params;
      
      if (!electionId || !candidateId) {
          throw new ApiError(400, 'Election ID and Candidate ID are required');
      }
      
      // First, find the election by electionId
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
      // Handle errors
      if (error instanceof ApiError) {
          return ApiResponse(res, error.statusCode, error.message, null);
      }
      console.error("Error fetching candidate details:", error);
      return ApiResponse(res, 500, 'Internal server error', null);
  }
};
