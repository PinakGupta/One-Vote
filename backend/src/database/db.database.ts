import mongoose from "mongoose"
import { ApiError } from "../utils/handlers"
import env from "../utils/env"
// import { createStateAndDistrict } from "../utils/districtState.util"
// import { createAdmin } from "../utils/admin.util"

export const mongoDB = async () => {
   try {
      const connection = await mongoose.connect(`${env.mongoURL}`)
      if (!connection) throw new ApiError(500, "connection can not be established")
      console.log("Connected to MongoDB")
      // await createAdmin() // Now no arguments are needed here
      // await createStateAndDistrict()
   }
   catch (err: any) {
      throw new ApiError(err.statusCode || 500, err.message || "connection can not be established")
   }
}
