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
    const pathname = req.nextUrl.pathname;

    const isAuthPage = pathname.startsWith("/auth");
    const isApiRoute = pathname.startsWith("/api");
    const isPublicApi = pathname.startsWith("/api/auth/login") || pathname.startsWith("/api/auth/signup");

    const payload = token ? await verifyJwt(token) : null;

    // Allow public auth APIs
    if (isApiRoute && isPublicApi) {
        return NextResponse.next();
    }

    //  API + no token → 401 JSON
    if (isApiRoute && !payload) {
        return new NextResponse(
        JSON.stringify({ message: "Unauthorized" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
        );
    }

    // Page + no token → redirect
    if (!payload && !isAuthPage) {
        return NextResponse.redirect(new URL("/auth/login",req.url));
    }
    
    // Logged-in user visiting auth pages
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
  matcher: ["/((?!_next|favicon.ico).*)"],
};