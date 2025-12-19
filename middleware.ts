import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { JWTPayload, jwtVerify, } from "jose";

async function verifyJwt(token:string): Promise<JWTPayload | null> {
    try {
        const secretKey = process.env.JWT_SECRET;
        if (!secretKey) throw new Error("JWT_SECRET missing");

        const secret = new TextEncoder().encode(secretKey);
        const { payload } = await jwtVerify(token,secret);
        return payload;
    } catch {
        return null;
    }
}

export async function middleware(req: NextRequest) {

    const token = req.cookies.get('jwt')?.value;

    const isAuthPage = req.nextUrl.pathname.startsWith("/auth");

    const payload = token ? await verifyJwt(token) : null;

    if (!payload && !isAuthPage) {
        return NextResponse.redirect(new URL("/auth/login",req.url));
    }

    if (payload && isAuthPage) {
        return NextResponse.redirect(new URL ("/",req.url));
    }

    if (payload) {
        const headers = new Headers(req.headers);
        headers.set("x-user-id",payload.userId as string);
        return NextResponse.next({request:{headers}});
    }

    return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|favicon.ico).*)"],
};