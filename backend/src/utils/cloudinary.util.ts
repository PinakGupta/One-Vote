import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'
import { UploadApiResponse } from 'cloudinary'
import env from './env'

cloudinary.config({
   cloud_name: env.cloudinaryCloudName,
   api_key: env.cloudinaryApiKey,
   api_secret: env.cloudinaryApiSecret
})

// Upload file from buffer (works both locally and in production)
export const uploadOnCloudinary = async (file: Express.Multer.File): Promise<UploadApiResponse> => {
   try {
      // Convert buffer to base64 string for Cloudinary
      const b64 = Buffer.from(file.buffer).toString('base64')
      const dataURI = `data:${file.mimetype};base64,${b64}`
      
      // Upload to Cloudinary
      const response = await cloudinary.uploader.upload(dataURI, {
         resource_type: "auto",
         folder: "voting application"
      })
      
      return response
   } catch (err: any) {
      console.error("Error uploading to Cloudinary:", err)
      throw err
   }
}

// Delete file from Cloudinary (unchanged)
export const deleteFromCloudinary = async (incomingFile: string) => {
   const publicIdMatch = incomingFile.match(/\/upload\/(?:v\d+\/)?([^\/]+)\/([^\/]+)\.[a-z]+$/);

   if (!publicIdMatch || publicIdMatch.length < 3) {
      throw new Error('Invalid Cloudinary URL');
   }

   const folder = decodeURIComponent(publicIdMatch[1]);
   const publicId = `${folder}/${publicIdMatch[2]}`;
   
   return await cloudinary.uploader.destroy(publicId)
}