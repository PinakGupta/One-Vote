

import cookieParser from 'cookie-parser'
import express from 'express'
import { Request, Response, NextFunction } from 'express';
import getDetails from "./routes/getDetails.routes"
import loginRegister from "./routes/loginRegister.routes"
import candidates from "./routes/candidates.routes"
import users from "./routes/users.routes"
import query from "./routes/query.routes"
import cors from "cors"
import otpRoutes from "./routes/otp.routes" 
import env from './utils/env';
import elections from './routes/elections.routes';

const app = express()
app.use(express.json())


app.use(cors({
   origin: '*',                // Allow all origins
   methods: '*',               // Allow all methods
   allowedHeaders: '*',        // Allow all headers
   credentials: true           // Still allow credentials if your app needs them
 }));


app.use(cookieParser())


// GET details routes
app.use('/api/v1/admin', getDetails)
app.use('/api/v1/api/districts-and-states', getDetails)

// election routes
app.use('/api/v1/elections', elections);

//Login routes
app.use('/api/v1/auth', loginRegister)

// OTP verification routes
app.use('/api/v1/otp', otpRoutes) // Add OTP routes


//candidatelist routes
app.use('/api/v1/candidates/candidate-list', getDetails)
app.use('/api/v1/candidates/candidate-list', candidates)

// user routes
app.use('/:id/api/v1/user/profile', users)

//query route
app.use('/', query)

app.use((err: any, _req: Request, res: Response, next: NextFunction) => {
   try {
      console.log(`Error, ${err.message}`)
      return res.status(500).json({ message: 'Internal Server Error!' })
   } catch (error: any) {
      next(error)
   }
});

export { app }