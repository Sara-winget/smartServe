class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message); // Call the built-in Error class constructor
    this.statusCode = statusCode; // Add a custom property

    // Captures the stack trace (where the error happened)
    Error.captureStackTrace(this, this.constructor);
  }
}

export default ErrorHandler;
