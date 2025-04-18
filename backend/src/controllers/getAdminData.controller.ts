import { Admin } from "../models/admin.model";
import { ApiResponse,ApiError } from "../utils/handlers";
import mongoose from 'mongoose';
import { Request, Response } from 'express';
import { Election } from '../models/election.model';

export const getAdminDetails = async (_req: Request, res: Response) => {
   const adminData = await Admin.find();
   console.log(adminData)
   return ApiResponse(res, 200, 'Admin Data fetched successfully', adminData)

};


export const getElectionsByAdmin = async (req: Request, res: Response) => {
   try {
     // 1. Extract adminId from route params
     const adminId = req.params.adminId;
     
 
     // 2. Validate that adminId is a valid MongoDB ObjectId
     if (!mongoose.isValidObjectId(adminId)) {
       throw new ApiError(400, 'Invalid adminId format');
     }
 
     // 3. Fetch all elections where `admin` matches the given ObjectId
     const elections = await Election.find({ admin: adminId });
 
     // 4. Return the list of elections (could be empty if none found)
     return ApiResponse(res, 200, 'Elections retrieved successfully', elections);
   } catch (error: any) {
     throw new ApiError(error.statusCode || 500, error.message);
   }
 };