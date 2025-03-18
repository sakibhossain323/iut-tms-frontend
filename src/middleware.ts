import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { Role } from "./lib/definitions";

export async function middleware(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.JWT_SECRET });
    const { pathname } = req.nextUrl;
    const isAuthRoute = pathname.startsWith("/auth");
    if (!isAuthRoute && !token) {
        return NextResponse.redirect(new URL("/auth/login", req.url));
    }

    const role = token?.role;
    const isAdminRoute = pathname.startsWith("/admin");
    if (role === Role.ADMIN && !isAdminRoute)
        return NextResponse.redirect(new URL("/admin", req.url));

    const isOfficerRoute = pathname.startsWith("/officer");
    if (role === Role.TRANSPORT_OFFICER && !isOfficerRoute)
        return NextResponse.redirect(new URL("/officer", req.url));

    const isHodRoute = pathname.startsWith("/hod");
    if (role === Role.HOD && !isOfficerRoute)
        return NextResponse.redirect(new URL("/hod", req.url));

    if (
        (role === Role.USER || role === Role.DRIVER) &&
        (isAdminRoute || isOfficerRoute || isHodRoute)
    )
        return NextResponse.redirect(new URL("/", req.url));

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
