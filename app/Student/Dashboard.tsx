"use client";
import React, { useState, useEffect } from "react";
import { Bell, Award, BookOpen, Target, Zap, Trophy, Star, Calendar, Clock, TrendingUp } from "lucide-react";

const Dashboard = () => {
    const [animateProgress, setAnimateProgress] = useState(false);
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setTimeout(() => setAnimateProgress(true), 500);
        const timeInterval = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => {
            clearTimeout(timer);
            clearInterval(timeInterval);
        };
    }, []);

    const badges = [
        { icon: BookOpen, name: "First Course", earned: true, color: "from-blue-400 to-blue-600" },
        { icon: Target, name: "Goal Achiever", earned: true, color: "from-green-400 to-green-600" },
        { icon: Zap, name: "Speed Learner", earned: true, color: "from-yellow-400 to-yellow-600" },
        { icon: Trophy, name: "Top Performer", earned: true, color: "from-purple-400 to-purple-600" },
        { icon: Star, name: "Streak Master", earned: false, color: "from-pink-400 to-pink-600" },
        { icon: Award, name: "Expert", earned: false, color: "from-indigo-400 to-indigo-600" }
    ];

    return (

        <div className="min-h-screen bg-gradient-to-br from-[#1887A1] to-[#0D4C5B] relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0">
                <div className="absolute top-20 left-10 w-32 h-32 bg-white/5 rounded-full blur-xl animate-pulse"></div>
                <div className="absolute top-40 right-20 w-24 h-24 bg-white/10 rounded-full blur-lg animate-bounce"></div>
                <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-white/5 rounded-full blur-md animate-pulse delay-1000"></div>
            </div>

            <div className="relative z-10 p-3 sm:p-4 lg:p-6 h-full flex flex-col">
                {/* Header Section */}
                <div className="flex items-center justify-between mb-4 sm:mb-6 animate-fade-in">
                    <div className="text-white flex-1">
                        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-1 sm:mb-2 animate-slide-down">
                            Welcome back, Faizy! 👋
                        </h2>
                        <p className="text-white/90 text-sm sm:text-base font-medium hidden sm:block animate-slide-down delay-200">
                            Ready to continue your amazing learning journey?
                        </p>
                        <p className="text-white/70 text-xs sm:text-sm mt-1 animate-slide-down delay-300">
                            {currentTime.toLocaleString('en-US', { 
                                weekday: 'long', 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                            })}
                        </p>
                    </div>


                    <div className="flex items-center space-x-2 sm:space-x-4 animate-slide-left">
                        {/* Notification Bell */}
                        <div className="relative group">
                            <div className="p-2 sm:p-3 bg-white/20 rounded-xl hover:bg-white/30 transition-all duration-300 cursor-pointer backdrop-blur-sm hover:scale-105 transform">
                                <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-white animate-pulse" />
                            </div>
                            <div className="absolute -top-1 -right-1 bg-gradient-to-r from-red-400 to-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-white animate-bounce">
                                2
                            </div>
                        </div>

                        {/* User Profile */}
                        <div className="flex items-center space-x-2 bg-white/20 rounded-xl pl-2 pr-3 py-2 hover:bg-white/30 transition-all duration-300 cursor-pointer backdrop-blur-sm hover:scale-105 transform group">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-white to-gray-100 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                                <span className="text-[#1887A1] font-bold text-sm sm:text-base">
                                    F
                                </span>
                            </div>
                            <span className="text-white font-semibold text-sm sm:text-base hidden sm:block">
                                Faizy
                            </span>
                        </div>
                    </div>
                </div>

                {/* Dashboard Body */}
                <div className="flex-1 grid grid-rows-1 lg:grid-rows-2 gap-4 sm:gap-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                        {/* Learning Progress Card */}
                        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-1 animate-slide-up">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg sm:text-xl font-bold text-gray-800 flex items-center gap-2">
                                    <TrendingUp className="w-5 h-5 text-[#1887A1]" />
                                    Learning Progress
                                </h3>
                                <span className="text-xs bg-gradient-to-r from-[#1887A1] to-[#0D4C5B] text-white px-3 py-1 rounded-full font-semibold">
                                    Level 8
                                </span>
                            </div>

                            {/* Circular Progress Chart */}
                            <div className="flex items-center justify-center mb-6">

                                <div className="relative">
                                    <svg
                                        className="w-28 h-28 sm:w-32 sm:h-32 transform -rotate-90"
                                        viewBox="0 0 120 120"
                                    >
                                        <circle
                                            cx="60"
                                            cy="60"
                                            r="50"
                                            stroke="#f1f5f9"
                                            strokeWidth="6"
                                            fill="none"
                                        />
                                        <circle
                                            cx="60"
                                            cy="60"
                                            r="50"
                                            stroke="url(#progressGradient)"
                                            strokeWidth="6"
                                            fill="none"
                                            strokeDasharray={`${animateProgress ? 78 * 3.14 : 0} ${(100 - 78) * 3.14}`}
                                            strokeLinecap="round"
                                            className="transition-all duration-2000 ease-out"
                                        />
                                        <defs>
                                            <linearGradient
                                                id="progressGradient"
                                                x1="0%"
                                                y1="0%"
                                                x2="100%"
                                                y2="0%"
                                            >
                                                <stop offset="0%" stopColor="#1887A1" />
                                                <stop offset="50%" stopColor="#14B8A6" />
                                                <stop offset="100%" stopColor="#0D4C5B" />
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="text-center">
                                            <span className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[#1887A1] to-[#0D4C5B] bg-clip-text text-transparent">
                                                78%
                                            </span>
                                            <p className="text-xs text-gray-600 font-medium">Complete</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Progress Stats */}
                            <div className="grid grid-cols-3 gap-4 text-center">
                                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-3 hover:scale-105 transition-all duration-300">
                                    <div className="text-xs text-gray-600 mb-1">Courses</div>
                                    <div className="font-bold text-lg text-gray-800">12/15</div>
                                    <div className="text-xs text-blue-600 font-semibold">Completed</div>
                                </div>
                                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-3 hover:scale-105 transition-all duration-300">
                                    <div className="text-xs text-gray-600 mb-1">Study Days</div>
                                    <div className="font-bold text-lg text-gray-800">7</div>
                                    <div className="text-xs text-green-600 font-semibold">This Week</div>
                                </div>
                                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-3 hover:scale-105 transition-all duration-300">
                                    <div className="text-xs text-gray-600 mb-1">Hours</div>
                                    <div className="font-bold text-lg text-gray-800">12</div>
                                    <div className="text-xs text-purple-600 font-semibold">This Month</div>
                                </div>
                            </div>
                        </div>

                        {/* Upcoming Events Card */}
                        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-1 animate-slide-up delay-200">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg sm:text-xl font-bold text-gray-800 flex items-center gap-2">
                                    <Calendar className="w-5 h-5 text-[#1887A1]" />
                                    Upcoming Events
                                </h3>
                                <span className="text-xs bg-orange-100 text-orange-600 px-3 py-1 rounded-full font-semibold animate-pulse">
                                    3 Today
                                </span>
                            </div>

                            <div className="space-y-3">
                                {[
                                    {
                                        title: ".NET Workshop",
                                        subtitle: "Live Interactive Session",
                                        time: "2:00pm",
                                        color: "from-teal-500 to-cyan-500",
                                        icon: BookOpen,
                                        urgent: false
                                    },
                                    {
                                        title: "Assignment Due",
                                        subtitle: "Data Structures & Algorithms",
                                        time: "4:30pm",
                                        color: "from-orange-500 to-red-500",
                                        icon: Clock,
                                        urgent: true
                                    },
                                    {
                                        title: "Mock Interview",
                                        subtitle: "Career Preparation Session",
                                        time: "Tomorrow",
                                        color: "from-purple-500 to-indigo-500",
                                        icon: Target,
                                        urgent: false
                                    },
                                ].map((event, index) => (
                                    <div
                                        key={index}
                                        className={`bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-3 hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 border-l-4 border-transparent hover:border-[#1887A1] group cursor-pointer transform hover:scale-102 ${event.urgent ? 'animate-pulse' : ''}`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3 flex-1">
                                                <div className={`p-2 bg-gradient-to-r ${event.color} rounded-lg group-hover:scale-110 transition-all duration-300`}>
                                                    <event.icon className="w-4 h-4 text-white" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <span className="font-semibold text-gray-800 text-sm block truncate">
                                                        {event.title}
                                                    </span>
                                                    <div className="text-xs text-gray-600 truncate">
                                                        {event.subtitle}
                                                    </div>
                                                </div>
                                            </div>
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${event.color} text-white whitespace-nowrap`}>
                                                {event.time}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Bottom Row - Your Progress Card */}
                    <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-1 animate-slide-up delay-400">
                        <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                            <Trophy className="w-5 h-5 text-[#1887A1]" />
                            Your Achievements
                        </h3>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* XP Progress Bar */}
                            <div className="lg:col-span-1 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-4">
                                <div className="flex justify-between items-center mb-3">
                                    <span className="font-bold text-xl bg-gradient-to-r from-[#1887A1] to-[#0D4C5B] bg-clip-text text-transparent">
                                        2,480 XP
                                    </span>
                                    <span className="text-gray-600 text-sm">
                                        520 XP to Level 9
                                    </span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner overflow-hidden">
                                    <div
                                        className={`bg-gradient-to-r from-[#1887A1] to-[#0D4C5B] h-3 rounded-full shadow-lg transition-all duration-2000 ease-out ${animateProgress ? 'animate-pulse' : ''}`}
                                        style={{ width: animateProgress ? "82%" : "0%" }}
                                    ></div>
                                </div>
                                <p className="text-xs text-gray-600 mt-2 text-center">Keep going! You&apos;re doing amazing!</p>
                            </div>

                            {/* Badges Earned */}
                            <div className="lg:col-span-1 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-4">
                                <h4 className="font-semibold text-base text-gray-800 mb-3 flex items-center gap-2">
                                    <Award className="w-4 h-4 text-orange-500" />
                                    Badges Earned ({badges.filter(b => b.earned).length}/{badges.length})
                                </h4>
                                <div className="grid grid-cols-3 gap-2">
                                    {badges.map((badge, index) => (
                                        <div
                                            key={index}
                                            className={`relative group cursor-pointer ${badge.earned ? 'animate-bounce' : ''}`}
                                            style={{ animationDelay: `${index * 200}ms` }}
                                        >
                                            <div
                                                className={`w-12 h-12 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 flex items-center justify-center ${
                                                    badge.earned 
                                                        ? `bg-gradient-to-br ${badge.color}` 
                                                        : 'bg-gray-200 opacity-50'
                                                }`}
                                            >
                                                <badge.icon className={`w-6 h-6 ${badge.earned ? 'text-white' : 'text-gray-400'}`} />
                                            </div>
                                            {/* Tooltip */}
                                            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-10">
                                                {badge.name}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Monthly Streaks */}
                            <div className="lg:col-span-1 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4">
                                <h4 className="font-semibold text-base text-gray-800 mb-3 flex items-center gap-2">
                                    <Zap className="w-4 h-4 text-green-500" />
                                    Study Streak
                                </h4>
                                <div className="flex justify-center space-x-2 mb-3">
                                    {["M", "T", "W", "T", "F", "S", "S"].map((day, index) => (
                                        <div
                                            key={index}
                                            className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                                                index < 4
                                                    ? "bg-gradient-to-br from-[#1887A1] to-[#0D4C5B] text-white shadow-lg hover:shadow-xl transform hover:scale-110 animate-pulse"
                                                    : "bg-gray-200 text-gray-500 hover:bg-gray-300"
                                            }`}
                                            style={{ animationDelay: `${index * 100}ms` }}
                                        >
                                            {day}
                                        </div>
                                    ))}
                                </div>
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-[#1887A1] mb-1">4</p>
                                    <p className="text-xs text-gray-600">Days Streak 🔥</p>
                                    <p className="text-xs text-green-600 font-semibold mt-2">Great consistency!</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes fade-in {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes slide-down {
                    from { transform: translateY(-20px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
                @keyframes slide-up {
                    from { transform: translateY(20px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
                @keyframes slide-left {
                    from { transform: translateX(20px); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                .animate-fade-in {
                    animation: fade-in 1s ease-out;
                }
                .animate-slide-down {
                    animation: slide-down 0.6s ease-out;
                }
                .animate-slide-up {
                    animation: slide-up 0.6s ease-out;
                }
                .animate-slide-left {
                    animation: slide-left 0.6s ease-out;
                }
                .delay-200 {
                    animation-delay: 0.2s;
                }
                .delay-300 {
                    animation-delay: 0.3s;
                }
                .delay-400 {
                    animation-delay: 0.4s;
                }
                .delay-1000 {
                    animation-delay: 1s;
                }
                .duration-2000 {
                    animation-duration: 2s;
                }
            `}</style>
        </div>
    );
};

export default Dashboard;