import { DBConnection } from "@/lib/db";
import User from "@/models/User.model";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

// -------- Function to get all the friend requests received ------- //
export async function GET(){
    try {
        const currentUserId = (await headers()).get("x-user-id");

        await DBConnection();

        if(!currentUserId){
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const user = await User.findById(currentUserId).populate("receivedRequests","userName bio profilePic");
        
        if (!user) {
            return NextResponse.json({message:"User not found"},{ status:404 });
        }
        
        return NextResponse.json({receivedRqsts:user?.receivedRequests},{status:201});

    } catch (err) {
        console.error("Server error:", err);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }   
}