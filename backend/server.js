import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import db from './db.js'
import  authRoute from './routes/authRoute.js'
import errorMiddleware from './middleware/errorhandler.js'
import {isAuthenticated} from './middleware/authMiddleware.js'
import cookieParser from 'cookie-parser'
import professionRoute from './routes/professionRoute.js'
dotenv.config()

const PORT = process.env.PORT || 8000
const app=express()
app.use(express())
app.use(cors())

db()
app.use(express.json());
app.use(cookieParser());
app.get('/',async(req,res)=>{
    res.send(`hello world`)
})

app.use('/api/auth',authRoute)
app.use('/api/proffesion',professionRoute)

app.use(isAuthenticated)
app.use(errorMiddleware);

app.listen(PORT,()=>{
    console.log(`app listening at http://localhost:${PORT}/`)
})