// routes/professionRoute.js
import express from 'express';
import { uploadProfessionData, getProfessionData, getProfessions } from '../controllers/professionControler.js'
import asyncHandler from '../middleware/catchAsyncError.js';
const router = express.Router();

router.post('/upload',asyncHandler( uploadProfessionData));
router.get('/getService', asyncHandler(getProfessionData))
router.get('/getProviders/:professionName',asyncHandler(getProfessions))
export default router;
