"use client";
import { useState, useEffect, useCallback } from "react";
import { useAppSelector } from "@/redux/hooks";
import { useRouter, useSearchParams } from "next/navigation";
import axios, { AxiosError } from "axios"; // Import AxiosError
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Define interface for userData
interface UserData {
    id?: string;
    userId?: string;
    email: string;
    name?: string;
    role?: string;
    _id?: string;
    isSubscribed?: boolean;
}

export default function SubscriptionPage() {
    const [loading, setLoading] = useState(false);
    const profile = useAppSelector((state) => state.profile);
    const { selectedCategory, selectedStack } = profile;
    const router = useRouter();
    const searchParams = useSearchParams();

    const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL as string;

    // Wrap handleSubscriptionSuccess in useCallback to stabilize it
    const handleSubscriptionSuccess = useCallback(
        async (sessionId: string) => {
            setLoading(true);
            try {
                const token = localStorage.getItem("token");
                const userId = JSON.parse(localStorage.getItem("user") || "{}").id;

                if (!userId || !token) {
                    toast.error("User not logged in. Please login again.", {
                        position: "top-right",
                        autoClose: 3000,
                    });
                    router.push("/loginForm");
                    return;
                }

                // Verify subscription
                const response = await axios.post(
                    `${API_URL}/api/subscription/verify`,
                    { userId, sessionId },
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );

                console.log("Subscription response:", response.data);

                // Update localStorage
                updateLocalStorage(response.data.data, token);

                toast.success("Subscription successful!", {
                    position: "top-right",
                    autoClose: 3000,
                });
                router.push("/Student");
            } catch (error: unknown) {
                const errorMessage =
                    error instanceof AxiosError
                        ? error.response?.data?.message || error.message
                        : "An unexpected error occurred";
                console.error("Subscription error:", errorMessage);
                toast.error("Failed to process subscription. Please try again.", {
                    position: "top-right",
                    autoClose: 3000,
                });
            } finally {
                setLoading(false);
            }
        },
        [router, API_URL] // Dependencies for useCallback
    );

    useEffect(() => {
        // Handle Stripe success callback
        const sessionId = searchParams.get("session_id");
        if (sessionId) {
            handleSubscriptionSuccess(sessionId);
        }
    }, [searchParams, handleSubscriptionSuccess]); // Added handleSubscriptionSuccess to dependency array

    const updateLocalStorage = (userData: UserData, token: string) => {
        localStorage.clear();
        localStorage.setItem("token", token);
        localStorage.setItem(
            "auth",
            JSON.stringify({
                token,
                user: {
                    id: userData.id || userData.userId,
                    email: userData.email,
                    firstName: userData.name ? userData.name.split(" ")[0] : "",
                    lastName: userData.name ? userData.name.split(" ").slice(1).join(" ") : "",
                    role: userData.role || "student",
                },
                hasProfile: !!userData._id,
                isPremium: userData.isSubscribed || false,
            })
        );
    };

    const handleSubscribe = async () => {
        if (!selectedCategory || !selectedStack) {
            toast.error("Please select a course category and stack first!", {
                position: "top-right",
                autoClose: 3000,
            });
            return;
        }

        setLoading(true);

        try {
            const token = localStorage.getItem("token");
            const userId = JSON.parse(localStorage.getItem("user") || "{}").id;

            if (!userId || !token) {
                toast.error("User not logged in. Please login again.", {
                    position: "top-right",
                    autoClose: 3000,
                });
                router.push("/loginForm");
                return;
            }

            localStorage.setItem("selectedCategory", selectedCategory);
            localStorage.setItem("selectedStack", selectedStack);

            const res = await axios.post(
                `${API_URL}/api/subscription/create-checkout-session`,
                {
                    userId,
                    priceId: "price_1S67HdJPsups4VGUOVUiWQmH",
                    subscriptionType: "monthly",
                    category: selectedCategory,
                    stack: selectedStack,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = await res.data;

            if (data.url) {
                window.location.href = data.url;
            } else {
                console.error("No URL returned:", data);
                toast.error("Failed to create checkout session", {
                    position: "top-right",
                    autoClose: 3000,
                });
            }
        } catch (err) {
            console.error("Error:", err);
            toast.error("Something went wrong", {
                position: "top-right",
                autoClose: 3000,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white p-6">
            <div className="max-w-lg w-full border rounded-lg shadow-lg p-8 flex flex-col gap-6">
                <h1 className="text-3xl font-bold text-[#887A1] text-center">
                    Upgrade to Premium
                </h1>
                <p className="text-[#0D4C5B] text-center">
                    Unlock all courses, personalized mentorship, exclusive resources, and AI-assisted learning.
                </p>

                <div className="bg-[#F9FAFB] p-4 rounded-md">
                    <h2 className="text-xl font-semibold text-[#887A1] mb-2">Benefits:</h2>
                    <ul className="list-disc list-inside text-[#0D4C5B] space-y-1">
                        <li>Access to all courses</li>
                        <li>1-on-1 mentorship</li>
                        <li>Downloadable resources</li>
                        <li>Early access to new content</li>
                        <li>AI-assisted learning</li>
                    </ul>
                </div>

                <div className="flex flex-col gap-4 items-center">
                    <p className="text-2xl font-bold text-[#887A1]">₹2999 / month</p>
                    <button
                        onClick={handleSubscribe}
                        disabled={loading}
                        className={`w-full bg-[#0D4C5B] text-white font-semibold py-3 cursor-pointer rounded-md transition hover:bg-[#887A1] disabled:opacity-50`}
                    >
                        {loading ? "Processing..." : "Subscribe Now"}
                    </button>
                </div>
                <ToastContainer />
            </div>
        </div>
    );
}