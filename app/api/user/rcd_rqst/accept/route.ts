import { DBConnection } from "@/lib/db";
import User from "@/models/User.model";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    try {
        const currentUserId = (await headers()).get("x-user-id");

        await DBConnection();

        if(!currentUserId){
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const user = await User.findById(currentUserId).select("_id userName bio profilePic");
        
        if (!user) {
            return NextResponse.json({message:"User not found"},{ status:404 });
        }

        const { senderId } = await req.json();
        if(!senderId) {
            return NextResponse.json({message:"senderId missing"},{ status:400 })
        }

        // Ensure request exists
        const hasRequest = await User.findOne({
            _id:currentUserId,
            receivedRequests:senderId
        });
        if (!hasRequest){
            return NextResponse.json({message:"Request not found"},{ status:400 });
        }

        // Update friends list and receivedRequests of the currentUser/receiver
        await User.findByIdAndUpdate(currentUserId,{
            $pull:{receivedRequests:senderId},
            $addToSet:{friends:senderId}
        });

        // Update friends list and sendRequests of the sender
        await User.findByIdAndUpdate(senderId,{
            $pull:{sendRequests:currentUserId},
            $addToSet:{friends:currentUserId}
        });

        return NextResponse.json({message:"Friend added"},{status:200});

    } catch (error) {
        console.error("Server error:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
