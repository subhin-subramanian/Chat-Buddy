import { DBConnection } from "@/lib/db";
import User from "@/models/User.model";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req:NextRequest){
    try {
        const currentUserId = (await headers()).get("x-user-id");

        await DBConnection();

        if(!currentUserId){
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
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

        // Update currentUser
        await User.findByIdAndUpdate(currentUserId,{$pull:{receivedRequests:senderId}});

        // Update sender
        await User.findByIdAndUpdate(senderId,{$pull:{sendRequests:currentUserId}});

        return NextResponse.json({message:"Request rejected"},{status:200});

    } catch (error) {
            console.error("Server error:", error);
            return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
        }
}
    