import express from 'express';
import { register, login, logout, refresh } from '../controllers/user.js';
import asyncHandler from '../middleware/catchAsyncError.js'

const router = express.Router();

router.post('/signup', asyncHandler(register));
router.post('/login', asyncHandler(login));
router.get('/refresh', asyncHandler(refresh));
router.post('/logout', asyncHandler(logout));

export default router;
