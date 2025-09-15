"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { shallowEqual } from "react-redux";
import type { RootState } from "@/redux/store";

interface User {
    role: string | null;
    id?: string;
    email?: string;
    firstName?: string;
    lastName?: string | null | undefined;
}

interface AuthRedirectProps {
    children: React.ReactNode;
}

const PUBLIC_ROUTES = ["/loginForm", "/register", "/forgot-password"];
const PROTECTED_ROUTES = ["/StudentProfile", "/subscription", "/choose-mentor", "/mentor-pending", "/StudentHome", "/mentorHome", "/admin"];
const ROLE_REDIRECTS: Record<string, string> = {
    student: "/StudentHome",
    mentor: "/mentorHome",
    admin: "/admin",
};
const FALLBACK_ROUTE = "/dashboard";

export default function AuthRedirect({ children }: AuthRedirectProps) {
    const router = useRouter();
    const pathname = usePathname();
    const [mounted, setMounted] = useState(false);
    const [redirecting, setRedirecting] = useState(false);
    const lastRedirect = useRef<string | null>(null);

    const { user, loading } = useSelector(
        (state: RootState): { user: User | null; loading: boolean } => state.auth,
        shallowEqual
    );



    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (pathname === "/StudentHome") {
            console.log("Setting visitedHome to true for pathname:", pathname);
            sessionStorage.setItem("visitedHome", "true");
        }
    }, [pathname]);

    const getTargetRoute = useCallback((): string | null => {
        console.log("getTargetRoute:", {
            pathname,
            user,
            visitedHome: sessionStorage.getItem("visitedHome"),
        });

        if (!user?.role) {
            console.log("No user or role, checking public routes:", PUBLIC_ROUTES.includes(pathname));
            return PUBLIC_ROUTES.includes(pathname) ? null : "/loginForm";
        }

        if (PROTECTED_ROUTES.includes(pathname)) {
            console.log("On protected route:", pathname);
            if (
                user.role === "student" &&
                ["/StudentProfile", "/StudentHome", "/subscription"].includes(pathname)
            ) {
                console.log("Student on valid route, no redirect needed:", pathname);
                return null;
            }


            const targetRoute = ROLE_REDIRECTS[user.role] || FALLBACK_ROUTE;
            if (pathname === targetRoute) {
                console.log("On role-specific route, no redirect needed");
                return null;
            }
        }

        if (user.role === "student" && !sessionStorage.getItem("visitedHome")) {
            console.log("Student hasn't visited StudentHome, redirecting");
            return pathname !== "/StudentHome" ? "/StudentHome" : null;
        }

        const targetRoute = ROLE_REDIRECTS[user.role] || FALLBACK_ROUTE;
        console.log("Fallback to role-specific route:", targetRoute);
        return pathname !== targetRoute ? targetRoute : null;
    }, [user, pathname]);

    useEffect(() => {
        if (!mounted || loading || redirecting) {
            console.log("Skipping redirect due to:", { mounted, loading, redirecting });
            return;
        }

        const target = getTargetRoute();

        if (target && pathname !== target && lastRedirect.current !== target) {
            console.log(`Redirecting from ${pathname} to ${target}`);
            lastRedirect.current = target;
            setRedirecting(true);
            const id = setTimeout(() => {
                try {
                    router.replace(target);
                } catch (err) {
                    console.error("Redirect failed:", err);
                } finally {
                    setRedirecting(false);
                }
            }, 200);

            return () => clearTimeout(id);
        } else {
            console.log("No redirect needed, staying on:", pathname, { target, lastRedirect: lastRedirect.current });
            setRedirecting(false);
        }
    }, [pathname, router, getTargetRoute, loading, redirecting, mounted]);

    if (!mounted || loading || redirecting) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-white">
                <div className="text-center">
                    <div className="animate-spin h-12 w-12 border-b-2 border-blue-600 rounded-full mx-auto mb-4"></div>
                    <p className="text-gray-600">{redirecting ? "Redirecting..." : "Loading..."}</p>
                </div>
            </div>
        );
    }

    return <main className="bg-white min-h-screen">{children}</main>;
}