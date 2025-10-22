"use client";

import React, { useEffect, useState } from "react";

interface Mentor {
    _id: string;
    name: string;
    email: string;
    subject: string;
    expertise: string[];
    status: string;
    joinDate: string;
    lastActive: string;
    totalSessions: number;
    rating: number;
    studentsHelped: number;
    avatar: string;
    verified: boolean;
}

const Mentors = () => {
    const [mentors, setMentors] = useState<Mentor[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMentors = async () => {
            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/getAllmentors`
                );
                const result = await res.json();
                console.log("Fetched mentors:", result);
                if (result.success) {
                    setMentors(result.data);
                }
            } catch (err) {
                console.error("Error fetching mentors:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchMentors();
    }, []);

    if (loading) return <p className="text-center py-20 text-gray-600 text-lg">Loading mentors...</p>;

    return (
        <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Our Top Mentors</h2>
                {mentors.length > 0 ? (
                    <div className="grid md:grid-cols-3 gap-8">
                        {mentors.map((mentor) => (
                            <div
                                key={mentor._id}
                                className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className="w-16 h-16 bg-[#1887A1] rounded-full flex items-center justify-center text-white text-2xl font-semibold">
                                        {mentor.avatar}
                                    </div>
                                    {mentor.verified && (
                                        <span className="text-green-500 flex items-center gap-1 text-sm font-medium">
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                <path
                                                    fillRule="evenodd"
                                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            Verified
                                        </span>
                                    )}
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900">{mentor.name}</h3>
                                <p className="text-gray-500 text-sm mb-2">{mentor.email}</p>
                                <p className="text-gray-700 font-medium">{mentor.subject}</p>
                                <div className="mt-3">
                                    <p className="text-sm text-gray-600">
                                        <span className="font-medium">Expertise:</span>{" "}
                                        {mentor.expertise.join(", ") || "Not specified"}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        <span className="font-medium">Status:</span>{" "}
                                        <span
                                            className={`capitalize ${
                                                mentor.status === "approved"
                                                    ? "text-green-600"
                                                    : mentor.status === "pending"
                                                    ? "text-yellow-600"
                                                    : "text-red-600"
                                            }`}
                                        >
                                            {mentor.status}
                                        </span>
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        <span className="font-medium">Rating:</span>{" "}
                                        {mentor.rating.toFixed(1)} / 5
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        <span className="font-medium">Sessions:</span> {mentor.totalSessions}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        <span className="font-medium">Students Helped:</span>{" "}
                                        {mentor.studentsHelped}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        <span className="font-medium">Joined:</span>{" "}
                                        {new Date(mentor.joinDate).toLocaleDateString()}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        <span className="font-medium">Last Active:</span> {mentor.lastActive}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-600 text-lg">No mentors available at the moment.</p>
                )}
            </div>
        </section>
    );
};

export default Mentors;