"use client";

import Link from "next/link";

export default function CancelPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-2xl font-bold text-red-500">❌ Payment canceled</h1>
            <p className="mt-4">No worries, you can try again anytime.</p>
            <Link href="/subscription">
                <button className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg">
                    Go Back to Subscription
                </button>
            </Link>
        </div>
    );
}
