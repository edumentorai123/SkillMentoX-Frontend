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
        if (!sessionId) return;

        const verifyPayment = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) throw new Error("User not logged in");

                // Verify payment session
                const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/subscription/verify-session`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ sessionId }),
                });

                const data = await res.json();
                if (!data.success) throw new Error(data.message || "Payment verification failed");

                // Update subscription locally
                const authData = JSON.parse(localStorage.getItem("auth") || "{}");
                if (authData.user) {
                    authData.user.isSubscribed = true;
                    localStorage.setItem("auth", JSON.stringify(authData));
                }

                // Optional: call backend to create request with category/stack
                const category = categoryParam || localStorage.getItem("selectedCategory");
                const stack = stackParam || localStorage.getItem("selectedStack");

                if (category && stack) {
                    const reqRes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/students`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                        body: JSON.stringify({ category, stack }),
                    });

                    if (!reqRes.ok) throw new Error("Failed to create request");
                    localStorage.removeItem("selectedCategory");
                    localStorage.removeItem("selectedStack");
                }

                
                setStatus("success");
                router.replace("/Student");

            } catch (err: any) {
                console.error(err);
                setErrorMsg(err.message || "Payment verification failed");
                setStatus("failed");
            }
        };

        verifyPayment();
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
                    <p className="text-gray-500 mb-2">Redirecting to your dashboard in 1 second...</p>
                    <button
                        onClick={() => window.location.href = "/Student"}
                        className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition mt-2"
                    >
                        Go to Dashboard Now
                    </button>
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
