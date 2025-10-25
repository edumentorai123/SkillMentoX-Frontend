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
        const timer = setTimeout(() => {
            setIsInitialized(true);
        }, 100);
        return () => clearTimeout(timer);
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
        const userId = user?.id;
        console.log("getTargetRoute called - userId:", userId, "token:", token ? "present" : "missing", "role:", user?.role, "hasProfile:", hasProfile);

        if (userId && !isValidObjectId(userId)) {
            console.log(" Corrupted userId detected:", userId);
            clearCorruptedAuth();
            return "/loginForm";
        }

        if (!userId || !token || !user?.role) {
            console.log("Missing userId, token, or role, redirecting to login");
            return "/loginForm";
        }

        if (user.role === "student" && pathname === "/StudentHome") {
            console.log("Already on StudentHome, no redirect needed");
            return pathname;
        }
        if (user.role === "mentor" && pathname === "/mentorHome") {
            console.log("Already on mentorHome, no redirect needed");
            return pathname;
        }
        if (user.role === "student" && pathname === "/StudentProfile") {
            console.log("Already on StudentProfile, no redirect needed");
            return pathname;
        }
        if (user.role === "mentor" && pathname === "/mentorProfile") {
            console.log("Already on mentorProfile, no redirect needed");
            return pathname;
        }

        if (user.role === "student") {
            const hasVisitedHome = sessionStorage.getItem("visitedHome") === "true";

            // If already on a valid student page, don't redirect
            if (pathname === "/StudentHome" || pathname === "/Student") {
                console.log("Already on StudentHome/Student, no redirect needed");
                return pathname;
            }
            if (pathname === "/subscription") {
                console.log("On subscription page, allowing user to complete subscription flow");
                return pathname;
            }



            if (!hasVisitedHome) {
                console.log("Student has not visited StudentHome, redirecting");
                return "/StudentHome";
            }

            if (hasProfile === true) {
                console.log("Student has profile, redirecting to StudentHome");
                return "/StudentHome";
            }

            if (hasProfile === false) {
                console.log("Student has no profile, redirecting to StudentProfile");
                return "/StudentProfile";
            }

            // Fallback: if hasProfile is still undefined after all checks, do profile check
            if (profileCheckExecuted.current) {
                console.log("Profile check already executed, redirecting to StudentProfile");
                return "/StudentProfile";
            }

            profileCheckExecuted.current = true;
            const cacheKey = `student_${userId}`;
            const now = Date.now();

            try {
                const cached = profileCheckCache.current.get(cacheKey);
                if (cached && now - cached.timestamp < CACHE_DURATION) {
                    console.log("Using cached profile check result:", cached.result);
                    const isProfileFound = cached.result === "/StudentHome";
                    dispatch({ type: "auth/setHasProfile", payload: isProfileFound });
                    return cached.result;
                }

                console.log("Fetching profile for userId:", userId);
                const res = await axiosClient.get(`${API_URL}/api/students/getprofile/${userId}`);

                if (res.data && res.data.data) {
                    console.log("Profile found, updating localStorage");
                    profileCheckCache.current.set(cacheKey, { result: "/StudentHome", timestamp: now });
                    dispatch({ type: "auth/setHasProfile", payload: true });

                    // Update localStorage with profile data
                    const authData = JSON.parse(localStorage.getItem("auth") || "{}");
                    authData.hasProfile = true;
                    localStorage.setItem("auth", JSON.stringify(authData));

                    return "/StudentHome";
                } else {
                    throw new Error("No profile data returned");
                }
            } catch (err) {
                if (axios.isAxiosError(err) && err.response?.status === 404) {
                    console.log("Student profile not found, redirecting to StudentProfile");
                    profileCheckCache.current.set(cacheKey, { result: "/StudentProfile", timestamp: now });
                    dispatch({ type: "auth/setHasProfile", payload: false });

                    // Update localStorage
                    const authData = JSON.parse(localStorage.getItem("auth") || "{}");
                    authData.hasProfile = false;
                    localStorage.setItem("auth", JSON.stringify(authData));

                    return "/StudentProfile";
                }
                console.error("Profile check error for student:", err);
                return "/loginForm";
            }
        }

        if (user.role === "mentor") {
            // If already on a valid mentor page, don't redirect
            if (pathname === "/mentorHome") {
                console.log("Already on mentorHome, no redirect needed");
                return pathname;
            }
            if (pathname === "/mentorProfile") {
                console.log("On mentorProfile page, allowing user to complete profile setup");
                return pathname;
            }

            if (hasProfile) {
                console.log("Mentor has profile, redirecting to mentorHome");
                return "/mentorHome";
            }
            const cacheKey = `mentor_${userId}`;
            const now = Date.now();
            try {
                const cached = profileCheckCache.current.get(cacheKey);
                if (cached && now - cached.timestamp < CACHE_DURATION) {
                    console.log("Using cached profile check result:", cached.result);
                    return cached.result;
                }
                const res = await axiosClient.get(`${API_URL}/api/mentor/getprofile/${userId}`);
                if (res.data) {
                    profileCheckCache.current.set(cacheKey, { result: "/mentorHome", timestamp: now });
                    dispatch({ type: "auth/setHasProfile", payload: true });
                    return "/mentorHome";
                }
                throw new Error("No profile data returned");
            } catch (err) {
                if (axios.isAxiosError(err) && err.response?.status === 404) {
                    console.log("Mentor profile not found, redirecting to mentorProfile");
                    profileCheckCache.current.set(cacheKey, { result: "/mentorProfile", timestamp: now });
                    return "/mentorProfile";
                }
                console.error("Profile check error for mentor:", err);
                return "/loginForm";
            }
        }

        if (user.role === "admin") {
            console.log("Admin user, redirecting to admin dashboard");
            return "/admin";
        }

        console.log("Unknown role, redirecting to login");
        return "/loginForm";
    }, [user, API_URL, hasProfile, clearCorruptedAuth, pathname, dispatch]);

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
