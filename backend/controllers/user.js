import bucket from '../config/firebase.mjs';
import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import ErrorHandler from '../utils/errorhandler.js';
import jwt from 'jsonwebtoken';
import { generateAccessToken, generateRefreshToken } from '../utils/tokenGenrator.js';
import Profession from '../models/profession.js';
// REGISTER
export const register = async (req, res, next) => {
  try {
    const { name, email, phone, password, role, gender, profession, about } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) return next(new ErrorHandler('Email already exists', 400));

    const hashedPassword = await bcrypt.hash(password, 10);
    const isVerified = role === 'user'; // Auto-verify normal users

    // Handle Cloudinary file uploads via multer-storage-cloudinary
   

    let profilePicUrl = null;
    let resumeUrl = null;
    let identityProofUrl = null;

    if (role === 'provider') {
      profilePicUrl = req.files.profilePic?.[0]?.path || null;
      resumeUrl = req.files.resume?.[0]?.path || null;
      identityProofUrl = req.files.identityProof?.[0]?.path || null;
    }

let professionId = null;

if (profession) {
  const prof = await Profession.findOne({ name: profession });  // Assuming you have this model
  if (!prof) return next(new ErrorHandler("Invalid profession", 400));
  professionId = prof._id;
}
    // Create the user
    const newUser = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
      role,
      gender,
      profession:professionId,
      about,
      profilePicUrl,
      identityProofUrl,
      resumeUrl,
      isVerified,
    });

    res.status(201).json({ message: 'Registered successfully', userId: newUser._id });

  } catch (err) {
    next(err);
  }
};


// LOGIN
export const login = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return next(new ErrorHandler('Invalid email or password', 401));
  }

  const accessToken = generateAccessToken(user._id, user.role);
  const refreshToken = generateRefreshToken(user._id);

  user.refreshToken = refreshToken;
  await user.save();

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    sameSite: 'Lax',
    secure: false,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(200).json({ accessToken });
};

// REFRESH
export const refresh = async (req, res, next) => {
  const token = req.cookies.refreshToken;
  if (!token) return next(new ErrorHandler('No refresh token found', 401));

  try {
    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    const user = await User.findById(decoded.id);

    if (!user || user.refreshToken !== token) {
      return next(new ErrorHandler('Invalid refresh token', 403));
    }

    const accessToken = generateAccessToken(user._id, user.role);
    res.status(200).json({ accessToken });

  } catch (err) {
    return next(new ErrorHandler('Token expired or invalid', 403));
  }
};

// GET PROFILE
export const getProfile = (req, res, next) => {
  res.status(200).json({ user: req.user });
};

// LOGOUT
export const logout = async (req, res, next) => {
  const token = req.cookies.refreshToken;
  if (!token) return res.sendStatus(204);

  try {
    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    await User.findByIdAndUpdate(decoded.id, { refreshToken: '' });
  } catch {}

  res.clearCookie('refreshToken', {
    httpOnly: true,
    sameSite: 'Strict',
    secure: false,
  });

  res.status(200).json({ message: 'Logged out successfully' });
};
