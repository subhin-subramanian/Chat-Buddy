import { DBConnection } from "@/lib/db";
import User from "@/models/User.model";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const currentUserId = (await headers()).get("x-user-id");
        await DBConnection();

        if(!currentUserId){
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const user = await User.findById(currentUserId).select("userName bio profilePic");

        return NextResponse.json({ user });
    
    } catch (error) {
        return  NextResponse.json({ message: error }, { status: 500 });
    }
}