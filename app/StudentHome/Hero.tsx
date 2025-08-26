"use client";

import React, { useEffect, useState, useRef, RefObject } from "react";
import {
    BookOpen,
    Award,
    GraduationCap,
    TrendingUp,
    ChevronRight,
    ChevronLeft,
    Calendar,
    MessageCircle,
    CheckCircle,
    Target,
    Zap,
} from "lucide-react";
import Link from "next/link";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

type HeroProps = {
    _heroRef?: RefObject<HTMLDivElement | null>;
    _rightSideRef?: RefObject<HTMLDivElement | null>;
    studentName?: string;
};

const Hero: React.FC<HeroProps> = ({ _heroRef, _rightSideRef, studentName: propStudentName }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const user = useSelector((state: RootState) => state.auth.user);
    const isLoading = useSelector((state: RootState) => state.auth.loading);

    // Fixed name concatenation to handle undefined/null lastName
    const getStudentName = () => {
        if (propStudentName) return propStudentName;
        if (!user) return "Guest";
        
        const firstName = user.firstName || "";
        const lastName = user.lastName;
        
        // Only add lastName if it exists, is not null/undefined, and is not empty
        if (lastName && typeof lastName === 'string' && lastName.trim()) {
            return `${firstName} ${lastName}`.trim() || "Guest";
        }
        
        return firstName.trim() || "Guest";
    };

    const studentName = getStudentName();
    const displayName = isMounted ? (isLoading ? "Loading..." : studentName) : "Guest";

    const slides = [
        {
            id: 0,
            icon: BookOpen,
            title: "Your Courses",
            subtitle: "Active Learning",
            description: "View and continue your enrolled courses",
            features: ["3 Active Courses", "2 New Lessons", "Assignments Due"],
            status: "active",
            color: "from-blue-500 to-blue-600",
        },
        {
            id: 1,
            icon: GraduationCap,
            title: "Mentor Sessions",
            subtitle: "Guided Learning",
            description: "Upcoming mentor appointments & messages",
            features: ["1 Session Tomorrow", "2 Mentor Messages", "Q&A Support"],
            status: "scheduled",
            color: "from-emerald-500 to-emerald-600",
        },
        {
            id: 2,
            icon: TrendingUp,
            title: "Progress Overview",
            subtitle: "Track Growth",
            description: "Your weekly learning stats and milestones",
            progress: 60,
            color: "from-purple-500 to-purple-600",
        },
        {
            id: 3,
            icon: Award,
            title: "Achievements",
            subtitle: "Track Your Success",
            description: "Earn badges and certificates as you learn",
            features: ["Skill Badges", "Certificates", "Leaderboards"],
            achievements: 12,
            color: "from-amber-500 to-amber-600",
        },
    ];

    const totalSlides = slides.length;

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (!isPaused) {
            intervalRef.current = setInterval(() => {
                setActiveIndex((prev) => (prev + 1) % totalSlides);
            }, 3000);
        }
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [isPaused, totalSlides]);

    const handlePrev = () => setActiveIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
    const handleNext = () => setActiveIndex((prev) => (prev + 1) % totalSlides);
    const handleDotClick = (index: number) => setActiveIndex(index);

    return (
        <section
            ref={_heroRef}
            className="relative overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen flex items-center scroll-animation"
        >
            <div data-aos="fade-up" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 mt-0 pt-0">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left Side */}
                    <div className="space-y-8">
                        <div className="flex items-center justify-between">
                            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                                Welcome back,
                                <span className="bg-gradient-to-r from-[#1887A1] to-[#0D4C5B] bg-clip-text text-transparent block mt-1">
                                    {displayName}
                                </span>
                            </h1>
                        </div>
                        <p className="text-lg text-gray-600 leading-relaxed max-w-xl">
                            Here&apos;s a quick look at your learning progress, upcoming sessions, and recent achievements.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link href="/StudentProfile">
                                <button className="bg-gradient-to-r from-[#1887A1] to-[#0D4C5B] text-white px-8 py-4 rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 font-semibold cursor-pointer">
                                    <span>Continue Learning</span>
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </Link>
                            <Link href="/StudentHome/courses">
                                <button className="border-2 border-gray-200 text-gray-700 px-8 py-4 rounded-2xl hover:border-gray-300 hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 font-semibold bg-white cursor-pointer">
                                    Browse Courses
                                </button>
                            </Link>
                        </div>
                    </div>

                    {/* Right Side - Slider */}
                    <div ref={_rightSideRef} className="relative scroll-animation">
                        <div
                            className="relative h-[500px] w-full max-w-lg mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden"
                            onMouseEnter={() => setIsPaused(true)}
                            onMouseLeave={() => setIsPaused(false)}
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white"></div>
                            <div className="relative h-full w-full">
                                {slides.map((slide, index) => (
                                    <div
                                        key={slide.id}
                                        className={`absolute inset-0 transition-all duration-700 ease-in-out ${index === activeIndex
                                                ? "opacity-100 translate-x-0"
                                                : index < activeIndex
                                                    ? "opacity-0 -translate-x-full"
                                                    : "opacity-0 translate-x-full"
                                            }`}
                                    >
                                        <div className="h-full p-6 flex flex-col">
                                            <div className="flex items-center justify-between mb-4 h-8">
                                                <span className="text-sm font-medium text-gray-600">{slide.subtitle}</span>
                                                <div className="text-sm text-gray-400">{index + 1}/{totalSlides}</div>
                                            </div>

                                            <div className="flex-1 flex flex-col items-center justify-center space-y-6 pb-16">
                                                <div
                                                    className={`w-20 h-20 bg-gradient-to-br ${slide.color} rounded-3xl flex items-center justify-center shadow-lg`}
                                                >
                                                    <slide.icon className="w-10 h-10 text-white" />
                                                </div>

                                                <div className="text-center space-y-2 px-4">
                                                    <h3 className="text-2xl font-bold text-gray-800">{slide.title}</h3>
                                                    <p className="text-sm text-gray-600 leading-relaxed">{slide.description}</p>
                                                </div>

                                                <div className="w-full max-w-xs">
                                                    {slide.progress !== undefined ? (
                                                        <>
                                                            <div className="flex justify-between text-sm">
                                                                <span>Progress</span>
                                                                <span>{slide.progress}%</span>
                                                            </div>
                                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                                <div
                                                                    className={`bg-gradient-to-r ${slide.color} h-2 rounded-full`}
                                                                    style={{ width: `${slide.progress}%` }}
                                                                ></div>
                                                            </div>
                                                        </>
                                                    ) : slide.achievements !== undefined ? (
                                                        <div className="text-center space-y-4">
                                                            <div className="flex justify-center space-x-2">
                                                                <div
                                                                    className={`w-12 h-12 bg-gradient-to-br ${slide.color} rounded-xl flex items-center justify-center transform hover:scale-110 transition-transform duration-200`}
                                                                >
                                                                    <GraduationCap className="w-6 h-6 text-white" />
                                                                </div>
                                                                <div
                                                                    className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center transform hover:scale-110 transition-transform duration-200"
                                                                >
                                                                    <Target className="w-6 h-6 text-white" />
                                                                </div>
                                                                <div
                                                                    className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center transform hover:scale-110 transition-transform duration-200"
                                                                >
                                                                    <Zap className="w-6 h-6 text-white" />
                                                                </div>
                                                            </div>
                                                            <div className="text-xl font-bold text-gray-800">
                                                                {slide.achievements} Badges Earned
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div className="space-y-2">
                                                            {slide.features?.map((feature, idx) => (
                                                                <div key={idx} className="flex items-center space-x-2 bg-gray-50 rounded-lg p-2">
                                                                    <CheckCircle className="w-4 h-4 text-green-500" />
                                                                    <span className="text-xs">{feature}</span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="absolute bottom-13 left-6 right-6 flex items-center justify-between pt-4 border-t border-gray-100">
                                                <div className="flex items-center space-x-2">
                                                    <MessageCircle className="w-3 h-3 text-gray-400" />
                                                    <span className="text-xs text-gray-500">Interactive</span>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <Calendar className="w-3 h-3 text-gray-400" />
                                                    <span className="text-xs text-gray-500">Updated daily</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center space-x-3 z-20">
                                <button onClick={handlePrev} className="p-2 bg-white rounded-full shadow cursor-pointer">
                                    <ChevronLeft className="w-4 h-4" />
                                </button>
                                <div className="flex space-x-1">
                                    {slides.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => handleDotClick(index)}
                                            className={`h-2 rounded-full ${activeIndex === index ? "bg-blue-600 w-6" : "bg-gray-300 w-2"}`}
                                        />
                                    ))}
                                </div>
                                <button onClick={handleNext} className="p-2 bg-white rounded-full shadow cursor-pointer">
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>

                            {isPaused && (
                                <div className="absolute top-4 right-4 bg-black/20 rounded-full p-2">
                                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;