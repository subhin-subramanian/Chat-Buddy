import { DBConnection } from "@/lib/db";
import { verifyToken } from "@/lib/verifyToken";
import User from "@/models/User.model";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req:NextRequest){
    try {
        await DBConnection();

        const token = req.cookies.get("jwt")?.value;
        if(!token){
            return NextResponse.json({ message: "No token"}, { status: 401 });
        }

        const currentUser = await verifyToken(token);
        if (!currentUser){
            return NextResponse.json({ message: "Unauthorized"},{ status:401 });
        }

        const { senderId } = await req.json();
        if(!senderId) {
            return NextResponse.json({message:"senderId missing"},{ status:400 })
        }

        // Ensure request exists
        const hasRequest = await User.findOne({
            _id:currentUser._id,
            receivedRequests:senderId
        });
        if (!hasRequest){
            return NextResponse.json({message:"Request not found"},{ status:400 });
        }

        // Update currentUser
        await User.findByIdAndUpdate(currentUser._id,{$pull:{receivedRequests:senderId}});

        // Updte sender
        await User.findByIdAndUpdate(senderId,{$pull:{sendRequests:currentUser._id}});

        return NextResponse.json({message:"Request rejected"},{status:200});

    } catch (error) {
            console.error("Server error:", error);
            return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
        }
}
    