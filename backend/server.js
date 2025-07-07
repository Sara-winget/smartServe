import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import db from './db.js'
dotenv.config()

const PORT = process.env.PORT || 8000
const app=express()
app.use(express())
app.use(cors())

db()

app.get('/',async(req,res)=>{
    res.send(`hello world`)
})


app.listen(PORT,()=>{
    console.log(`app listening at http://localhost:${PORT}/`)
})