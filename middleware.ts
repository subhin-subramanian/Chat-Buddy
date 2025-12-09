import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

async function verifyJwt(token:string){
    try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        await jwtVerify(token,secret);
        return true;
    } catch {
        return false;
    }
}

export async function middleware(req: NextRequest) {

    const token = req.cookies.get('jwt')?.value || null;
    const isAuthPage = req.nextUrl.pathname.startsWith("/auth");

    let isValidToken = false;
    if (token){
        isValidToken = await verifyJwt(token);
    }

    if (!isValidToken && !isAuthPage) {
        return NextResponse.redirect(new URL("/auth/login",req.url));
    }

    if (isValidToken && isAuthPage) {
        return NextResponse.redirect(new URL ("/",req.url));
    }

    return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|favicon.ico).*)"],
};