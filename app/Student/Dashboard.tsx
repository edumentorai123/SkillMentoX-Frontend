"use client";
import React, { useState, useEffect, useRef } from "react";
import { Award, BookOpen, Target, Zap, Trophy, Star, Calendar, Clock, TrendingUp, Loader2, User } from "lucide-react";
import axiosClient from "../lib/axiosClient";
import { AxiosError } from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";

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
}

interface Progress {
    completionPercentage: number;
    level: number;
    coursesCompleted: number;
    totalCourses: number;
    studyDaysThisWeek: number;
    hoursThisMonth: number;
    xp: number;
    xpToNextLevel: number;
}

interface Event {
    title: string;
    subtitle: string;
    time: string;
    color: string;
    icon: typeof BookOpen | typeof Clock | typeof Target;
    urgent: boolean;
}

interface Badge {
    icon: typeof BookOpen | typeof Target | typeof Zap | typeof Trophy | typeof Star | typeof Award;
    name: string;
    earned: boolean;
    color: string;
}

interface Streak {
    currentStreak: number;
    days: boolean[];
}

interface ApiResponse<T> {
    data: T;
    message?: string;
}

interface EventApiResponse {
    title: string;
    subtitle: string;
    time: string;
    color: string;
    iconName: "BookOpen" | "Clock" | "Target";
    urgent: boolean;
}

interface BadgeApiResponse {
    name: string;
    earned: boolean;
    color: string;
    iconName: "BookOpen" | "Target" | "Zap" | "Trophy" | "Star" | "Award";
}

