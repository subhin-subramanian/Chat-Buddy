import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGO_URL;

if(!MONGODB_URL) throw new Error("Mongodb Url missing");

export const DBConnection = async ()=>{

    if (mongoose.connection.readyState >= 1) return;

    try{
        await mongoose.connect(MONGODB_URL);
        console.log("Database Connected");
    } catch(error:any) {
        console.error('Database connection error', error);
    }
};


