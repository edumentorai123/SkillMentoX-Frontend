import React from "react";

interface Student {
    _id?: string;
    userId?: string;
    name: string;
    email?: string;
    location?: string;
    phone?: string;
    educationLevel?: string;
    selectedCategory?: string;
    selectedStack?: string;
    avatar?: string;
    isSubscribed?: boolean;
    subscriptionType?: string;
    subscriptionStart?: string;
    subscriptionEnd?: string;
    stripeCustomerId?: string;
    subscriptionId?: string;
    createdAt?: string;
    updatedAt?: string;
    __v?: number;
}

interface HeaderProps {
    student: Student | null;
    currentTime: Date;
    getSubscriptionStatus: () => boolean;
}

const Header: React.FC<HeaderProps> = ({ student, currentTime, getSubscriptionStatus }) => {
    return (
        <div className="text-white flex-1">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-1 sm:mb-2">
                Welcome back, {student?.name || "Unknown User"}
            </h2>
            <p className="text-white/90 text-sm sm:text-base font-medium hidden sm:block animate-slide-down delay-200">
                Ready to continue your amazing learning journey?
            </p>
            <p className="text-white/70 text-xs sm:text-sm mt-1 animate-slide-down delay-300">
                {currentTime.toLocaleString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                })}
            </p>
            <div className="flex items-center gap-2 mt-2 animate-slide-down delay-400">
                <div
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getSubscriptionStatus()
                            ? "bg-green-500/20 text-green-300 border border-green-400/30"
                            : "bg-red-500/20 text-red-300 border border-red-400/30"
                        }`}
                >
                    {getSubscriptionStatus() ? "Subscribed" : "Not Subscribed"}
                </div>
            </div>
        </div>
    );
};

export default Header;