"use client";

import React, { useEffect, useState, useRef, RefObject } from "react";
import {
  Bot,
  Users,
  BookOpen,
  Award,
  ChevronRight,
  Play,
  CheckCircle,
  Target,
  Zap,
  GraduationCap,
  ChevronLeft,
  Clock,
  TrendingUp,
  MessageCircle,
  Calendar,
} from "lucide-react";
import Link from "next/link";

type HeroProps = {
  _heroRef?: RefObject<HTMLDivElement | null>;
  _rightSideRef?: RefObject<HTMLDivElement | null>;
};

const Hero: React.FC<HeroProps> = ({ _heroRef, _rightSideRef }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const startInterval = () => {
      intervalRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % 2);
      }, 2000); 
    };

    if (!isPaused) {
      startInterval();
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? 3 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % 4);
  };

  const handleDotClick = (index: number) => {
    setActiveIndex(index);
  };

  const slides = [
    {
      id: 0,
      icon: Bot,
      title: "AI Mentor",
      subtitle: "Smart Learning Assistant",
      description: "Get instant answers and personalized guidance",
      features: ["24/7 Availability", "Instant Responses", "Personalized Tips"],
      status: "online",
      color: "from-blue-500 to-blue-600",
    },
    {
      id: 1,
      icon: Users,
      title: "Human Expert",
      subtitle: "Industry Professional",
      description: "Connect with verified experts in your field",
      features: ["Expert Verified", "4.9★ Rating", "Real Experience"],
      status: "available",
      color: "from-emerald-500 to-emerald-600",
    },
    {
      id: 2,
      icon: BookOpen,
      title: "Learning Path",
      subtitle: "Structured Progress",
      description: "Follow curated paths designed for success",
      features: ["Step-by-step", "Progress Tracking", "Certificates"],
      progress: 75,
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

  return (
    <section
      ref={_heroRef}
      className="relative overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen flex items-center scroll-animation"
    >
      <div data-aos="fade-up" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 mt-0 pt-0">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Side */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Learn Smarter with
                <span className="bg-gradient-to-r from-[#1887A1] to-[#0D4C5B] bg-clip-text text-transparent block mt-2">
                  AI + Human
                </span>
                Mentorship
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed max-w-xl">
                Combine the power of artificial intelligence with human expertise.
                Get personalized learning paths, instant AI tutoring, and connect
                with experienced mentors to accelerate your learning journey.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/Register">
              <button className="bg-gradient-to-r from-[#1887A1] to-[#0D4C5B] text-white px-8 py-4 rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 font-semibold cursor-pointer">
                <span>Start Learning</span>
                <ChevronRight className="w-5 h-5" />
              </button>
              </Link>
              <button className="border-2 border-gray-200 text-gray-700 px-8 py-4 rounded-2xl hover:border-gray-300 hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 font-semibold bg-white cursor-pointer">
                <Play className="w-5 h-5" />
                <span>View Demo</span>
              </button>
            </div>
          </div>

          {/* Right Side - Enhanced Real-world Slider */}
          <div  ref={_rightSideRef} className="relative scroll-animation">
            <div
              className="relative h-[500px] w-full bg-white rounded-3xl shadow-2xl overflow-hidden"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white"></div>

              {/* Slides Container */}
              <div className="relative h-full w-full">
                {slides.map((slide, index) => (
                  <div
                    key={slide.id}
                    className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                      index === activeIndex
                        ? "opacity-100 translate-x-0"
                        : index < activeIndex
                        ? "opacity-0 -translate-x-full"
                        : "opacity-0 translate-x-full"
                    }`}
                  >
                    <div className="h-full p-8 flex flex-col justify-between">
                      {/* Header */}
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-3">
                          <div
                            className={`w-3 h-3 rounded-full ${
                              slide.status === "online"
                                ? "bg-green-500"
                                : slide.status === "available"
                                ? "bg-blue-500"
                                : "bg-gray-400"
                            } animate-pulse`}
                          ></div>
                          <span className="text-sm font-medium text-gray-600">
                            {slide.status === "online"
                              ? "Online Now"
                              : slide.status === "available"
                              ? "Available"
                              : "Active"}
                          </span>
                        </div>
                        <div className="text-sm text-gray-400">
                          {index + 1}/4
                        </div>
                      </div>

                      {/* Main Content */}
                      <div className="flex-1 flex flex-col items-center justify-center space-y-6">
                        {/* Icon */}
                        <div
                          className={`w-24 h-24 bg-gradient-to-br ${slide.color} rounded-3xl flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform duration-300`}
                        >
                          <slide.icon className="w-12 h-12 text-white" />
                        </div>

                        {/* Title and Description */}
                        <div className="text-center space-y-2">
                          <h3 className="text-3xl font-bold text-gray-800">
                            {slide.title}
                          </h3>
                          <p className="text-lg text-gray-500 font-medium">
                            {slide.subtitle}
                          </p>
                          <p className="text-gray-600 max-w-sm">
                            {slide.description}
                          </p>
                        </div>

                        {/* Features or Progress */}
                        <div className="w-full max-w-sm">
                          {slide.progress !== undefined ? (
                            <div className="space-y-3">
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-600">
                                  Course Progress
                                </span>
                                <span className="font-semibold text-gray-800">
                                  {slide.progress}%
                                </span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                                <div
                                  className={`bg-gradient-to-r ${slide.color} h-full rounded-full transition-all duration-1000 ease-out`}
                                  style={{ width: `${slide.progress}%` }}
                                ></div>
                              </div>
                              <div className="flex items-center justify-center space-x-4 pt-2">
                                <div className="flex items-center space-x-1">
                                  <Clock className="w-4 h-4 text-gray-400" />
                                  <span className="text-sm text-gray-500">
                                    2h left
                                  </span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <TrendingUp className="w-4 h-4 text-green-500" />
                                  <span className="text-sm text-green-600">
                                    On track
                                  </span>
                                </div>
                              </div>
                            </div>
                          ) : slide.achievements !== undefined ? (
                            <div className="text-center space-y-4">
                              <div className="grid grid-cols-3 gap-3">
                                <div
                                  className={`w-16 h-16 bg-gradient-to-br ${slide.color} rounded-2xl flex items-center justify-center transform hover:scale-110 transition-transform duration-200`}
                                >
                                  <GraduationCap className="w-8 h-8 text-white" />
                                </div>
                                <div
                                  className={`w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center transform hover:scale-110 transition-transform duration-200`}
                                >
                                  <Target className="w-8 h-8 text-white" />
                                </div>
                                <div
                                  className={`w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center transform hover:scale-110 transition-transform duration-200`}
                                >
                                  <Zap className="w-8 h-8 text-white" />
                                </div>
                              </div>
                              <div className="text-2xl font-bold text-gray-800">
                                {slide.achievements} Badges Earned
                              </div>
                            </div>
                          ) : (
                            <div className="space-y-3">
                              {slide.features.map((feature, idx) => (
                                <div
                                  key={idx}
                                  className="flex items-center space-x-3 bg-gray-50 rounded-xl p-3"
                                >
                                  <CheckCircle
                                    className={`w-5 h-5 text-green-500`}
                                  />
                                  <span className="text-gray-700 font-medium">
                                    {feature}
                                  </span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                        <div className="flex items-center space-x-2">
                          <MessageCircle className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-500">
                            Interactive
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-500">
                            Updated daily
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation Controls */}
              <div className="absolute bottom-6 left-0 right-0 flex items-center justify-center space-x-4 z-10">
                <button
                  onClick={handlePrev}
                  className="p-3 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-110"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-700" />
                </button>

                <div className="flex space-x-2">
                  {slides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => handleDotClick(index)}
                      className={`h-2 rounded-full transition-all duration-300 transform hover:scale-125 ${
                        activeIndex === index
                          ? "bg-blue-600 w-8 scale-125"
                          : "bg-gray-300 w-2 hover:bg-gray-400"
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={handleNext}
                  className="p-3 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-110"
                >
                  <ChevronRight className="w-5 h-5 text-gray-700" />
                </button>
              </div>

              {/* Pause indicator */}
              {isPaused && (
                <div className="absolute top-6 right-6 bg-black/20 backdrop-blur-sm rounded-full p-2">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                </div>
              )}
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-gradient-to-br from-emerald-400 to-blue-400 rounded-full opacity-20 animate-pulse delay-1000"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;