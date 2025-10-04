"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSelector, shallowEqual } from "react-redux";
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
    if (pathname === "/StudentHome" || pathname === "/Student") {
      console.log("Setting visitedHome to true for pathname:", pathname);
      sessionStorage.setItem("visitedHome", "true");
    }
  }, [pathname]);

  const getTargetRoute = useCallback(async () => {
    const token = localStorage.getItem("token");
    const userId = user?.id;

    if (!userId || !token) {
      return "/loginForm";
    }

    try {
      if (user?.role === "student") {
        const res = await axios.get(
          `${API_URL}/api/students/getprofile/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (res.data.data) {
          return res.data.data.isSubscribed ? "/Student" : "/subscription";
        }
        return "/StudentProfile";
      }
      // 🔹 Mentor redirect
      if (user?.role === "mentor") {
        return "/mentorHome";
      }

      // 🔹 Admin redirect
      if (user?.role === "admin") {
        return "/admin";
      }

      return "/loginForm";
    } catch (err) {
      console.error("Profile check error:", err);
      return ROLE_REDIRECTS[user?.role || "student"] || FALLBACK_ROUTE;
    }
  }, [user, API_URL]);

  useEffect(() => {
    if (!mounted || loading || redirecting) {
      console.log("Skipping redirect due to:", {
        mounted,
        loading,
        redirecting,
      });
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
        console.log("No redirect needed, staying on:", pathname, {
          target,
          lastRedirect: lastRedirect.current,
        });
        setRedirecting(false);
      }
    });
  }, [pathname, router, getTargetRoute, loading, redirecting, mounted]);

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

  return <main className="bg-white min-h-screen">{children}</main>;
}