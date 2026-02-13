"use client";
import { useState, useEffect, useCallback } from "react";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { updateField } from "@/redux/Slices/profileSlice";
import { useRouter, useSearchParams } from "next/navigation";
import axios, { AxiosError } from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(false);
    const [hasProfile, setHasProfile] = useState<boolean | null>(null);
    const profile = useAppSelector((state) => state.profile);
    const auth = useAppSelector((state) => state.auth);
    const { selectedCategory, selectedStack } = profile;
    const { isPremium } = auth;
    const router = useRouter();
    const searchParams = useSearchParams();

    const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL as string;

    // Check profile status on mount
    useEffect(() => {
        const checkProfile = async () => {
            // First ensure auth state is loaded from localStorage
            const authData = JSON.parse(localStorage.getItem("auth") || "{}");
            const token = localStorage.getItem("token") || localStorage.getItem("accessToken") || localStorage.getItem("authToken");
            const userId = authData.user?.id || auth.user?.id;

            console.log("Profile check - userId:", userId, "token:", !!token, "authData:", authData);

            if (!userId || !token) {
                console.log("Missing userId or token in profile check");
                setHasProfile(false);
                return;
            }

            try {
                const response = await axios.get(
                    `${API_URL}/api/students/getprofile/${userId}`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );

                if (response.data && response.data.data) {
                    console.log("Profile found in subscription check:", response.data.data);
                    setHasProfile(true);
                    
                    // Dispatch profile data to Redux
                    const profileData = response.data.data;
                    if (profileData.selectedCategory) {
                        dispatch(updateField({ field: "selectedCategory", value: profileData.selectedCategory }));
                    }
                    if (profileData.selectedStack) {
                        dispatch(updateField({ field: "selectedStack", value: profileData.selectedStack }));
                    }

                    // Update localStorage with profile data
                    const updatedAuthData = {
                        ...authData,
                        hasProfile: true
                    };
                    localStorage.setItem("auth", JSON.stringify(updatedAuthData));
                } else {
                    console.log("No profile data in response");
                    setHasProfile(false);
                }
            } catch (error) {
                if (axios.isAxiosError(error) && error.response?.status === 404) {
                    console.log("Profile not found in subscription check");
                    setHasProfile(false);

                    // Update localStorage
                    const updatedAuthData = {
                        ...authData,
                        hasProfile: false
                    };
                    localStorage.setItem("auth", JSON.stringify(updatedAuthData));
                } else {
                    console.error("Profile check error:", error);
                    toast.error("Error checking profile. Please try again.", {
                        position: "top-right",
                        autoClose: 3000,
                    });
                    setHasProfile(false);
                }
            }
        };

        checkProfile();
    }, [auth.user?.id, API_URL]);

    const handleSubscriptionSuccess = useCallback(
        async (sessionId: string) => {
            setLoading(true);
            try {
                const token = localStorage.getItem("token") || localStorage.getItem("accessToken") || localStorage.getItem("authToken");
                const authData = JSON.parse(localStorage.getItem("auth") || "{}");
                const userId = authData.user?.id || auth.user?.id;

                if (!userId || !token) {
                    console.error("Missing userId or token in success callback:", { userId, token: !!token, authData });
                    throw new Error("User not logged in. Please login again.");
                }

                const response = await axios.post(
                    `${API_URL}/api/subscription/verify-session`,
                    { sessionId, userId },
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );

                if (!response.data.success) {
                    throw new Error(response.data.message || "Subscription verification failed");
                }

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
                        : error instanceof Error
                            ? error.message
                            : "An unexpected error occurred";
                console.error("Subscription error:", errorMessage);
                toast.error(errorMessage, {
                    position: "top-right",
                    autoClose: 3000,
                });
                router.push("/loginForm");
            } finally {
                setLoading(false);
            }
        },
        [router, API_URL]
    );

    useEffect(() => {
        const sessionId = searchParams.get("session_id");
        if (sessionId && !loading) {
            console.log("Processing subscription success callback with sessionId:", sessionId);
            handleSubscriptionSuccess(sessionId);
        }
    }, [searchParams, handleSubscriptionSuccess, loading]);

    const updateLocalStorage = (userData: UserData, token: string) => {
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
        if (hasProfile === false) {
            toast.error("Please complete your profile first!", {
                position: "top-right",
                autoClose: 3000,
            });
            router.push("/StudentProfile");
            return;
        }

        if (!selectedCategory || !selectedStack) {
            toast.error("Please select a course category and stack first!", {
                position: "top-right",
                autoClose: 3000,
            });
            router.push("/StudentProfile");
            return;
        }

        setLoading(true);

        try {
            const token = localStorage.getItem("token") || localStorage.getItem("accessToken") || localStorage.getItem("authToken");
            const authData = JSON.parse(localStorage.getItem("auth") || "{}");
            const userId = authData.user?.id || auth.user?.id;

            if (!userId || !token) {
                console.error("Missing userId or token:", { userId, token: !!token, authData });
                throw new Error("User not logged in. Please login again.");
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

            const { url } = res.data;

            if (url) {
                window.location.href = url;
            } else {
                throw new Error("Failed to create checkout session: No URL returned");
            }
        } catch (err) {
            const errorMessage =
                err instanceof AxiosError
                    ? err.response?.data?.message || err.message
                    : err instanceof Error
                        ? err.message
                        : "An unexpected error occurred";
            console.error("Subscription error:", errorMessage);
            toast.error(errorMessage, {
                position: "top-right",
                autoClose: 3000,
            });
            router.push("/loginForm");
        } finally {
            setLoading(false);
        }
    };

    if (loading || hasProfile === null) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white p-6">
                <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1887A1] mx-auto mb-4"></div>
                    <h2 className="text-xl font-semibold text-[#0D4C5B] mb-2">
                        {loading ? "Processing subscription..." : "Checking profile..."}
                    </h2>
                    <p className="text-gray-600">
                        Please wait while we set up your subscription.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-white p-6">
            <div className="max-w-lg w-full border rounded-lg shadow-lg p-8 flex flex-col gap-6">
                {isPremium ? (
                    <>
                        <h1 className="text-3xl font-bold text-[#1887A1] text-center">
                            You are a Premium Member!
                        </h1>
                        <p className="text-[#0D4C5B] text-center">
                            Enjoy access to all courses, mentorship, and more.
                        </p>
                    </>
                ) : (
                    <>
                        <h1 className="text-3xl font-bold text-[#1887A1] text-center">
                            Upgrade to Premium
                        </h1>
                        <p className="text-[#0D4C5B] text-center">
                            Unlock all courses, personalized mentorship, exclusive resources, and AI-assisted learning.
                        </p>
                        <div className="bg-[#F9FAFB] p-4 rounded-md">
                            <h2 className="text-xl font-semibold text-[#1887A1] mb-2">Benefits:</h2>
                            <ul className="list-disc list-inside text-[#0D4C5B] space-y-1">
                                <li>Access to all courses</li>
                                <li>1-on-1 mentorship</li>
                                <li>Downloadable resources</li>
                                <li>Early access to new content</li>
                                <li>AI-assisted learning</li>
                            </ul>
                        </div>
                        <div className="flex flex-col gap-4 items-center">
                            <p className="text-2xl font-bold text-[#1887A1]">₹2999 / month</p>
                            <button
                                onClick={handleSubscribe}
                                disabled={loading}
                                className={`w-full bg-[#0D4C5B] text-white font-semibold py-3 cursor-pointer rounded-md transition hover:bg-[#1887A1] disabled:opacity-50`}
                            >
                                {loading ? "Processing..." : "Subscribe Now"}
                            </button>
                        </div>
                    </>
                )}
                <ToastContainer />
            </div>
        </div>
    );
}