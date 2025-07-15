// middlewares/authMiddleware.js
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import ErrorHandler from '../utils/errorhandler.js';

export const isAuthenticated = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new ErrorHandler('Unauthorized: No token provided', 401));
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    if (!req.user) {
      return next(new ErrorHandler('User not found', 404));
    }

    next();
  } catch (err) {
    return next(new ErrorHandler('Invalid or expired token', 403));
  }
};
