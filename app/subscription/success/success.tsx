"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SuccessPage() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const sessionId = searchParams.get("session_id");
    const categoryParam = searchParams.get("category");
    const stackParam = searchParams.get("stack");

    const [status, setStatus] = useState<"loading" | "success" | "failed">("loading");
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        const verifyPaymentAndCreateRequest = async () => {
            if (!sessionId) {
                console.log("No session ID found in URL");
                setErrorMsg("Missing payment session ID.");
                setStatus("failed");
                return;
            }

            // Get category & stack from URL query or localStorage
            const category = categoryParam || localStorage.getItem("selectedCategory");
            const stack = stackParam || localStorage.getItem("selectedStack");

            if (!category || !stack) {
                console.log("Missing category or stack");
                setErrorMsg("Course selection incomplete. Please select a category and stack.");
                setStatus("failed");
                return;
            }

            try {
                console.log("Verifying payment session:", sessionId);

                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/subscription/verify-session?session_id=${sessionId}`
                );
                const data = await res.json();
                console.log("Payment verification response:", data);

                if (data.success) {
                    const token = localStorage.getItem("token");
                    if (!token) {
                        console.error("No token found in localStorage");
                        setErrorMsg("Please login again.");
                        setStatus("failed");
                        return;
                    }

                    const requestRes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/requests`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                        body: JSON.stringify({ category, stack }),
                    });

                    const requestData = await requestRes.json();
                    console.log("Request creation response:", requestData);

                    if (requestRes.ok) {
                        // Clear stored course selection
                        localStorage.removeItem("selectedCategory");
                        localStorage.removeItem("selectedStack");

                        setStatus("success");
                        setTimeout(() => router.push("/Student"), 4000);
                    } else {
                        console.error("Request creation failed:", requestData);
                        setErrorMsg(requestData.message || "Failed to create request.");
                        setStatus("failed");
                    }
                } else {
                    console.error("Payment verification failed");
                    setErrorMsg("Payment verification failed. Please contact support.");
                    setStatus("failed");
                }
            } catch (err) {
                console.error("Verification error:", err);
                setErrorMsg("An unexpected error occurred.");
                setStatus("failed");
            }
        };

        verifyPaymentAndCreateRequest();
    }, [sessionId, categoryParam, stackParam, router]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-white p-4">
            {status === "loading" && (
                <div className="flex flex-col items-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 mb-6"></div>
                    <h2 className="text-xl font-semibold text-blue-700">Verifying your payment...</h2>
                    <p className="text-gray-600 mt-2">Please wait a moment</p>
                </div>
            )}

            {status === "success" && (
                <div className="text-center">
                    <div className="text-green-500 text-6xl mb-4">🎉</div>
                    <h1 className="text-3xl font-bold mb-2">Payment Successful!</h1>
                    <p className="text-gray-700 mb-4">Your request has been created 🎯</p>
                    <p className="text-gray-500">Redirecting to your dashboard...</p>
                </div>
            )}

            {status === "failed" && (
                <div className="text-center">
                    <div className="text-red-500 text-6xl mb-4">❌</div>
                    <h1 className="text-3xl font-bold mb-2">Payment Verification Failed</h1>
                    <p className="text-gray-700 mb-4">{errorMsg}</p>
                    <button
                        onClick={() => router.push("/subscription")}
                        className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                    >
                        Try Again
                    </button>
                </div>
            )}
        </div>
    );
}
