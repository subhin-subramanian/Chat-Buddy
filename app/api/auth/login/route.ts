import { DBConnection } from "@/lib/db";
import User from "@/models/User.model";
import { NextRequest, NextResponse } from "next/server";
import validator from 'validator';
import jwt from 'jsonwebtoken';

export async function POST(req: NextRequest){
   try {
        await DBConnection();

        const body = await req.json();
        const { email,password} = body ?? {};

        if (!email || email === '' || !password || password === ''){
            return NextResponse.json({message:"All fields are required"},{status:400});
        }

        if(!validator.isEmail(email)){
            return NextResponse.json({message:"Invalid email format"},{status:400});
        }

        // Email checking
        const user = await User.findOne({ email : email.toLowerCase().trim() });
        if(!user){
            return NextResponse.json({message:"Invalid credentials"},{status:401});
        }
        
        // Password checking
        const isMatch = await user.isPasswordMatch(password);
        if(!isMatch){
            return NextResponse.json({message:"Invalid credentials"},{status:401});
        }

        // Creating jwt token
        const token = jwt.sign({userId:user._id.toString()}, process.env.JWT_SECRET as string, {expiresIn: "1h"});

        const userObj = user.toObject();
        delete userObj.password;

        const res = NextResponse.json({message: "Logged in success", user:userObj},{status:200});

        // Cookie setting
        res.cookies.set("jwt",token,{
            maxAge:7*24*60*60,
            httpOnly: true,
            sameSite: "lax",
            path:'/',
            secure: process.env.NODE_ENV === "production"
        });

        return res;

    } catch (err) {
        console.error("Register error:", err);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}