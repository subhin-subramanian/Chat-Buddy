import { DBConnection } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/User.model";
import { headers } from "next/headers";

export async function GET(){
    try {
        const currentUserId = (await headers()).get("x-user-id");

        await DBConnection();

        if(!currentUserId){
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const user = await User.findById(currentUserId).select("userName email password bio profilePic");

        if (!user) {
            return NextResponse.json({message:"User not found"},{ status:404 });
        }
        
        return NextResponse.json({ user });
        
    } catch (error) {
        return  NextResponse.json({ message: error }, { status: 500 });
    }
}

// ----- Function to save the updated user details ----- //
export async function PATCH (req:NextRequest){
  try{
    const currentUserId = (await headers()).get("x-user-id");

    await DBConnection();

    if(!currentUserId){
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { userName, bio, email, profilePic } = body;

    const updateFields: Partial<{
      userName: string;
      bio: string;
      email: string;
      profilePic: string;
    }> = {}

    if (userName) updateFields.userName = userName;
    if (email) updateFields.email = email;
    if (bio !== undefined) updateFields.bio = bio;
    if (profilePic) updateFields.profilePic = profilePic;

    if (Object.keys(updateFields).length === 0){
        return NextResponse.json({message: "There is no valid fields"},{ status: 400 })
    }

    const updatedUser = await User.findByIdAndUpdate(currentUserId,
        { $set:updateFields }, { new:true }).select("userName bio email profilePic");
    
    if (!updatedUser) {
        return NextResponse.json({message: "User not found"},{ status: 404 });
    }

    return NextResponse.json({message:'User details updated',updatedUser},{status:200});
  
    } catch (error) {
        return  NextResponse.json({ message: error }, { status: 500 });
    }
}  

