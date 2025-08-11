"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
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
  Star,
  ChevronLeft,
} from "lucide-react";

type HeroProps = {
  heroRef: React.RefObject<HTMLDivElement | null>;
  rightSideRef: React.RefObject<HTMLDivElement | null>;
};

const Hero: React.FC<HeroProps> = ({ heroRef, rightSideRef }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const slidesRef = useRef<(HTMLDivElement | null)[]>([]);

  // Auto-slide logic
  useEffect(() => {
    const startInterval = () => {
      intervalRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % 4); // 4 slides
      }, 3000);
    };

    if (!isPaused) {
      startInterval();
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused]);

  // GSAP animation for slides
  useEffect(() => {
    if (slidesRef.current.length === 0) return;

    const slides = slidesRef.current;
    const activeSlide = slides[activeIndex];
    if (!activeSlide) return;

    // Animate the active slide (slide in from right)
    gsap.fromTo(
      activeSlide,
      { opacity: 0, x: 100, scale: 0.95 },
      { opacity: 1, x: 0, scale: 1, duration: 0.8, ease: "power3.out" }
    );

    // Hide and slide out other slides
    slides.forEach((slide, i) => {
      if (i !== activeIndex && slide) {
        gsap.to(slide, { opacity: 0, x: -100, duration: 0.4, ease: "power3.in" });
      }
    });
  }, [activeIndex]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? 3 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % 4);
  };

  const handleDotClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <section ref={heroRef} className="relative overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side */}
          <div className="scroll-animation opacity-0 translate-y-8 transition-all duration-1000">
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Learn Smarter with
              <span className="bg-gradient-to-r from-[#1887A1] to-[#0D4C5B] bg-clip-text text-transparent block">
                AI + Human
              </span>
              Mentorship
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Combine the power of artificial intelligence with human expertise.
              Get personalized learning paths, instant AI tutoring, and connect
              with experienced mentors to accelerate your learning journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/Register">
                <button className="bg-[#1887A1] text-white px-8 py-4 rounded-xl hover:bg-[#0D4C5B] transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 cursor-pointer">
                  <span className="font-semibold">Start Learning</span>
                  <ChevronRight className="w-5 h-5" />
                </button>
              </Link>
              <Link href="/demo">
                <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl hover:border-gray-400 transition-colors flex items-center justify-center space-x-2 cursor-pointer">
                  <Play className="w-5 h-5" />
                  <span className="font-semibold">View Demo</span>
                </button>
              </Link>
            </div>
          </div>

          {/* Right Side with Enhanced Slider */}
          <div
            ref={rightSideRef}
            className="relative h-96 overflow-hidden rounded-3xl shadow-lg"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Slides */}
            <div
              className="absolute inset-0 flex items-center justify-center"
              ref={(el) => { slidesRef.current[0] = el; }}
            >
              <div className="bg-gradient-to-br from-[#1887A1] to-[#0D4C5B] rounded-3xl p-8 shadow-2xl h-full flex items-center justify-center">
                <div className="bg-white rounded-2xl p-8 text-center w-full">
                  <div className="w-20 h-20 bg-gradient-to-br from-[#1887A1] to-[#0D4C5B] rounded-full flex items-center justify-center mx-auto mb-6">
                    <Bot className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    AI Mentor
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Available 24/7 for instant help and personalized guidance
                  </p>
                  <div className="flex justify-center space-x-2">
                    <div className="w-3 h-3 bg-[#1887A1] rounded-full animate-pulse"></div>
                    <div className="w-3 h-3 bg-[#0D4C5B] rounded-full animate-pulse delay-100"></div>
                    <div className="w-3 h-3 bg-[#1887A1] rounded-full animate-pulse delay-200"></div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="absolute inset-0 flex items-center justify-center"
              ref={(el) => { slidesRef.current[1] = el; }}
            >
              <div className="bg-gradient-to-br from-[#0D4C5B] to-[#1887A1] rounded-3xl p-8 shadow-2xl h-full flex items-center justify-center">
                <div className="bg-white rounded-2xl p-8 text-center w-full">
                  <div className="w-20 h-20 bg-gradient-to-br from-[#0D4C5B] to-[#1887A1] rounded-full flex items-center justify-center mx-auto mb-6">
                    <Users className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    Human Expert
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Connect with industry professionals for deep knowledge
                  </p>
                  <div className="flex items-center justify-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Star className="w-5 h-5 text-[#1887A1]" />
                      <span className="text-gray-600 font-semibold">4.9/5</span>
                    </div>
                    <div className="text-gray-400">•</div>
                    <span className="text-gray-600">Expert Certified</span>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="absolute inset-0 flex items-center justify-center"
              ref={(el) => { slidesRef.current[2] = el; }}
            >
              <div className="bg-gradient-to-br from-[#1887A1] to-[#0D4C5B] rounded-3xl p-8 shadow-2xl h-full flex items-center justify-center">
                <div className="bg-white rounded-2xl p-8 text-center w-full">
                  <div className="w-20 h-20 bg-gradient-to-br from-[#1887A1] to-[#0D4C5B] rounded-full flex items-center justify-center mx-auto mb-6">
                    <BookOpen className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    Learning Path
                  </h3>
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Course Progress</span>
                      <CheckCircle className="w-5 h-5 text-[#1887A1]" />
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div className="bg-gradient-to-r from-[#1887A1] to-[#0D4C5B] h-3 rounded-full w-3/4"></div>
                    </div>
                    <p className="text-sm text-gray-500">75% Complete</p>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="absolute inset-0 flex items-center justify-center"
              ref={(el) => { slidesRef.current[3] = el; }}
            >
              <div className="bg-gradient-to-br from-[#0D4C5B] to-[#1887A1] rounded-3xl p-8 shadow-2xl h-full flex items-center justify-center">
                <div className="bg-white rounded-2xl p-8 text-center w-full">
                  <div className="w-20 h-20 bg-gradient-to-br from-[#0D4C5B] to-[#1887A1] rounded-full flex items-center justify-center mx-auto mb-6">
                    <Award className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    Achievements
                  </h3>
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    <div className="w-12 h-12 bg-[#1887A1] rounded-lg flex items-center justify-center">
                      <GraduationCap className="w-6 h-6 text-white" />
                    </div>
                    <div className="w-12 h-12 bg-[#0D4C5B] rounded-lg flex items-center justify-center">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-br from-[#1887A1] to-[#0D4C5B] rounded-lg flex items-center justify-center">
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <p className="text-gray-600">Earn certificates and badges</p>
                </div>
              </div>
            </div>

            {/* Navigation Controls */}
            <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center space-x-4">
              <button
                onClick={handlePrev}
                className="p-3 bg-white/80 rounded-full hover:bg-white/90 transition-colors shadow-md hover:shadow-lg"
                aria-label="Previous Slide"
              >
                <ChevronLeft className="w-6 h-6 text-gray-800" />
              </button>
              <div className="flex space-x-2">
                {[0, 1, 2, 3].map((index) => (
                  <button
                    key={index}
                    onClick={() => handleDotClick(index)}
                    className={`w-4 h-4 rounded-full transition-colors transform hover:scale-125 ${
                      activeIndex === index ? "bg-[#1887A1] scale-125" : "bg-gray-300"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
              <button
                onClick={handleNext}
                className="p-3 bg-white/80 rounded-full hover:bg-white/90 transition-colors shadow-md hover:shadow-lg"
                aria-label="Next Slide"
              >
                <ChevronRight className="w-6 h-6 text-gray-800" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;