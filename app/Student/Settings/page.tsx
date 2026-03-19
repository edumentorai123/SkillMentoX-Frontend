"use client";
import React, { useState } from "react";
import { useAppSelector } from "@/redux/hooks";
import axios, { AxiosError } from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import { CreditCard, CheckCircle2, AlertCircle } from "lucide-react";
import "react-toastify/dist/ReactToastify.css";

export default function SettingsPage() {
    const auth = useAppSelector((state) => state.auth);
    const profile = useAppSelector((state) => state.profile);
    const { isPremium } = auth;
    const { selectedCategory, selectedStack } = profile;
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL as string;

    const handleSubscribe = async () => {
        const authData = JSON.parse(localStorage.getItem("auth") || "{}");
        const token = localStorage.getItem("token") || localStorage.getItem("accessToken") || localStorage.getItem("authToken");
        const userId = authData.user?.id || auth.user?.id;
        
        const category = selectedCategory || localStorage.getItem("selectedCategory");
        const stack = selectedStack || localStorage.getItem("selectedStack");

        // More robust check: if we have them in Redux OR localStorage, we are good.
        // If Redux is empty (on refresh), but localStorage has them, don't redirect.
        if (!category || !stack) {
            // Check if profile exists in backend as a last resort before redirecting
            try {
                const profileRes = await axios.get(`${API_URL}/api/students/getprofile/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const backendProfile = profileRes.data.data;
                if (backendProfile?.selectedCategory && backendProfile?.selectedStack) {
                    // Profile exists, safe to continue
                    localStorage.setItem("selectedCategory", backendProfile.selectedCategory);
                    localStorage.setItem("selectedStack", backendProfile.selectedStack);
                } else {
                    toast.error("Please complete your profile first (Select Category & Stack)!");
                    router.push("/StudentProfile");
                    return;
                }
            } catch (err) {
                toast.error("Please complete your profile first!");
                router.push("/StudentProfile");
                return;
            }
        }

        const finalCategory = category || localStorage.getItem("selectedCategory");
        const finalStack = stack || localStorage.getItem("selectedStack");

        setLoading(true);

        try {
            const res = await axios.post(
                `${API_URL}/api/subscription/create-checkout-session`,
                {
                    userId,
                    priceId: "price_1S67HdJPsups4VGUOVUiWQmH",
                    subscriptionType: "monthly",
                    category: finalCategory,
                    stack: finalStack,
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
                throw new Error("Failed to create checkout session");
            }
        } catch (err) {
            const errorMessage =
                err instanceof AxiosError
                    ? err.response?.data?.message || err.message
                    : err instanceof Error
                        ? err.message
                        : "An unexpected error occurred";
            console.error("Subscription error:", errorMessage);
            toast.error(errorMessage, { position: "top-right" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold text-[#0D4C5B] mb-8">Settings</h1>
            
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 max-w-2xl">
                <div className="flex items-center gap-3 mb-6">
                    <CreditCard className="w-6 h-6 text-[#1887A1]" />
                    <h2 className="text-xl font-semibold text-gray-800">Subscription & Billing</h2>
                </div>

                {isPremium ? (
                    <div className="bg-linear-to-br from-[#1887A1]/5 to-[#0D4C5B]/5 rounded-2xl p-8 border-2 border-[#1887A1]/30">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-8">
                            <div className="w-16 h-16 bg-linear-to-br from-yellow-400 to-amber-600 rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 transition-all duration-300">
                                <CheckCircle2 className="w-10 h-10 text-white" />
                            </div>
                            <div>
                                <div className="inline-flex items-center px-3 py-1 bg-amber-100 text-amber-700 text-xs font-bold rounded-full uppercase tracking-wider mb-2">
                                    Achieved Premium Status
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900">Active Membership</h3>
                                <p className="text-gray-600 mt-1">Full access to expert guidance and courses.</p>
                            </div>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4 mb-8">
                            {[
                                "Unlimited Course Access",
                                "1-on-1 Personalized Mentorship",
                                "AI-Assisted Learning Tools",
                                "Priority Career Support",
                                "Downloadable Resources",
                                "Certificate Verification"
                            ].map((feature, i) => (
                                <div key={i} className="flex items-center gap-3 bg-white p-3 rounded-xl border border-teal-50 shadow-xs">
                                    <div className="w-5 h-5 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center shrink-0">
                                        <CheckCircle2 className="w-3.5 h-3.5" />
                                    </div>
                                    <span className="text-sm font-medium text-gray-700">{feature}</span>
                                </div>
                            ))}
                        </div>

                        <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-[#1887A1]/10 text-center">
                            <p className="text-sm text-gray-500">Subscription managed securely through Stripe Billing System.</p>
                        </div>
                    </div>
                ) : (
                    <div className="bg-linear-to-br from-[#1887A1]/5 to-[#0D4C5B]/5 rounded-xl p-6 border border-[#1887A1]/20">
                        <div className="flex items-start gap-4 mb-6">
                            <AlertCircle className="w-8 h-8 text-[#1887A1] mt-1" />
                            <div>
                                <h3 className="text-lg font-bold text-gray-800">You are on the Free Plan</h3>
                                <p className="text-gray-600 mt-2">
                                    Upgrade to premium to unlock all features, tailored mentorship, and premium content to fast-track your learning journey.
                                </p>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg p-5 mb-6 border border-gray-100 shadow-sm">
                            <h4 className="font-semibold text-gray-800 mb-3">Premium Benefits:</h4>
                            <ul className="space-y-2 text-gray-600">
                                <li className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#1887A1]" /> Access to all courses & quizzes
                                </li>
                                <li className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#1887A1]" /> 1-on-1 personalized mentorship
                                </li>
                                <li className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#1887A1]" /> Priority doubt clearing & support
                                </li>
                            </ul>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center justify-between bg-white rounded-xl p-4 border border-teal-100 shadow-sm">
                            <div className="mb-4 sm:mb-0">
                                <p className="text-sm text-gray-500 font-medium">Monthly Plan</p>
                                <p className="text-2xl font-bold text-[#0D4C5B]">₹2999 <span className="text-sm text-gray-500 font-normal">/ month</span></p>
                            </div>
                            <button
                                onClick={handleSubscribe}
                                disabled={loading}
                                className="w-full sm:w-auto cursor-pointer px-8 py-3 bg-linear-to-r from-[#1887A1] to-[#0D4C5B] hover:opacity-90 disabled:opacity-50 text-white font-semibold rounded-lg shadow-md transition-all duration-300 transform active:scale-95 flex items-center justify-center gap-2"
                            >
                                {loading && (
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                )}
                                {loading ? "Processing..." : "Subscribe"}
                            </button>
                        </div>
                    </div>
                )}
            </div>
            <ToastContainer />
        </div>
    );
}
