import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config(); // ✅ First line before any config use

import db from './db.js';
import authRoute from './routes/authRoute.js';
import errorMiddleware from './middleware/errorhandler.js';
import professionRoute from './routes/professionRoute.js';
import cookieParser from 'cookie-parser';

const PORT = process.env.PORT || 8000;
const app = express(); // ✅ Correct way

// CORS setup
app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true 
}));

// Middlewares
app.use(express.json()); // ✅ Parse JSON requests
app.use(cookieParser());

// Connect DB
db();

// Test route
app.get('/', (req, res) => {
    res.send(`hello world`);
});

// Routes
app.use('/api/auth', authRoute);
app.use('/api/proffesion', professionRoute); // Note: typo "proffesion" (should be "profession")

// Error handler
app.use(errorMiddleware);

// Start server
app.listen(PORT, () => {
    console.log(`app listening at http://localhost:${PORT}/`);
});
