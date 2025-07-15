import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { generateAccessToken, generateRefreshToken } from '../utils/tokenGenrator.js'
import ErrorHandler from '../utils/errorhandler.js';

// REGISTER
export const register = async (req, res, next) => {
  const { name, email, phone, password, role, gender, profession, about } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) return next(new ErrorHandler('Email already exists', 400));

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    name,
    email,
    phone,
    password: hashedPassword,
    role,
    gender,
    profession,
    about,
    // profilePicUrl, identityProofUrl, resumeUrl → add later from Firebase
  });

  res.status(201).json({ message: 'Registered successfully' });
};

// LOGIN
export const login = async (req, res, next) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (!existingUser || !(await bcrypt.compare(password, existingUser.password))) {
    return next(new ErrorHandler('Invalid email or password', 401));
  }

  const accessToken = generateAccessToken(existingUser._id, existingUser.role);
  const refreshToken = generateRefreshToken(existingUser._id);

  existingUser.refreshToken = refreshToken;
  await existingUser.save();

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    sameSite: 'Strict',
    secure: false, // Set to true in production with HTTPS
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(200).json({ accessToken, role: existingUser.role });
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



export const getProfile = (req, res, next) => {
  res.status(200).json({
    user: req.user
  });
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
