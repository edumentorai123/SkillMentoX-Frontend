"use client";
import React from "react";
import { Bell } from "lucide-react";

const Dashboard = () => {
    return (
        <div className="min-h-screen bg-blue-500">
            <div className="p-3 sm:p-4 lg:p-6 h-full flex flex-col">
                {/* Header Section */}
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                    <div className="text-white flex-1">
                        <h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-1 sm:mb-2">
                            Welcome back, Faizy
                        </h2>
                        <p className="text-teal-100 text-sm sm:text-base font-medium hidden sm:block">
                            Ready to continue your learning journey?
                        </p>
                    </div>

                    <div className="flex items-center space-x-2 sm:space-x-4">
                        {/* Notification Bell */}
                        <div className="relative">
                            <div className="p-2 sm:p-2.5 bg-amber-500 bg-opacity-20 rounded-full hover:bg-opacity-30 transition-all duration-200 cursor-pointer">
                                <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                            </div>
                            <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center border-2 border-white">
                                2
                            </div>
                        </div>

                        {/* User Profile */}
                        <div className="flex items-center space-x-1 sm:space-x-2 bg-white bg-opacity-20 rounded-full pl-1.5 sm:pl-2 pr-2 sm:pr-3 py-1 sm:py-1.5 hover:bg-opacity-30 transition-all duration-200 cursor-pointer">
                            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-full flex items-center justify-center shadow-lg">
                                <span className="text-black font-bold text-xs sm:text-sm">
                                    F
                                </span>
                            </div>
                            <span className="text-black font-semibold text-xs sm:text-base hidden sm:block">
                                Faizy
                            </span>
                        </div>
                    </div>
                </div>

                {/* Dashboard Body */}
                <div className="flex-1 grid grid-rows-1 lg:grid-rows-2 gap-3 sm:gap-4 lg:gap-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
                        {/* Learning Progress Card */}
                        <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-5 shadow-xl hover:shadow-2xl transition-all duration-300">
                            <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-3 sm:mb-4">
                                Your Learning Progress
                            </h3>

                            {/* Circular Progress Chart */}
                            <div className="flex items-center justify-center mb-3 sm:mb-4">
                                <div className="relative">
                                    <svg
                                        className="w-20 h-20 sm:w-24 sm:h-24 transform -rotate-90"
                                        viewBox="0 0 120 120"
                                    >
                                        <circle
                                            cx="60"
                                            cy="60"
                                            r="45"
                                            stroke="#f3f4f6"
                                            strokeWidth="8"
                                            fill="none"
                                        />
                                        <circle
                                            cx="60"
                                            cy="60"
                                            r="45"
                                            stroke="url(#gradient)"
                                            strokeWidth="8"
                                            fill="none"
                                            strokeDasharray={`${78 * 2.83} ${(100 - 78) * 2.83}`}
                                            strokeLinecap="round"
                                        />
                                        <defs>
                                            <linearGradient
                                                id="gradient"
                                                x1="0%"
                                                y1="0%"
                                                x2="100%"
                                                y2="0%"
                                            >
                                                <stop offset="0%" stopColor="#0d9488" />
                                                <stop offset="100%" stopColor="#06b6d4" />
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                                            78%
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Progress Stats */}
                            <div className="grid grid-cols-3 gap-2 sm:gap-3 text-center">
                                <div>
                                    <div className="text-xs text-gray-500 mb-1">Courses</div>
                                    <div className="text-xs text-gray-500 mb-1 sm:mb-2">
                                        Completed
                                    </div>
                                    <div className="font-bold text-sm sm:text-lg text-gray-800">
                                        12/15
                                    </div>
                                </div>
                                <div className="border-x border-gray-200">
                                    <div className="text-xs text-gray-500 mb-1">Study Days</div>
                                    <div className="text-xs text-gray-500 mb-1 sm:mb-2"></div>
                                    <div className="font-bold text-sm sm:text-lg text-gray-800">
                                        7
                                    </div>
                                    <div className="text-xs text-gray-500">days</div>
                                </div>
                                <div>
                                    <div className="text-xs text-gray-500 mb-1">Time Spent</div>
                                    <div className="text-xs text-gray-500 mb-1 sm:mb-2"></div>
                                    <div className="font-bold text-sm sm:text-lg text-gray-800">
                                        12
                                    </div>
                                    <div className="text-xs text-gray-500">hours</div>
                                </div>
                            </div>
                        </div>

                        {/* Upcoming Events Card */}
                        <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-5 shadow-xl hover:shadow-2xl transition-all duration-300">
                            <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-3 sm:mb-4">
                                Upcoming Events
                            </h3>

                            <div className="space-y-2 sm:space-y-3">
                                {[
                                    {
                                        title: "Net Workshop",
                                        subtitle: "Live Session",
                                        time: "2:00pm",
                                        color: "teal",
                                    },
                                    {
                                        title: "Assignment Due",
                                        subtitle: "Data Structures",
                                        time: "4:30pm",
                                        color: "orange",
                                    },
                                    {
                                        title: "Mock Interview",
                                        subtitle: "Career preparation",
                                        time: "Tomorrow",
                                        color: "purple",
                                    },
                                ].map((event, index) => (
                                    <div
                                        key={index}
                                        className="bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg sm:rounded-xl p-2 sm:p-3 hover:from-teal-50 hover:to-cyan-50 transition-all duration-200"
                                    >
                                        <div className="flex justify-between items-start">
                                            <div className="flex-1 min-w-0">
                                                <span className="font-semibold text-gray-800 text-xs sm:text-sm block truncate">
                                                    {event.title}
                                                </span>
                                                <div className="text-xs text-gray-600 mt-0.5 truncate">
                                                    {event.subtitle}
                                                </div>
                                            </div>
                                            <span
                                                className={`
                                                    px-2 py-1 rounded-full text-xs font-semibold whitespace-nowrap ml-2 flex-shrink-0
                                                    ${event.color === "teal" ? "bg-teal-100 text-teal-700" : ""}
                                                    ${event.color === "orange" ? "bg-orange-100 text-orange-700" : ""}
                                                    ${event.color === "purple" ? "bg-purple-100 text-purple-700" : ""}
                                                `}
                                            >
                                                {event.time}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Bottom Row - Your Progress Card */}
                    <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-5 shadow-xl hover:shadow-2xl transition-all duration-300">
                        <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-3 sm:mb-4">
                            Your Progress
                        </h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
                            {/* XP Progress Bar */}
                            <div className="sm:col-span-2 lg:col-span-1">
                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2 sm:mb-3">
                                    <span className="font-bold text-lg sm:text-xl bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                                        2,480 XP
                                    </span>
                                    <span className="text-gray-600 text-xs sm:text-sm mt-1 sm:mt-0">
                                        520 XP to next level
                                    </span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2 sm:h-3 shadow-inner">
                                    <div
                                        className="bg-gradient-to-r from-teal-500 to-cyan-500 h-2 sm:h-3 rounded-full shadow-lg transition-all duration-500"
                                        style={{ width: "82%" }}
                                    ></div>
                                </div>
                            </div>

                            {/* Badges Earned */}
                            <div className="lg:col-span-1">
                                <h4 className="font-semibold text-sm sm:text-base text-gray-800 mb-2 sm:mb-3">
                                    Badges Earned
                                </h4>
                                <div className="flex space-x-1 sm:space-x-2 overflow-x-auto pb-2">
                                    {[1, 2, 3, 4, 5, 6].map((badge, index) => (
                                        <div
                                            key={index}
                                            className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex-shrink-0"
                                        ></div>
                                    ))}
                                </div>
                            </div>

                            {/* Monthly Streaks */}
                            <div className="lg:col-span-1">
                                <h4 className="font-semibold text-sm sm:text-base text-gray-800 mb-2 sm:mb-3">
                                    Monthly Streaks
                                </h4>
                                <div className="flex space-x-1 sm:space-x-2 mb-2 overflow-x-auto pb-2">
                                    {["M", "T", "W", "T", "F", "S", "S"].map((day, index) => (
                                        <div
                                            key={index}
                                            className={`w-6 h-6 sm:w-7 sm:h-7 rounded-md sm:rounded-lg flex items-center justify-center text-xs font-bold transition-all duration-200 flex-shrink-0 ${
                                                index < 4
                                                    ? "bg-gradient-to-br from-teal-500 to-cyan-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105"
                                                    : "bg-gray-200 text-gray-500 hover:bg-gray-300"
                                            }`}
                                        >
                                            {day}
                                        </div>
                                    ))}
                                </div>
                                <p className="text-teal-600 font-semibold text-xs sm:text-sm">
                                    4 days Streaks
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;