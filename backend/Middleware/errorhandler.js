import ErrorHandler from "../utils/errorhandler.js";

const errorMiddleware = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || 'Internal Server Error';

  
  if (err.name === 'CastError') {
    const message = `Resource not found. Invalid ID: ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

 
  if (err.code === 11000) {
    const message = `Duplicate key: ${Object.keys(err.keyValue)} already exists.`;
    err = new ErrorHandler(message, 400);
  }

  
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map(val => val.message);
    const message = `Validation Error: ${messages.join(', ')}`;
    err = new ErrorHandler(message, 400);
  }

  
  if (err.name === 'JsonWebTokenError') {
    const message = 'Invalid token. Please login again.';
    err = new ErrorHandler(message, 400);
  }


  if (err.name === 'TokenExpiredError') {
    const message = 'Token expired. Please login again.';
    err = new ErrorHandler(message, 400);
  }

  if (err.code === 'LIMIT_FILE_SIZE') {
    const message = 'File too large. Maximum size is 5MB.';
    err = new ErrorHandler(message, 400);
  }

  // Optional: JavaScript built-in error types
  if (
    err instanceof SyntaxError ||
    err instanceof TypeError ||
    err instanceof ReferenceError
  ) {
    err = new ErrorHandler(`Internal Server Error: ${err.message}`, 500);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};

export default errorMiddleware;
