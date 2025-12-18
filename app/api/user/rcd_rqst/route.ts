import { DBConnection } from "@/lib/db";
import { verifyToken } from "@/lib/verifyToken";
import User from "@/models/User.model";
import { NextRequest, NextResponse } from "next/server";

// -------- Function to get all the friend requests received ------- //
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

        const user = await User.findById(userfromToken._id).populate("receivedRequests","userName bio profilePic")

        return NextResponse.json({receivedRqsts:user?.receivedRequests},{status:201});

    } catch (err) {
        console.error("Server error:", err);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }   
}