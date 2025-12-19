import { DBConnection } from "@/lib/db";
import User from "@/models/User.model";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest){
    try {
        const currentUserId = (await headers()).get("x-user-id");

        await DBConnection();

        if(!currentUserId){
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const user = await User.findById(currentUserId).populate("friends", "userName profilePic bio");
        
        if (!user) {
            return NextResponse.json({message:"User not found"},{ status:404 });
        }

        return NextResponse.json({friends:user?.friends},{status:200});

    } catch (err) {
        console.error("Server error:", err);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }   
}