import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGO_URL;

if(!MONGODB_URL) throw new Error("Mongodb Url missing");

// Global cache
let cached = (global as any).mongoose;
if (!cached){
    cached = (global as any).mongoose = {
        conn:null,
        promise:null
    }
}

export const DBConnection = async ()=>{
    if (cached.conn){
        return cached.conn;
    }

    if (!cached.promise){
        cached.promise = mongoose.connect(MONGODB_URL).then((mongoose) => {
            console.log("Database connected");
            return mongoose;
        })
    }

    try{
        cached.conn = await cached.promise;
        return cached.conn;
    } catch(error:any) {
        cached.promise = null;
        console.error('Database connection error', error);
        throw error;
    }
};


