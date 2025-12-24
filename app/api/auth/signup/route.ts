import { DBConnection } from "@/lib/db";
import User from "@/models/User.model";
import { NextRequest, NextResponse } from "next/server";
import validator from 'validator';
import jwt from 'jsonwebtoken';
import { upsertStreamUser } from "@/lib/stream";

export async function POST(req:NextRequest){
    try {
        await DBConnection();

        const body = await req.json();
        const { userName,email,password,bio} = body ?? {};

        if (!userName || userName === '' || !email || email === '' || !password || password === ''){
            return NextResponse.json({message:"Username, email and password is mandatory"},{status:400});
        }

        if (password.length <6){
            return NextResponse.json({message:"Password must be atleast 6 characters"},{status:400});
        }

        if(!validator.isEmail(email)){
            return NextResponse.json({message:"Invalid email format"},{status:400});
        }

        // Checking if the user already exists
        const existing = await User.findOne({ email : email.toLowerCase().trim() });
        if(existing){
            return NextResponse.json({message:"User already exists, try with a different email"},{status:409});
        }

        // Generating random avatar
        const idx = Math.floor(Math.random()*100 + 1); 
        const randomAvatar = `https://avatar.iran.liara.run/public/${idx}`;

        const newUser = new User({
            userName,
            email : email.toLowerCase().trim(),
            password,
            bio,
            profilePic : randomAvatar
        });
        await newUser.save();

        // Save new user in stream
        try {
            await upsertStreamUser({
                id: newUser._id.toString(), 
                name: newUser.userName, 
                image: newUser.profilePic ?? ''
            });
            console.log(`stream user created for ${newUser.userName}`)
        } catch (error) {
            console.log("Error in creating stream user", error);
        }

        // Creating jwt token
        const token = jwt.sign({userId:newUser._id.toString()}, process.env.JWT_SECRET as string, {expiresIn: "1h"});

        const userObj = newUser.toObject();
        delete userObj.password;

        const res = NextResponse.json({message: "User created successfully", user:userObj},{status:201});

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