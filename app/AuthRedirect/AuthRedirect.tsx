"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { shallowEqual } from "react-redux";
import type { RootState } from "@/redux/store";
import axiosClient from "../lib/axiosClient";
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


export default function AuthRedirect({ children }: AuthRedirectProps) {
    const router = useRouter();
    const pathname = usePathname();
    const dispatch = useDispatch();
    const [isInitialized, setIsInitialized] = useState(false);
    const [isRedirecting, setIsRedirecting] = useState(false);
    const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL as string;

    const { user, loading, hasProfile } = useSelector(
        (state: RootState): {
            user: User | null;
            loading: boolean;
            hasProfile: boolean;
        } => ({
            user: state.auth.user,
            loading: state.auth.loading,
            hasProfile: state.auth.hasProfile ?? false,
        }),
        shallowEqual
    );

    const profileCheckCache = useRef<Map<string, { result: string; timestamp: number }>>(new Map());
    const CACHE_DURATION = 30000;
    const redirectExecuted = useRef(false);
    const profileCheckExecuted = useRef(false);

    useEffect(() => {
        // Immediate initialization
        setIsInitialized(true);
    }, []);

    useEffect(() => {
        if (pathname === "/StudentHome" || pathname === "/Student") {
            console.log("Setting visitedHome to true for pathname:", pathname);
            sessionStorage.setItem("visitedHome", "true");
        }
    }, [pathname]);

    const clearCorruptedAuth = useCallback(() => {
        console.log("Clearing auth data...");
        localStorage.removeItem("auth");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("token");
        localStorage.removeItem("authToken");
        localStorage.removeItem("userName");
        localStorage.removeItem("userRole");
        localStorage.removeItem("userId");
        sessionStorage.removeItem("visitedHome");
        dispatch({ type: "auth/setUser", payload: null });
        dispatch({ type: "auth/setHasProfile", payload: false });
    }, [dispatch]);

    const isValidObjectId = (id: string) => {
        return /^[0-9a-fA-F]{24}$/.test(id);
    };

    const getTargetRoute = useCallback(async () => {
        const token = localStorage.getItem("accessToken") || localStorage.getItem("token") || localStorage.getItem("authToken");
        
        // If we have token/cookies, we largely trust the server middleware for the initial redirect.
        // This client-side guard is mainly to catch session expiry or missing local data.
        
        let localUser = user;
        if (!localUser) {
            const stored = localStorage.getItem("auth");
            if (stored) {
                try {
                    const parsed = JSON.parse(stored);
                    localUser = parsed.user;
                } catch (e) {
                    console.error("Error parsing stored auth");
                }
            }
        }

        if (!token || !localUser?.role) {
            console.log("No valid session found in AuthRedirect, sending to login");
            return "/loginForm";
        }

        const role = localUser.role;

        // Route protection based on roles
        if (role === "student") {
            if (pathname.startsWith("/mentorHome") || pathname.startsWith("/admin")) {
                return "/Student";
            }
        } else if (role === "mentor") {
            if (pathname.startsWith("/Student") || pathname.startsWith("/StudentHome") || pathname.startsWith("/admin")) {
                return "/mentorHome";
            }
        }

        return pathname; // Default stay on current path
    }, [user, pathname]);

    useEffect(() => {
        if (!isInitialized || loading || isRedirecting || redirectExecuted.current) {
            console.log("Skipping redirect due to:", { isInitialized, loading, isRedirecting, redirectExecuted: redirectExecuted.current });
            return;
        }

        if (user?.id && !isValidObjectId(user.id)) {
            console.log("Force redirect due to corrupted userId:", user.id);
            clearCorruptedAuth();
            router.replace("/loginForm");
            return;
        }

        console.log(" getTargetRoute useEffect triggered", { user, hasProfile, pathname });
        redirectExecuted.current = true;
        setIsRedirecting(true);
        getTargetRoute().then((target) => {
            console.log("Target route determined:", target, "Current path:", pathname);
            if (target && pathname !== target) {
                console.log(`Redirecting from ${pathname} to ${target}`);
                router.replace(target);
            } else {
                console.log("No redirect needed, staying on:", pathname);
            }
        }).catch((error) => {
            console.error("Error in getTargetRoute:", error);
            router.replace("/loginForm");
        }).finally(() => {
            setIsRedirecting(false);
        });
    }, [isInitialized, loading, user, hasProfile, pathname, router, getTargetRoute, clearCorruptedAuth, isRedirecting]);

    // Add a safeguard to prevent rapid consecutive redirects
    useEffect(() => {
        const redirectTimeout = setTimeout(() => {
            if (isRedirecting) {
                console.warn("Redirect timeout reached, resetting isRedirecting");
                setIsRedirecting(false);
            }
        }, 5000);

        return () => clearTimeout(redirectTimeout);
    }, [isRedirecting]);

    if (!isInitialized || loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-white">
                <div className="text-center">
                    <div className="animate-spin h-12 w-12 border-b-2 border-blue-600 rounded-full mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    return <main className="bg-white min-h-screen">{children}</main>;
}
