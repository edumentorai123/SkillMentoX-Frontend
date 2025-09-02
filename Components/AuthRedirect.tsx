"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";

export default function AuthRedirect({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const [isMounted, setIsMounted] = useState(false);

    const {
        token,
        hasProfile,
        isPremium,
        mentorSelected,
        mentorAccepted,
        loading,
    } = useAppSelector((state) => state.auth);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (!isMounted || loading) return;

        if (!token) {
            if (pathname !== "/loginForm") router.replace("/loginForm");
            return;
        }

        if (pathname === "/loginForm" && token) {
            router.replace("/StudentHome");
            return;
        }

        if (hasProfile && !isPremium && pathname !== "/subscription") {
            router.replace("/subscription");
            return;
        }

        if (isPremium && !mentorSelected && pathname !== "/choose-mentor") {
            router.replace("/choose-mentor");
            return;
        }

        if (mentorSelected && !mentorAccepted && pathname !== "/mentor-pending") {
            router.replace("/mentor-pending");
            return;
        }

        if (
            token &&
            hasProfile &&
            isPremium &&
            mentorSelected &&
            mentorAccepted &&
            ["/loginForm", "/StudentHome", "/StudentProfile", "/subscription", "/choose-mentor", "/mentor-pending"].includes(pathname)
        ) {
            router.replace("/student");
            return;
        }
    }, [
        isMounted,
        token,
        hasProfile,
        isPremium,
        mentorSelected,
        mentorAccepted,
        loading,
        pathname,
        router,
    ]); 

    if (!isMounted || loading) {
        return (
            <>
                {children}
                {/* Overlay loading indicator */}
                {(!isMounted || loading) && (
                    <div className="fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50">
                        <p className="text-gray-500">Loading...</p>
                    </div>
                )}
            </>
        );
    }

    return <>{children}</>;
}