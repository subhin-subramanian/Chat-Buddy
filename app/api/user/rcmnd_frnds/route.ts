import { DBConnection } from "@/lib/db";
import { verifyToken } from "@/lib/verifyToken";
import User from "@/models/User.model";
import { NextRequest, NextResponse } from "next/server";

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

        const user = await User.findById(userfromToken._id).select("friends");
        const userFriends = user?.friends;

        const friendsRcmnded = await User.find({
            _id:{
                $ne:userfromToken._id,
                $nin:userFriends
            }
        }).select("userName bio profilePic");

        return NextResponse.json({friendsRcmnded},{status:200});

    } catch (err) {
        console.error("Server error:", err);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }   
}