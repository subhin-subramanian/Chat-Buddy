import { verifyToken } from "@/lib/verifyToken";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {
    try {

        const token = req.cookies.get("jwt")?.value;
        if(!token){
            return NextResponse.json({ user: null }, { status: 401 });
        }

        const user = verifyToken(token);

        return NextResponse.json({ user });
    
    } catch (error) {
        return  NextResponse.json({ user: null }, { status: 401 });
    }
}