const Dashboard = () => {
    const [animateProgress, setAnimateProgress] = useState(false);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [student, setStudent] = useState<Student | null>(null);
    const [progress, setProgress] = useState<Progress | null>(null);
    const [events, setEvents] = useState<Event[]>([]);
    const [badges, setBadges] = useState<Badge[]>([]);
    const [streak, setStreak] = useState<Streak | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [profileForm, setProfileForm] = useState<Partial<Student>>({});
    const profileRef = useRef<HTMLDivElement>(null);

    const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL as string;

    // Get user ID from localStorage (AuthRedirect ensures authentication)
    const getUserId = () => {
        const storedUser = localStorage.getItem("user");
        if (!storedUser) return null;

        try {
            const user = JSON.parse(storedUser);
            return user.userId || user._id;
        } catch (err) {
            console.error("Error parsing user data:", err);
            return null;
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => setAnimateProgress(true), 500);
        const timeInterval = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => {
            clearTimeout(timer);
            clearInterval(timeInterval);
        };
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
                setIsProfileOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            setLoading(true);
            const userId = getUserId();

            if (!userId) {
                setError("User not logged in. Please login again.");
                toast.error("User not logged in. Please login again.", {
                    position: "top-right",
                    autoClose: 5000,
                    theme: "colored",
                });
                setTimeout(() => {
                    if (isMounted) window.location.href = "/loginForm";
                }, 2000);
                return;
            }

            try {
                const token = localStorage.getItem("token");

                const fetchProfile = async () => {
                    try {
                        const profileRes = await axiosClient.get<ApiResponse<Student>>(
                            `${API_URL}/api/students/getprofile/${userId}`,
                            { headers: { Authorization: `Bearer ${token}` } }
                        );
                        setStudent(profileRes.data.data);
                        setProfileForm(profileRes.data.data);
                    } catch (err) {
                        console.error("Failed to fetch profile:", err);
                        setError("Failed to fetch profile");
                        toast.error("Failed to fetch profile", {
                            position: "top-right",
                            autoClose: 5000,
                            theme: "colored",
                        });
                    }
                };

                const fetchProgress = async () => {
                    try {
                        const progressRes = await axiosClient.get<ApiResponse<Progress>>(
                            `${API_URL}/api/students/progress/${userId}`,
                            { headers: { Authorization: `Bearer ${token}` } }
                        );
                        setProgress(progressRes.data.data);
                    } catch (err) {
                        console.error("Progress fetch failed:", err);
                    }
                };

                const fetchEvents = async () => {
                    try {
                        const eventsRes = await axiosClient.get<ApiResponse<EventApiResponse[]>>(
                            `${API_URL}/api/events/upcoming`,
                            { headers: { Authorization: `Bearer ${token}` } }
                        );
                        setEvents(
                            eventsRes.data.data.map((ev) => ({
                                ...ev,
                                icon: ev.iconName === "BookOpen" ? BookOpen : ev.iconName === "Clock" ? Clock : Target,
                            }))
                        );
                    } catch (err) {
                        console.error("Events fetch failed:", err);
                        setEvents([]);
                    }
                };

                const fetchBadges = async () => {
                    try {
                        const badgesRes = await axiosClient.get<ApiResponse<BadgeApiResponse[]>>(
                            `${API_URL}/api/achievements/badges/${userId}`,
                            { headers: { Authorization: `Bearer ${token}` } }
                        );
                        setBadges(
                            badgesRes.data.data.map((b) => ({
                                ...b,
                                icon:
                                    b.iconName === "BookOpen"
                                        ? BookOpen
                                        : b.iconName === "Target"
                                        ? Target
                                        : b.iconName === "Zap"
                                        ? Zap
                                        : b.iconName === "Trophy"
                                        ? Trophy
                                        : b.iconName === "Star"
                                        ? Star
                                        : Award,
                            }))
                        );
                    } catch (err) {
                        console.error("Badges fetch failed:", err);
                        setBadges([]);
                    }
                };

                const fetchStreak = async () => {
                    try {
                        const streakRes = await axiosClient.get<ApiResponse<Streak>>(
                            `${API_URL}/api/streaks/${userId}`,
                            { headers: { Authorization: `Bearer ${token}` } }
                        );
                        setStreak(streakRes.data.data);
                    } catch (err) {
                        console.error("Streak fetch failed:", err);
                    }
                };

                await Promise.all([fetchProfile(), fetchProgress(), fetchEvents(), fetchBadges(), fetchStreak()]);
            } catch (err: unknown) {
                let errorMessage = "An unexpected error occurred";
                if (err instanceof AxiosError) {
                    errorMessage =
                        err.response?.data?.error || err.response?.data?.message || err.message || errorMessage;
                    console.error("API error:", {
                        status: err.response?.status,
                        url: err.config?.url,
                        data: err.response?.data,
                    });
                } else if (err instanceof Error) {
                    errorMessage = err.message;
                    console.error("General error:", err.message);
                }
                setError(errorMessage);
                toast.error(`Failed to fetch dashboard data: ${errorMessage}`, {
                    position: "top-right",
                    autoClose: 5000,
                    theme: "colored",
                });
            } finally {
                setLoading(false);
            }
        };

        fetchData();

        return () => {
            isMounted = false;
        };
    }, [API_URL]);

    // Handle profile form input changes
    const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProfileForm((prev) => ({ ...prev, [name]: value }));
    };

    // Handle profile update submission
    const handleProfileUpdate = async () => {
        const userId = getUserId();

        if (!userId) {
            toast.error("User not logged in. Please login again.", {
                position: "top-right",
                autoClose: 5000,
            });
            setTimeout(() => (window.location.href = "/loginForm"), 2000);
            return;
        }

        try {
            const token = localStorage.getItem("token");
            const updateRes = await axiosClient.put<ApiResponse<Student>>(
                `${API_URL}/api/students/updateprofile/${userId}`,
                profileForm,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setStudent(updateRes.data.data);
            localStorage.setItem("user", JSON.stringify(updateRes.data.data));
            toast.success("Profile updated successfully!", {
                position: "top-right",
                autoClose: 3000,
            });
            setIsProfileOpen(false);

            // Update auth.user if necessary
            const authData = JSON.parse(localStorage.getItem("auth") || "{}");
            if (authData.user) {
                authData.user = {
                    id: userId,
                    email: updateRes.data.data.email,
                    firstName: updateRes.data.data.name.split(" ")[0],
                    lastName: updateRes.data.data.name.split(" ").slice(1).join(" "),
                    role: authData.user.role,
                };
                authData.hasProfile = true;
                localStorage.setItem("auth", JSON.stringify(authData));
            }
        } catch (err: unknown) {
            let errorMessage = "Failed to update profile";
            if (err instanceof AxiosError) {
                errorMessage =
                    err.response?.data?.error || err.response?.data?.message || err.message || errorMessage;
                if (err.response?.status === 401) {
                    errorMessage = "Session expired. Please login again.";
                    setTimeout(() => (window.location.href = "/loginForm"), 2000);
                }
            } else if (err instanceof Error) {
                errorMessage = err.message;
            }
            toast.error(errorMessage, {
                position: "top-right",
                autoClose: 5000,
            });
        }
    };

    // Handle logout
    const handleLogout = () => {
        localStorage.clear(); // Clear all localStorage to avoid stale data
        window.location.href = "/loginForm";
    };

    // Handle progress initialization
    const handleInitializeProgress = async () => {
        const userId = getUserId();

        if (!userId) {
            toast.error("User not logged in. Please login again.", {
                position: "top-right",
                autoClose: 5000,
            });
            setTimeout(() => (window.location.href = "/loginForm"), 2000);
            return;
        }

        try {
            const token = localStorage.getItem("token");
            const res = await axiosClient.post<ApiResponse<Progress>>(
                `${API_URL}/api/students/progress/${userId}`,
                {
                    completionPercentage: 0,
                    level: 1,
                    coursesCompleted: 0,
                    totalCourses: 0,
                    studyDaysThisWeek: 0,
                    hoursThisMonth: 0,
                    xp: 0,
                    xpToNextLevel: 1000,
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setProgress(res.data.data);
            toast.success("Progress initialized!", {
                position: "top-right",
                autoClose: 3000,
            });
        } catch (err: unknown) {
            let errorMessage = "Failed to initialize progress";
            if (err instanceof AxiosError) {
                errorMessage =
                    err.response?.data?.error || err.response?.data?.message || err.message || errorMessage;
            } else if (err instanceof Error) {
                errorMessage = err.message;
            }
            toast.error(errorMessage, {
                position: "top-right",
                autoClose: 5000,
            });
        }
    };

    // Loading state
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="flex flex-col items-center">
                    <Loader2 className="w-8 h-8 text-[#1887A1] animate-spin" />
                    <p className="text-lg text-gray-600 mt-2">Loading your dashboard...</p>
                </div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="text-center">
                    <p className="text-lg text-red-600">Error: {error}</p>
                    <p className="text-sm text-gray-600 mt-2">Please try refreshing or contact support.</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-4 px-4 py-2 bg-gradient-to-r from-[#1887A1] to-[#0D4C5B] text-white text-sm font-semibold rounded-lg hover:scale-105 transition-all duration-300"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    // If no student data is available, show a fallback UI
    if (!student) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="text-center">
                    <p className="text-lg text-gray-600">No student profile found.</p>
                    <p className="text-sm text-gray-600 mt-2">Please set up your profile or contact support.</p>
                </div>
            </div>
        );
    }

    const daysOfWeek = ["M", "T", "W", "T", "F", "S", "S"];

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
                        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-1 sm:mb-2">
                            Welcome back, {student.name}
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
                    </div>


                    <div className="flex items-center space-x-2 sm:space-x-4 animate-slide-left">

                        {/* User Profile with Dropdown */}
                        <div className="relative" ref={profileRef}>
                            <div
                                className="flex items-center space-x-2 bg-white/20 rounded-full px-3 py-2 cursor-pointer backdrop-blur-md transition-all duration-300 group hover:bg-white/30 hover:shadow-lg hover:shadow-[#1887A1]/20"
                                onClick={() => setIsProfileOpen(!isProfileOpen)}
                            >
                                {/* Profile Avatar or Initial */}
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-white to-gray-100 flex items-center justify-center shadow-md group-hover:shadow-xl group-hover:scale-105 transition-all duration-300">
                                    {student.avatar ? (
                                        <Image
                                            src={student.avatar}
                                            alt="Profile"
                                            className="w-full h-full rounded-full object-cover"
                                        />
                                    ) : (
                                        <span className="text-[#1887A1] font-bold text-base">
                                            {student.name.charAt(0).toUpperCase()}
                                        </span>
                                    )}
                                </div>
                                <span className="text-white font-semibold text-sm sm:text-base hidden sm:block">
                                    {student.name}
                                </span>
                                {/* Chevron Icon */}
                                <svg
                                    className={`w-4 h-4 text-white transform transition-transform duration-300 ${isProfileOpen ? "rotate-180" : ""}`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>

                            {/* Profile Dropdown */}
                            {isProfileOpen && (
                                <div className="absolute right-0 mt-2 w-80 bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl p-6 z-20 animate-slide-down border border-gray-100/50">
                                    <div className="flex items-center gap-3 mb-4">
                                        <User className="w-6 h-6 text-[#1887A1]" />
                                        <h4 className="text-lg font-bold text-gray-800">Edit Profile</h4>
                                    </div>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="text-sm text-gray-600 font-medium">Name</label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={profileForm.name || ""}
                                                onChange={handleProfileChange}
                                                className="w-full p-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1887A1] transition-all duration-300"
                                                placeholder="Enter your name"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-sm text-gray-600 font-medium">Email</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={profileForm.email || ""}
                                                onChange={handleProfileChange}
                                                className="w-full p-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1887A1] transition-all duration-300"
                                                placeholder="Enter your email"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-sm text-gray-600 font-medium">Location</label>
                                            <input
                                                type="text"
                                                name="location"
                                                value={profileForm.location || ""}
                                                onChange={handleProfileChange}
                                                className="w-full p-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1887A1] transition-all duration-300"
                                                placeholder="Enter your location"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-sm text-gray-600 font-medium">Phone</label>
                                            <input
                                                type="text"
                                                name="phone"
                                                value={profileForm.phone || ""}
                                                onChange={handleProfileChange}
                                                className="w-full p-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1887A1] transition-all duration-300"
                                                placeholder="Enter your phone"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-sm text-gray-600 font-medium">Education Level</label>
                                            <input
                                                type="text"
                                                name="educationLevel"
                                                value={profileForm.educationLevel || ""}
                                                onChange={handleProfileChange}
                                                className="w-full p-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1887A1] transition-all duration-300"
                                                placeholder="Enter your education level"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-sm text-gray-600 font-medium">Category</label>
                                            <input
                                                type="text"
                                                name="selectedCategory"
                                                value={profileForm.selectedCategory || ""}
                                                onChange={handleProfileChange}
                                                className="w-full p-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1887A1] transition-all duration-300"
                                                placeholder="Enter your category"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-sm text-gray-600 font-medium">Stack</label>
                                            <input
                                                type="text"
                                                name="selectedStack"
                                                value={profileForm.selectedStack || ""}
                                                onChange={handleProfileChange}
                                                className="w-full p-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1887A1] transition-all duration-300"
                                                placeholder="Enter your stack"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex justify-between gap-2 mt-6">
                                        <button
                                            onClick={handleProfileUpdate}
                                            className="flex-1 px-4 py-2 bg-gradient-to-r from-[#1887A1] to-[#0D4C5B] text-white text-sm font-semibold rounded-lg hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg"
                                        >
                                            Update Profile
                                        </button>
                                        <button
                                            onClick={handleLogout}
                                            className="flex-1 px-4 py-2 bg-red-500 text-white text-sm font-semibold rounded-lg hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            )}
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
                                    Level {progress?.level || 0}
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

                                    {/* Progress Stats */}
                                    <div className="grid grid-cols-3 gap-4 text-center">
                                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-3 hover:scale-105 transition-all duration-300">
                                            <div className="text-xs text-gray-600 mb-1">Courses</div>
                                            <div className="font-bold text-lg text-gray-800">{progress.coursesCompleted}/{progress.totalCourses}</div>
                                            <div className="text-xs text-blue-600 font-semibold">Completed</div>
                                        </div>
                                        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-3 hover:scale-105 transition-all duration-300">
                                            <div className="text-xs text-gray-600 mb-1">Study Days</div>
                                            <div className="font-bold text-lg text-gray-800">{progress.studyDaysThisWeek}</div>
                                            <div className="text-xs text-green-600 font-semibold">This Week</div>
                                        </div>
                                        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-3 hover:scale-105 transition-all duration-300">
                                            <div className="text-xs text-gray-600 mb-1">Hours</div>
                                            <div className="font-bold text-lg text-gray-800">{progress.hoursThisMonth}</div>
                                            <div className="text-xs text-purple-600 font-semibold">This Month</div>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className="text-center">
                                    <p className="text-gray-600 text-sm mb-2">No progress data available. Start learning to track your progress!</p>
                                    <button
                                        onClick={handleInitializeProgress}
                                        className="px-4 py-2 bg-gradient-to-r from-[#1887A1] to-[#0D4C5B] text-white text-sm font-semibold rounded-lg hover:scale-105 transition-all duration-300"
                                    >
                                        Start Tracking Progress
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Upcoming Events Card */}
                        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-1 animate-slide-up delay-200">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg sm:text-xl font-bold text-gray-800 flex items-center gap-2">
                                    <Calendar className="w-5 h-5 text-[#1887A1]" />
                                    Upcoming Events
                                </h3>
                                <span className="text-xs bg-orange-100 text-orange-600 px-3 py-1 rounded-full font-semibold animate-pulse">
                                    {events.filter((ev) => {
                                        const timeLower = ev.time.toLowerCase();
                                        return timeLower.includes("today") || !isNaN(Date.parse(ev.time));
                                    }).length} Today
                                </span>
                            </div>

                            <div className="space-y-3">
                                {events.length > 0 ? (
                                    events.map((event, index) => (
                                        <div
                                            key={index}
                                            className={`bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-3 hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 border-l-4 border-transparent hover:border-[#1887A1] group cursor-pointer transform hover:scale-102 ${event.urgent ? "animate-pulse" : ""}`}
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
                                                        <div className="text-xs text-gray-600 truncate">{event.subtitle}</div>
                                                    </div>
                                                </div>
                                                <span className={`px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${event.color} text-white whitespace-nowrap`}>
                                                    {event.time}
                                                </span>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-center text-gray-600 text-sm">No upcoming events. Check back later!</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Bottom Row - Your Achievements Card */}
                    <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-1 animate-slide-up delay-400">
                        <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                            <Trophy className="w-5 h-5 text-[#1887A1]" />
                            Your Achievements
                        </h3>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* XP Progress Bar */}
                            <div className="lg:col-span-1 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-4">
                                {progress ? (
                                    <>
                                        <div className="flex justify-between items-center mb-3">
                                            <span className="font-bold text-xl bg-gradient-to-r from-[#1887A1] to-[#0D4C5B] bg-clip-text text-transparent">
                                                {progress.xp} XP
                                            </span>
                                            <span className="text-gray-600 text-sm">{progress.xpToNextLevel} XP to Level {progress.level + 1}</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner overflow-hidden">
                                            <div
                                                className={`bg-gradient-to-r from-[#1887A1] to-[#0D4C5B] h-3 rounded-full shadow-lg transition-all duration-2000 ease-out ${animateProgress ? "animate-pulse" : ""}`}
                                                style={{ width: animateProgress ? `${(progress.xp / (progress.xp + progress.xpToNextLevel)) * 100}%` : "0%" }}
                                            ></div>
                                        </div>
                                        <p className="text-xs text-gray-600 mt-2 text-center">Keep going! You&apos;re doing amazing!</p>
                                    </>
                                ) : (
                                    <div className="text-center">
                                        <p className="text-gray-600 text-sm mb-2">No XP data available. Start earning XP!</p>
                                        <button
                                            onClick={handleInitializeProgress}
                                            className="px-4 py-2 bg-gradient-to-r from-[#1887A1] to-[#0D4C5B] text-white text-sm font-semibold rounded-lg hover:scale-105 transition-all duration-300"
                                        >
                                            Start Tracking Progress
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Badges Earned */}
                            <div className="lg:col-span-1 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-4">
                                <h4 className="font-semibold text-base text-gray-800 mb-3 flex items-center gap-2">
                                    <Award className="w-4 h-4 text-orange-500" />
                                    Badges Earned ({badges.filter((b) => b.earned).length}/{badges.length})
                                </h4>
                                {badges.length > 0 ? (
                                    <div className="grid grid-cols-3 gap-2">
                                        {badges.map((badge, index) => (
                                            <div
                                                key={index}
                                                className={`relative group cursor-pointer ${badge.earned ? "animate-bounce" : ""}`}
                                                style={{ animationDelay: `${index * 200}ms` }}
                                            >
                                                <div
                                                    className={`w-12 h-12 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 flex items-center justify-center ${badge.earned ? `bg-gradient-to-br ${badge.color}` : "bg-gray-200 opacity-50"}`}
                                                >
                                                    <badge.icon className={`w-6 h-6 ${badge.earned ? "text-white" : "text-gray-400"}`} />
                                                </div>
                                                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-10">
                                                    {badge.name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-center text-gray-600 text-sm">No badges earned yet. Keep learning!</p>
                                )}
                            </div>

                            {/* Monthly Streaks */}
                            <div className="lg:col-span-1 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4">
                                <h4 className="font-semibold text-base text-gray-800 mb-3 flex items-center gap-2">
                                    <Zap className="w-4 h-4 text-green-500" />
                                    Study Streak
                                </h4>
                                {streak ? (
                                    <>
                                        <div className="flex justify-center space-x-2 mb-3">
                                            {daysOfWeek.map((day, index) => (
                                                <div
                                                    key={index}
                                                    className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold transition-all duration-300 ${streak.days[index] ? "bg-gradient-to-br from-[#1887A1] to-[#0D4C5B] text-white shadow-lg hover:shadow-xl transform hover:scale-110 animate-pulse" : "bg-gray-200 text-gray-500 hover:bg-gray-300"}`}
                                                    style={{ animationDelay: `${index * 100}ms` }}
                                                >
                                                    {day}
                                                </div>
                                            ))}
                                        </div>
                                        <div className="text-center">
                                            <p className="text-2xl font-bold text-[#1887A1] mb-1">{streak.currentStreak}</p>
                                            <p className="text-xs text-gray-600">Days Streak 🔥</p>
                                            <p className="text-xs text-green-600 font-semibold mt-2">Great consistency!</p>
                                        </div>
                                    </>
                                ) : (
                                    <p className="text-center text-gray-600 text-sm">No streak data available. Start your streak today!</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />

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
                    .animate-fade-in { animation: fade-in 1s ease-out; }
                    .animate-slide-down { animation: slide-down 0.6s ease-out; }
                    .animate-slide-up { animation: slide-up 0.6s ease-out; }
                    .animate-slide-left { animation: slide-left 0.6s ease-out; }
                    .delay-200 { animation-delay: 0.2s; }
                    .delay-300 { animation-delay: 0.3s; }
                    .delay-400 { animation-delay: 0.4s; }
                    .delay-1000 { animation-delay: 1s; }
                    .duration-2000 { animation-duration: 2s; }
                `}</style>
            </div>
        </div>
    );
};

export default Dashboard;