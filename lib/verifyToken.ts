import { NextResponse } from "next/server";
import { DBConnection } from "./db";
import jwt from "jsonwebtoken";
import User from "@/models/User.model";


export async function verifyToken(token: string){
    try {
        await DBConnection();

        // const cookie = req.cookies;
        // const token = cookie.get("jwt")?.value;

        if(!token){
            console.log("Token not provided");
            return NextResponse.json({ user: null }, { status: 401 });
        }

        const decoded = jwt.verify(token,process.env.JWT_SECRET as string);

        if(!decoded || typeof decoded !== "object" || !("userId" in decoded)){
            console.log("Invalid Token");
            return NextResponse.json({ user: null }, { status: 401 });
        }

        const user = await User.findById(decoded.userId).select("userName bio profilePic");

        if (!user){
            console.log("User not found")
            return NextResponse.json({ user: null }, { status: 401 });
        }
        
        return user;

    } catch (error) {
        console.log("Error in verifyToken",error);
        return NextResponse.json({ user: null }, { status: 500 });
    }
}