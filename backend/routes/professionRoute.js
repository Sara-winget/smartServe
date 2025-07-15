// routes/professionRoute.js
import express from 'express';
import { uploadProfessionData } from '../controllers/professionControler.js'
import asyncHandler from '../middleware/catchAsyncError.js';
const router = express.Router();

router.post('/upload',asyncHandler( uploadProfessionData));

export default router;
