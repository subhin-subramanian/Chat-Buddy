import { DBConnection } from "./db";
import jwt from "jsonwebtoken";
import User from "@/models/User.model";

interface IJwtPayload {
    userId: string;
}

export async function verifyToken(token: string){
    try {
        if(!token){
            console.log("Token not provided");
            return null;
        }
        
        await DBConnection();

        const decoded = jwt.verify(token,process.env.JWT_SECRET as string) as IJwtPayload;

        if(!decoded || typeof decoded !== "object" || !("userId" in decoded)){
            console.log("Invalid Token");
            return null;
        }

        const user = await User.findById(decoded.userId).select("_id userName bio profilePic");

        if (!user){
            console.log("User not found")
            return null;
        }
        
        return user;

    } catch (error) {
        console.log("Error in verifyToken",error);
        return null;
    }
}