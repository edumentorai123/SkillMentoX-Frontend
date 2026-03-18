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

  const { user, loading, hasProfile, isPremium } = useSelector(
    (
      state: RootState,
    ): {
      user: User | null;
      loading: boolean;
      hasProfile: boolean;
      isPremium: boolean;
    } => ({
      user: state.auth.user,
      loading: state.auth.loading,
      hasProfile: state.auth.hasProfile ?? false,
      isPremium: state.auth.isPremium ?? false,
    }),
    shallowEqual,
  );

  const profileCheckCache = useRef<
    Map<string, { result: string; timestamp: number }>
  >(new Map());
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
    localStorage.removeItem("user");
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
    const token =
      localStorage.getItem("accessToken") ||
      localStorage.getItem("token") ||
      localStorage.getItem("authToken");

    // If we have token/cookies, we largely trust the server middleware for the initial redirect.
    // This client-side guard is mainly to catch session expiry or missing local data.

    let localUser = user;
    if (!localUser) {
      const storedAuth = localStorage.getItem("auth");
      const storedUser = localStorage.getItem("user");

      if (storedAuth) {
        try {
          const parsed = JSON.parse(storedAuth);
          localUser = parsed.user || (parsed.role ? parsed : null);
          console.log("AuthRedirect: Found user in 'auth' key", !!localUser);
        } catch (e) {
          console.error("AuthRedirect: Failed to parse 'auth' key", e);
        }
      }
      if (!localUser && storedUser) {
        try {
          const parsed = JSON.parse(storedUser);
          localUser = parsed.user || (parsed.role ? parsed : parsed);
          console.log("AuthRedirect: Found user in 'user' key", !!localUser);
        } catch (e) {
          console.error("AuthRedirect: Failed to parse 'user' key", e);
        }
      }
    }

    // Fallback: If we have a role in userRole but no structured user object
    if (!localUser?.role) {
      const storedRole = localStorage.getItem("userRole");
      if (storedRole) {
        console.log("AuthRedirect: Found role in 'userRole' key:", storedRole);
        localUser = { ...localUser, role: storedRole } as any;
      }
    }

    if (!token || !localUser?.role) {
      console.log("AuthRedirect: No valid session found, sending to login", {
        hasToken: !!token,
        hasUser: !!localUser,
        role: localUser?.role,
        pathname,
      });
      return "/loginForm";
    }

    const role = localUser.role;

    // Sync cookies for middleware if missing
    const hasTokenCookie = document.cookie.includes("token=");
    const hasRoleCookie = document.cookie.includes("role=");
    if (!hasTokenCookie || !hasRoleCookie) {
    }

    // Route protection based on roles
    if (role === "student") {
      const storedAuth = localStorage.getItem("auth");
      let storedHasProfile = false;
      let storedIsPremium = false;

      if (storedAuth) {
        try {
          const parsed = JSON.parse(storedAuth);
          storedHasProfile = parsed.hasProfile ?? false;
          storedIsPremium = parsed.isPremium ?? false;
        } catch (e) {}
      }

      const currentHasProfile =
        hasProfile ||
        storedHasProfile ||
        (localUser as any).hasProfile ||
        false;
      const currentIsPremium =
        isPremium || storedIsPremium || (localUser as any).isPremium || false;

      // Priority 1: No Profile -> Must complete /StudentProfile
      if (!currentHasProfile) {
        const allowedPaths = ["/StudentHome", "/StudentProfile", "/loginForm"];
        // If accessing anything else (like /Student or /subscription), redirect to profile setup
        if (!allowedPaths.some((p) => pathname.startsWith(p))) {
          console.log(
            "AuthRedirect: No profile found, forcing /StudentProfile",
          );
          return "/StudentProfile";
        }
      }
      // Priority 2: Not Premium -> Must complete /subscription to access Dashboard
      else if (!currentIsPremium) {
        const nonRestrictedPaths = [
          "/Student/Settings",
          "/StudentProfile",
          "/subscription",
          "/StudentHome",
          "/loginForm",
        ];
        const isDashboardPath =
          pathname.startsWith("/Student") &&
          !nonRestrictedPaths.some((p) => pathname === p);

        // If trying to access main dashboard areas without premium, go to /subscription
        if (isDashboardPath || pathname === "/Student") {
          console.log(
            "AuthRedirect: Non-premium student accessing dashboard, redirecting to /subscription",
          );
          return "/subscription";
        }
      }

      // Priority 3: Premium User -> Direct to Dashboard from StudentHome
      else if (currentIsPremium && pathname === "/StudentHome") {
        console.log(
          "AuthRedirect: Premium student on Home, redirecting to Dashboard",
        );
        return "/Student";
      }

      if (pathname.startsWith("/mentorHome") || pathname.startsWith("/admin")) {
        console.log(
          "AuthRedirect: Role mismatch (Student), forcing redirect to /Student",
        );
        return "/Student";
      }
    } else if (role === "mentor") {
      if (
        pathname.startsWith("/Student") ||
        pathname.startsWith("/StudentHome") ||
        pathname.startsWith("/admin")
      ) {
        console.log(
          "AuthRedirect: Role mismatch (Mentor), forcing redirect to /mentorHome",
        );
        return "/mentorHome";
      }
    }

    console.log("AuthRedirect: Session valid, staying on path:", pathname);
    return pathname; // Default stay on current path
  }, [user, pathname]);

  useEffect(() => {
    if (
      !isInitialized ||
      loading ||
      isRedirecting ||
      redirectExecuted.current
    ) {
      console.log("Skipping redirect due to:", {
        isInitialized,
        loading,
        isRedirecting,
        redirectExecuted: redirectExecuted.current,
      });
      return;
    }

    if (user?.id && !isValidObjectId(user.id)) {
      console.log("Force redirect due to corrupted userId:", user.id);
      clearCorruptedAuth();
      router.replace("/loginForm");
      return;
    }

    console.log(" getTargetRoute useEffect triggered", {
      user,
      hasProfile,
      pathname,
    });
    redirectExecuted.current = true;
    setIsRedirecting(true);
    getTargetRoute()
      .then((target) => {
        console.log(
          "Target route determined:",
          target,
          "Current path:",
          pathname,
        );
        if (target && pathname !== target) {
          console.log(`Redirecting from ${pathname} to ${target}`);
          router.replace(target);
        } else {
          console.log("No redirect needed, staying on:", pathname);
        }
      })
      .catch((error) => {
        console.error("Error in getTargetRoute:", error);
        router.replace("/loginForm");
      })
      .finally(() => {
        setIsRedirecting(false);
      });
  }, [
    isInitialized,
    loading,
    user,
    hasProfile,
    pathname,
    router,
    getTargetRoute,
    clearCorruptedAuth,
    isRedirecting,
  ]);

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

  if (!isInitialized || loading || isRedirecting) {
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
