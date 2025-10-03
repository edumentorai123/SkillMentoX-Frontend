"use client";
import React, { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import Header from "./components/Header";
import ProfileDropdown from "./components/ProfileDropdown";
import ProgressCard from "./components/ProgressCard";
import EventsCard from "./components/EventsCard";
import AchievementsCard from "./components/AchievementsCard";
import ToastContainerWrapper from "./components/ToastContainerWrapper";
import { Loader2 } from "lucide-react";
import { BookOpen, Clock, Target, Trophy, Star, Award, Zap } from "lucide-react";

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
    assignedMentor?: { _id: string; name: string };
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

interface StudentRequest {
    _id: string;
    student: string;
    category: string;
    status: string;
    stack: string;
    assignedMentor?: {
        _id: string;
        fullName?: string;
        firstName?: string;
        lastName?: string;
        expertise?: string;
    } | string;
    replies: { mentor: string; text: string; time: string }[];
    requestedAt: string;
    updatedAt: string;
    createdAt: string;
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

    const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL as string;

    const getUserId = () => {
        const authData = JSON.parse(localStorage.getItem("auth") || "{}");
        return authData.user?.id || authData.user?._id || null;
    };

    const getSubscriptionStatus = () => {
        const authData = JSON.parse(localStorage.getItem("auth") || "{}");
        const user = authData.user;
        if (!user) return false;
        const now = new Date();
        const end = new Date(user.subscriptionEnd);
        return Boolean(user.isSubscribed) && end >= now;
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
        let isMounted = true;
        const fetchData = async () => {
            setLoading(true);
            const userId = getUserId();
            if (!userId) {
                setError("User not logged in. Please login again.");
                setTimeout(() => {
                    if (isMounted) window.location.href = "/loginForm";
                }, 2000);
                return;
            }
            try {
                const token = localStorage.getItem("token");

                const fetchProfile = async () => {
                    try {
                        const profileRes = await axios.get(`${API_URL}/api/students/getprofile/${userId}`, {
                            headers: { Authorization: `Bearer ${token}` },
                        });
                        console.log("Profile API Response:", JSON.stringify(profileRes.data, null, 2));
                        const freshUser = profileRes.data.data || profileRes.data;
                        if (!freshUser || !freshUser.name) {
                            freshUser.name = `${freshUser.firstName || "Unknown"} ${freshUser.lastName || "User"}`;
                        }

                        // Fetch student students
                        const requestsRes = await axios.get(`${API_URL}/api/students/my`, {
                            headers: { Authorization: `Bearer ${token}` },
                        });
                        console.log("Requests API Response:", JSON.stringify(requestsRes.data, null, 2));
                        const students = Array.isArray(requestsRes.data.students)
                            ? requestsRes.data.students
                            : Array.isArray(requestsRes.data)
                                ? requestsRes.data
                                : [];
                        console.log("Parsed students:", JSON.stringify(students, null, 2));
                        console.log("Checking students for approved status:", students.map((req: StudentRequest) => ({ id: req._id, status: req.status, assignedMentor: req.assignedMentor })));

                        const approvedRequest = students.find(
                            (request: StudentRequest) => request.status === "approved" || request.status === "accepted"
                        );
                        console.log("Approved request:", JSON.stringify(approvedRequest, null, 2));

                        let mentorStatus: "pending" | "approved" | "none" = "none";
                        let assignedMentorData = null;
                        if (approvedRequest) {
                            mentorStatus = "approved";
                            if (approvedRequest.assignedMentor) {
                                if (typeof approvedRequest.assignedMentor === "string") {
                                    // Fetch mentor details if not populated
                                    try {
                                        const mentorRes = await axios.get(`${API_URL}/api/auth/user/${approvedRequest.assignedMentor}`, {
                                            headers: { Authorization: `Bearer ${token}` },
                                        });
                                        const mentorData = mentorRes.data;
                                        assignedMentorData = {
                                            _id: mentorData._id,
                                            name: mentorData.fullName || `${mentorData.firstName || ''} ${mentorData.lastName || ''}`.trim() || "Unknown Mentor",
                                        };
                                    } catch (mentorError) {
                                        console.error("Error fetching mentor details:", mentorError);
                                        assignedMentorData = {
                                            _id: approvedRequest.assignedMentor,
                                            name: "Mentor (ID: " + approvedRequest.assignedMentor + ")",
                                        };
                                    }
                                } else {
                                    const mentorObj = approvedRequest.assignedMentor;
                                    assignedMentorData = {
                                        _id: mentorObj._id,
                                        name: mentorObj.fullName || `${mentorObj.firstName || ''} ${mentorObj.lastName || ''}`.trim() || "Unknown Mentor",
                                    };
                                }
                            } else {
                                // Approved but no mentor assigned (legacy data)
                                assignedMentorData = {
                                    _id: null,
                                    name: "Awaiting Mentor Assignment",
                                };
                            }
                        } else if (students.some((req: StudentRequest) => req.status === "pending")) {
                            mentorStatus = "pending";
                        }

                        console.log("Assigned mentor data:", assignedMentorData);

                        const studentData = {
                            ...freshUser,
                            name: freshUser.name || `${freshUser.firstName || ''} ${freshUser.lastName || ''}`.trim() || "Unknown User",
                            assignedMentor: assignedMentorData,
                            mentorStatus,
                        };

                        setStudent(studentData);
                        setProfileForm(studentData);

                        const authData = JSON.parse(localStorage.getItem("auth") || "{}");
                        if (authData.user) {
                            authData.user = {
                                ...authData.user,
                                ...freshUser,
                                firstName: freshUser.firstName || freshUser.name?.split(" ")[0] || "",
                                lastName: freshUser.lastName || freshUser.name?.split(" ").slice(1).join(" ") || "",
                                assignedMentor: assignedMentorData,
                                mentorStatus,
                            };
                            authData.hasProfile = true;
                            localStorage.setItem("auth", JSON.stringify(authData));
                        }
                    } catch (error) {
                        console.error("Error fetching profile or students:", error);
                        setError("Failed to load profile or students. Please try again.");
                    }
                };

                const fetchProgress = async () => {
                    const progressRes = await axios.get(`${API_URL}/api/students/progress/${userId}`, {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    setProgress(progressRes.data);
                };

                const fetchEvents = async () => {
                    const eventsRes = await axios.get(`${API_URL}/api/events/upcoming`, {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    const eventsData: EventApiResponse[] = Array.isArray(eventsRes.data)
                        ? eventsRes.data
                        : eventsRes.data?.events || [];
                    setEvents(
                        eventsData.map((ev: EventApiResponse) => ({
                            ...ev,
                            icon: ev.iconName === "BookOpen" ? BookOpen : ev.iconName === "Clock" ? Clock : Target,
                        }))
                    );
                };

                const fetchBadges = async () => {
                    const badgesRes = await axios.get(`${API_URL}/api/achievements/badges/${userId}`, {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    console.log("Badges API Response:", badgesRes.data);
                    const badgesData: BadgeApiResponse[] = Array.isArray(badgesRes.data)
                        ? badgesRes.data
                        : badgesRes.data?.data || badgesRes.data?.badges || [];
                    setBadges(
                        badgesData.map((b: BadgeApiResponse) => ({
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
                };

                const fetchStreak = async () => {
                    const streakRes = await axios.get(`${API_URL}/api/streaks/${userId}`, {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    setStreak(streakRes.data);
                };

                await Promise.all([fetchProfile(), fetchProgress(), fetchEvents(), fetchBadges(), fetchStreak()]);
            } catch (err: unknown) {
                let errorMessage = "An unexpected error occurred";
                if (err instanceof AxiosError) {
                    errorMessage = err.response?.data?.message || err.response?.data?.error || err.message || errorMessage;
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
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchData();

        return () => {
            isMounted = false;
        };
    }, [API_URL]);

    const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProfileForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleProfileUpdate = async () => {
        const userId = getUserId();
        if (!userId) {
            setError("User not logged in. Please login again.");
            setTimeout(() => (window.location.href = "/loginForm"), 2000);
            return;
        }

        try {
            const token = localStorage.getItem("token");
            await axios.put(
                `${API_URL}/api/students/updateprofile/${userId}`,
                {
                    ...profileForm,
                    firstName: profileForm.name?.split(" ")[0] || "",
                    lastName: profileForm.name?.split(" ").slice(1).join(" ") || "",
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            // Re-fetch students to ensure mentor data
            const requestsRes = await axios.get(`${API_URL}/api/students/my`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log("Post-update students:", JSON.stringify(requestsRes.data, null, 2));
            const students = Array.isArray(requestsRes.data.students)
                ? requestsRes.data.students
                : Array.isArray(requestsRes.data)
                    ? requestsRes.data
                    : [];

            const approvedRequest = students.find(
                (request: StudentRequest) => request.status === "approved" || request.status === "accepted"
            );

            let mentorStatus: "pending" | "approved" | "none" = "none";
            let assignedMentorData = null;
            if (approvedRequest) {
                mentorStatus = "approved";
                if (approvedRequest.assignedMentor) {
                    if (typeof approvedRequest.assignedMentor === "string") {
                        // Fetch mentor details if not populated
                        try {
                            const mentorRes = await axios.get(`${API_URL}/api/auth/user/${approvedRequest.assignedMentor}`, {
                                headers: { Authorization: `Bearer ${token}` },
                            });
                            const mentorData = mentorRes.data;
                            assignedMentorData = {
                                _id: mentorData._id,
                                name: mentorData.fullName || `${mentorData.firstName || ''} ${mentorData.lastName || ''}`.trim() || "Unknown Mentor",
                            };
                        } catch (mentorError) {
                            console.error("Error fetching mentor details:", mentorError);
                            assignedMentorData = {
                                _id: approvedRequest.assignedMentor,
                                name: "Mentor (ID: " + approvedRequest.assignedMentor + ")",
                            };
                        }
                    } else {
                        const mentorObj = approvedRequest.assignedMentor;
                        assignedMentorData = {
                            _id: mentorObj._id,
                            name: mentorObj.fullName || `${mentorObj.firstName || ''} ${mentorObj.lastName || ''}`.trim() || "Unknown Mentor",
                        };
                    }
                } else {
                    // Approved but no mentor assigned (legacy data)
                    assignedMentorData = {
                        _id: null,
                        name: "Awaiting Mentor Assignment",
                    };
                }
            } else if (students.some((req: StudentRequest) => req.status === "pending")) {
                mentorStatus = "pending";
            }

            console.log("Assigned mentor data:", assignedMentorData);

            const firstName = profileForm.name?.split(" ")[0] || "";
            const lastName = profileForm.name?.split(" ").slice(1).join(" ") || "";
            const updatedStudent = {
                ...student,
                ...profileForm,
                name: profileForm.name || `${firstName} ${lastName}`.trim() || student?.name || "User",
                firstName,
                lastName,
                assignedMentor: assignedMentorData,
                mentorStatus,
            } as Student;

            setStudent(updatedStudent);
            setIsProfileOpen(false);

            localStorage.setItem("user", JSON.stringify(updatedStudent));
            const authData = JSON.parse(localStorage.getItem("auth") || "{}");
            if (authData.user) {
                authData.user = {
                    ...authData.user,
                    ...updatedStudent,
                    firstName,
                    lastName,
                    name: updatedStudent.name,
                    assignedMentor: assignedMentorData,
                    mentorStatus,
                };
                authData.hasProfile = true;
                localStorage.setItem("auth", JSON.stringify(authData));
            }
        } catch (err: unknown) {
            let errorMessage = "Failed to update profile";
            if (err instanceof AxiosError) {
                errorMessage = err.response?.data?.message || err.response?.data?.error || err.message || errorMessage;
                if (err.response?.status === 401) {
                    errorMessage = "Session expired. Please login again.";
                }
            } else if (err instanceof Error) {
                errorMessage = err.message;
            }
            console.error("Profile update error:", err);
            setError(errorMessage);
        }
    };

    const handleLogout = () => {
        localStorage.clear();
        window.location.href = "/loginForm";
    };

    const handleInitializeProgress = async () => {
        const userId = getUserId();
        if (!userId) {
            setError("User not logged in. Please login again.");
            setTimeout(() => (window.location.href = "/loginForm"), 2000);
            return;
        }

        try {
            const token = localStorage.getItem("token");
            const res = await axios.post(
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
            setProgress(res.data);
        } catch (err: unknown) {
            let errorMessage = "Failed to initialize progress";
            if (err instanceof AxiosError) {
                errorMessage = err.response?.data?.message || err.response?.data?.error || err.message || errorMessage;
                if (err.response?.status === 401) {
                    errorMessage = "Session expired. Please login again.";
                    setTimeout(() => (window.location.href = "/loginForm"), 2000);
                }
            } else if (err instanceof Error) {
                errorMessage = err.message;
            }
            console.error("Progress initialization error:", err);
            setError(errorMessage);
        }
    };

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

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#1887A1] to-[#0D4C5B] relative overflow-hidden">
            <div className="absolute inset-0">
                <div className="absolute top-20 left-10 w-32 h-32 bg-white/5 rounded-full blur-xl animate-pulse"></div>
                <div className="absolute top-40 right-20 w-24 h-24 bg-white/10 rounded-full blur-lg animate-bounce"></div>
                <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-white/5 rounded-full blur-md animate-pulse delay-1000"></div>
            </div>

            <div className="relative z-10 p-3 sm:p-4 lg:p-6 h-full flex flex-col">
                <div className="flex items-center justify-between mb-4 sm:mb-6 animate-fade-in">
                    <Header student={student} currentTime={currentTime} getSubscriptionStatus={getSubscriptionStatus} />
                    <div className="flex items-center space-x-2 sm:space-x-4 animate-slide-left">
                        <ProfileDropdown
                            student={student}
                            profileForm={profileForm}
                            isProfileOpen={isProfileOpen}
                            setIsProfileOpen={setIsProfileOpen}
                            handleProfileChange={handleProfileChange}
                            handleProfileUpdate={handleProfileUpdate}
                            handleLogout={handleLogout}
                        />
                    </div>
                </div>

                <div className="flex-1 grid grid-rows-1 lg:grid-rows-2 gap-4 sm:gap-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                        <ProgressCard
                            progress={progress}
                            animateProgress={animateProgress}
                            handleInitializeProgress={handleInitializeProgress}
                        />
                        <EventsCard events={events} />
                    </div>
                    <AchievementsCard
                        progress={progress}
                        badges={badges}
                        streak={streak}
                        animateProgress={animateProgress}
                        handleInitializeProgress={handleInitializeProgress}
                    />
                </div>
                <ToastContainerWrapper />
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