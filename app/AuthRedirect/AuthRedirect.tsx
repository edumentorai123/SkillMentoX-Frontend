"use client";
import { useEffect, useState, useCallback, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { shallowEqual } from "react-redux";
import type { RootState } from "@/redux/store";
import axios from "axios";

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
const PROTECTED_ROUTES = ["/StudentProfile", "/subscription", "/choose-mentor", "/mentor-pending", "/StudentHome", "/Student", "/mentorHome", "/admin"];
const ROLE_REDIRECTS: Record<string, string> = {
    student: "/Student",
    mentor: "/mentorHome",
    admin: "/admin",
};
const FALLBACK_ROUTE = "/Student";

export default function AuthRedirect({ children }: AuthRedirectProps) {
    const router = useRouter();
    const pathname = usePathname();
    const [mounted, setMounted] = useState(false);
    const [redirecting, setRedirecting] = useState(false);
    const lastRedirect = useRef<string | null>(null);
    const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL as string;

    const { user, loading } = useSelector(
        (state: RootState): { user: User | null; loading: boolean } => state.auth,
        shallowEqual
    );

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (pathname === "/StudentHome" || pathname === "/Student" || pathname === "/Student") {
            console.log("Setting visitedHome to true for pathname:", pathname);
            sessionStorage.setItem("visitedHome", "true");
        }
    }, [pathname]);

    const getTargetRoute = useCallback(async () => {
        console.log("getTargetRoute:", {
            pathname,
            user,
            visitedHome: sessionStorage.getItem("visitedHome"),
        });

        const token = localStorage.getItem("token");
        const auth = localStorage.getItem("auth");
        let userId = user?.id;

        if (!userId && auth) {
            try {
                const authData = JSON.parse(auth);
                userId = authData.user?.id;
            } catch (err) {
                console.error("Error parsing auth:", err);
            }
        }

        if (!user?.role && !auth) {
            console.log("No user or auth, checking public routes:", PUBLIC_ROUTES.includes(pathname));
            return PUBLIC_ROUTES.includes(pathname) ? null : "/loginForm";
        }

        if (!userId || !token) {
            return "/loginForm";
        }

        // Check backend for profile and subscription
        try {
            const response = await axios.get(`${API_URL}/api/students/getprofile/${userId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (response.data.data) {
                const authData = JSON.parse(localStorage.getItem("auth") || "{}");
                localStorage.setItem(
                    "auth",
                    JSON.stringify({
                        ...authData,
                        user: {
                            id: userId,
                            email: response.data.data.email,
                            firstName: response.data.data.name.split(" ")[0],
                            lastName: response.data.data.name.split(" ").slice(1).join(" ") || "",
                            role: authData.user?.role || "student",
                        },
                        hasProfile: true,
                        isPremium: response.data.data.isSubscribed || authData.isPremium,
                    })
                );
                localStorage.setItem("user", JSON.stringify(response.data.data));

                if (response.data.data.isSubscribed) {
                    return pathname === "/Student" ? null : "/Student";
                } else {
                    return pathname === "/subscription" ? null : "/subscription";
                }
            } else {
                return pathname === "/StudentProfile" ? null : "/StudentProfile";
            }
        } catch (error) {
            console.error("Profile check error:", error);
            return pathname === "/StudentProfile" ? null : "/StudentProfile";
        }
    }, [user, pathname]);

    useEffect(() => {
        if (!mounted || loading || redirecting) {
            console.log("Skipping redirect due to:", { mounted, loading, redirecting });
            return;
        }

        getTargetRoute().then((target) => {
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
        });
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