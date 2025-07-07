import mongoose from "mongoose";

const db = async()=>{
    try{
        const connect = await mongoose.connect(process.env.DB)
        console.log(`db connected`)
    }
    catch(e){
        console.log(e)
    }
}

export default db
