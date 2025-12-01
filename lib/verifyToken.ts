import { NextRequest } from "next/server";
import { DBConnection } from "./db";
import jwt from "jsonwebtoken";
import User from "@/models/User";


export async function verifyToken(req:NextRequest){
    try {
        await DBConnection();

        const cookie = req.cookies;
        const token = cookie.get("jwt")?.value;

        if(!token){
            console.log("Token not provided");
            return null;
        }

        const decoded = jwt.verify(token,process.env.JWT_SECRET as string);

        if(!decoded || typeof decoded !== "object" || !("userId" in decoded)){
            console.log("Invalid Token");
            return null;
        }

        const user = await User.findById(decoded.userId).select("-password");

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