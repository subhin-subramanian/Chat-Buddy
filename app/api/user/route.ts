import { DBConnection } from "@/lib/db";
import User from "@/models/User.model";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(){
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
            
        return NextResponse.json({ user });
        
    } catch (error) {
        console.log(error);
        return  NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

         