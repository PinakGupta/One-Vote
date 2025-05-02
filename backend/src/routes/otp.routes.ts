// routes/otp.routes.ts
import { Router } from 'express';
import { sendOTP, verifyOTP, resendOTP } from '../controllers/otp.controller';

const router = Router();

router.route('/send').post(sendOTP);
router.route('/verify').post(verifyOTP);
router.route('/resend').post(resendOTP);

export default router;