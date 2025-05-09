
import mongoose, { Schema } from 'mongoose'
import bcrypt from 'bcrypt'
import { AdminModel } from '../utils/types.util'

const adminSchema: Schema = new Schema({
   email:{
      type:String,
      required:true,
      unique:true
   },
   password: {
      type: String,
      required: true
   },
   role: {
      type: String,
      default: 'admin'
   },
   isVoted: {
      type: Boolean,
      default: true
   },
   showResults: {
      type: Boolean,
      default: false
   }
})

adminSchema.methods.isPasswordCorrect = async function (requestPassword: string): Promise<boolean> {
   return await bcrypt.compare(requestPassword, this.password)
}

export const Admin = mongoose.model<AdminModel>('Admin', adminSchema)