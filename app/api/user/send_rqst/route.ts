import { DBConnection } from "@/lib/db";
import { verifyToken } from "@/lib/verifyToken";
import User from "@/models/User.model";
import { NextRequest, NextResponse } from "next/server";

// -------- Function to get all the friend requests send for rendering purpose of the button in the home page ------- //
export async function GET(req: NextRequest){
    try {
        await DBConnection();
        const token = req.cookies.get("jwt")?.value;
        
        if(!token){
            return NextResponse.json({ message: "No token"}, { status: 401 });
        }

        const userfromToken = await verifyToken(token);

        if(!userfromToken){
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const user = await User.findById(userfromToken._id).select("sendRequests")

        return NextResponse.json({sendRqsts:user?.sendRequests},{status:200});

    } catch (err) {
        console.error("Server error:", err);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }   
}

// ----- Function to send a new friend request ----- //
export async function POST(req: NextRequest){
    try {
        await DBConnection();
        const token = req.cookies.get("jwt")?.value;
        
        if(!token){
            return NextResponse.json({ message: "No token"}, { status: 401 });
        }

        const userfromToken = await verifyToken(token);

         if(!userfromToken){
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const senderId = userfromToken?._id;
        const receiverId = await req.json();

        // Prevent send request to yourself
        if (senderId === receiverId){
            return NextResponse.json({ message:"You can't send request to yourself" },{ status:400 })
        }

        // Receiver doesn't exist
        if(!receiverId) {
            return NextResponse.json({message: "Receiver not existed"},{ status:400 });
        }

        const sender = await User.findById(userfromToken._id).select("friends sendRequests receivedRequests");
        
        // Check if you're already send a request to the recipient or viceversa
        if (sender?.sendRequests?.includes(receiverId)) {
            return NextResponse.json({message: "You've already send a request to this user"},{ status:400 });
        }
        if (sender?.receivedRequests?.includes(receiverId)){
            return NextResponse.json({message: "You've already have a pending friend request with this user"},{ status:400 });
        }

        // Check if you're already friends with this user
        if (sender?.friends.includes(receiverId)) {
            return NextResponse.json({message: "You're already friends"},{status:400});
        }

        // Adding request to each other's userData
        await User.findByIdAndUpdate(senderId,{$addToSet : {sendRequests:receiverId}});
        await User.findByIdAndUpdate(receiverId,{$addToSet : {receivedRequests:senderId}});

        return NextResponse.json({message:"Friends request send"},{status:200});

    } catch (err) {
        console.error("Server error:", err);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }   
}