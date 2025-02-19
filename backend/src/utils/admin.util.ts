import { Admin } from "../models/admin.model"
import bcrypt from 'bcrypt'
import env from "./env"
import { ApiResponse, ApiError } from "./handlers"

export const createAdmin = async () => {
   const uniqueId = env.adminUniqueId
   const password = env.adminPassword

   try {
      const alreadyExist = await Admin.findOne({ uniqueId })
      if (!alreadyExist) {
         const hashPassForAdmin = await bcrypt.hash(password, 10)
         const newAdmin = new Admin({ uniqueId: uniqueId, password: hashPassForAdmin })
         await newAdmin.save()
         console.log('Admin created successfully')
      } else {
         throw new ApiError(500, 'Admin already Exists')
      }
   } catch (err: any) {
      console.error(err.message || 'Server is under maintenance')
      throw new ApiError(err.statusCode || 500, err.message || 'Server is under maintenance')
   }
}
