"use client";

import { useState } from "react";
import { useAppSelector } from "@/redux/hooks";

export default function SubscriptionPage() {
    const [loading, setLoading] = useState(false);

    const profile = useAppSelector((state) => state.profile);
    const { selectedCategory, selectedStack } = profile;

    const handleSubscribe = async () => {
        if (!selectedCategory || !selectedStack) {
            alert("Please select a course category and stack first!");
            return;
        }

        setLoading(true);

        try {
            localStorage.setItem("selectedCategory", selectedCategory);
            localStorage.setItem("selectedStack", selectedStack);

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/subscription/create-checkout-session`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                    body: JSON.stringify({
                        priceId: "price_1S67HdJPsups4VGUOVUiWQmH",
                        subscriptionType: "monthly",
                        category: selectedCategory,
                        stack: selectedStack,
                    }),
                }
            );

            const data = await res.json();

            if (data.url) {
                window.location.href = data.url;
            } else {
                console.error("No URL returned:", data);
                alert("Failed to create checkout session");
            }
        } catch (err) {
            console.error("Error:", err);
            alert("Something went wrong");
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
            </div>
        </div>
    );
}
