"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";

interface AuthRedirectProps {
    children: React.ReactNode;
}

// Public routes that don’t require authentication
const PUBLIC_ROUTES = ["/loginForm", "/register", "/forgot-password"];

export default function AuthRedirect({ children }: AuthRedirectProps) {
    const router = useRouter();
    const pathname = usePathname();
    const [mounted, setMounted] = useState(false);
    const [redirecting, setRedirecting] = useState(false);

    const { user, hasProfile, isPremium, mentorSelected, mentorAccepted, loading } =
        useAppSelector((state) => state.auth);

    useEffect(() => {
        setMounted(true);
    }, []);

    const getTargetRoute = useCallback((): string | null => {
        if (!user?.role) {
            return PUBLIC_ROUTES.includes(pathname) ? null : "/loginForm";
        }

        if (user.role === "student") {
            if (!hasProfile) return "/StudentProfile";
            if (!isPremium) return "/subscription";
            if (!mentorSelected) return "/choose-mentor";
            if (!mentorAccepted) return "/mentor-pending";
            return "/StudentHome";
        }

        if (user.role === "mentor") return "/mentorHome";
        if (user.role === "admin") return "/admin";

        return null;
    }, [user, hasProfile, isPremium, mentorSelected, mentorAccepted, pathname]);

    useEffect(() => {
        if (!mounted || loading || redirecting) return;

        const target = getTargetRoute();

        if (target && pathname !== target) {
            setRedirecting(true);
            const id = setTimeout(() => {
                try {
                    router.replace(target);
                } catch (err) {
                    console.error("Redirect failed:", err);
                } finally {
                    setRedirecting(false);
                }
            }, 50); // smaller delay, smoother redirect
            return () => clearTimeout(id);
        }
    }, [mounted, loading, redirecting, pathname, router, getTargetRoute]);

    // Render a loading spinner while checking authentication/redirecting
    if (!mounted || loading || redirecting) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-white">
                <div className="text-center">
                    <div className="animate-spin h-12 w-12 border-b-2 border-blue-600 rounded-full mx-auto mb-4"></div>
                    <p className="text-gray-600">
                        {redirecting ? "Redirecting..." : "Loading..."}
                    </p>
                </div>
            </div>
        );
    }

    // Render children once everything is ready
    return <main className="bg-white min-h-screen">{children}</main>;
}
