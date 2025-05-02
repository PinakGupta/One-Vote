
import { Response } from "express"
import mongoose, { Document } from "mongoose"

export interface CookieObject {
   httpOnly: boolean,
   secure: boolean
}


export type ResponseType = {
   code: number,
   success: boolean
   message: string,
   data?: any,
   cookies?: { tokenName: string, token: string, options: CookieObject } | null,
   removeCookies?: { tokenName: string, options: CookieObject } | null,
   errors?: any
}


export interface UserModel extends Document {
   _id: mongoose.Types.ObjectId,
   firstName: string,
   lastName: string,
   email: string,
   password: string,
   role?: string,
   avatar?: string,
   isVoted?: boolean,
   verified?: boolean
}



export interface JWT {
   _id: string,
   uniqueId: string,
   role: string,
   isVoted: boolean
}

export interface Updates {
   avatar?: string,
   firstName?: string,
   lastName?: string,
   password?: string
}


export interface AdminModel extends Document {
   email:string;
   password: string;
   role: string;
   isVoted: boolean;
   showResults: boolean;
   isPasswordCorrect(password: string): Promise<boolean>;
}

export interface CandidateModel extends Document {
   _id: mongoose.Types.ObjectId
   firstName: string,
   lastName: string,
   election: mongoose.Types.ObjectId,
   avatar: string,
   email: string,
   votedUsers?: mongoose.Types.ObjectId[],
   town: string,
   candidateType: string,
   dob: Date,
   votesCount?: number,
   promise: string[]
}


export interface QueryModel extends Document {
   username: string,
   phone: string,
   email: string,
   state: string,
   district: string,
   queryType: string,
   message: string
}

export interface ElectionModel extends Document {
   admin: mongoose.Types.ObjectId;
   electionId: string;
   name: string;
   voters: string[];
   candidates: mongoose.Types.ObjectId[];
   votedUsers: string[];
   showResults: boolean;
   startDate: Date;
   endDate?: Date;
   isActive: boolean;
}