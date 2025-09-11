"use client";

import { useState } from "react";

export default function SubscriptionPage() {
    const [loading, setLoading] = useState(false);

    const handleSubscribe = async () => {
        setLoading(true);

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/subscription/create-checkout-session`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({
                    priceId: "price_1S67HdJPsups4VGUOVUiWQmH",
                }),
            });

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
        <div style={{ padding: "2rem" }}>
            <h1>Subscribe to Premium</h1>
            <button onClick={handleSubscribe} disabled={loading}>
                {loading ? "Processing..." : "Subscribe Now"}
            </button>
        </div>
    );
}
