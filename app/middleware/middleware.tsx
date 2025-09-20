import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const token = request.cookies.get("token")?.value;
    const role = request.cookies.get("role")?.value;
    const { pathname } = request.nextUrl;

    // Define route groups
    const publicRoutes = ["/loginForm", "/register", "/forgot-password"];
    const studentRoutes = [
        "/StudentHome",
        "/student",
        "/Student",
        "/subscription",
        "/choose-mentor",
        "/mentor-pending",
        "/Studentprofile"
    ];
    const mentorRoutes = ["/mentorHome", "/mentor"];
    const adminRoutes = ["/admin"];

    if (
        pathname.startsWith("/api") ||
        pathname.startsWith("/_next") ||
        pathname.startsWith("/favicon.ico") ||
        pathname.includes(".") 
    ) {
        return NextResponse.next();
    }

    if (pathname === "/") {
        if (token && role) {
            const redirectUrl = role === "student" ? "/Student"
                : role === "mentor" ? "/mentorHome"
                    : role === "admin" ? "/admin"
                        : "/loginForm";
            return NextResponse.redirect(new URL(redirectUrl, request.url));
        }
        return NextResponse.next();
    }

    const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));

    // No token - redirect to login if accessing protected route
    if (!token && !isPublicRoute) {
        return NextResponse.redirect(new URL("/loginForm", request.url));
    }

    // Has token but accessing login/register pages - redirect to appropriate home
    if (token && isPublicRoute) {
        const redirectUrl = role === "student" ? "/StudentHome"
            : role === "mentor" ? "/mentorHome"
                : role === "admin" ? "/admin"
                    : "/loginForm";
        return NextResponse.redirect(new URL(redirectUrl, request.url));
    }

    // Role-based route protection (only if token exists)
    if (token && role) {
        // Check if user is trying to access routes they shouldn't
        const isAccessingWrongRoute =
            (role === "student" && mentorRoutes.some(route => pathname.startsWith(route))) ||
            (role === "mentor" && studentRoutes.some(route => pathname.startsWith(route))) ||
            (role !== "admin" && adminRoutes.some(route => pathname.startsWith(route))) ||
            (role === "admin" && ![...adminRoutes, ...publicRoutes].some(route => pathname.startsWith(route)));

        if (isAccessingWrongRoute) {
            const redirectUrl = role === "student" ? "/Student"
                : role === "mentor" ? "/mentorHome"
                    : role === "admin" ? "/admin"
                        : "/loginForm";
            return NextResponse.redirect(new URL(redirectUrl, request.url));
        }
    }

    return NextResponse.next();
}
