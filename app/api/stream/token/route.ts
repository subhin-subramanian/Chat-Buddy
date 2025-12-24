import { generateStreamToken } from "@/lib/stream";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET () {
  try {
    const currentUserId = (await headers()).get("x-user-id");
    if (!currentUserId) {
        return NextResponse.json({message:"Unauthorized"},{ status:401 });
    }

    const streamToken = generateStreamToken(currentUserId);

    return NextResponse.json({streamToken,currentUserId});

  } catch (error) {
    console.log("stream token error",error);
    return NextResponse.json({message:"Failed to generate Stream token due to internal server error"},{ status:500 });
  }
}