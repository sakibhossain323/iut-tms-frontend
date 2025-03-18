import { getToken } from "next-auth/jwt";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.JWT_SECRET });
    const { pathname } = req.nextUrl;

    const protectedPaths = [
        "/dashboard",
        "/requisition",
        "/profile",
        "/settings",
    ];

    const isProtectedRoute = protectedPaths.some((path) =>
        pathname.startsWith(path)
    );

    if (isProtectedRoute && !token) {
        return NextResponse.redirect(new URL("/auth/login", req.url));
    }

    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("x-url", req.url);

    return NextResponse.next({
        request: {
            headers: requestHeaders,
        },
    });
}

export const config = {
    matcher: ["/((?!api|_next|public|auth).*)"], // Exclude non-page routes
};
