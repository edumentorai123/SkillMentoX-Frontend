"use client";

import React, { useState, useEffect } from "react";
import {
  User,
  Clock,
  Calendar,
  MessageCircle,
  Target,
  TrendingUp,
  ChevronRight,
  BookOpen,
  Users,
  FileText,
  Zap,
  AlertCircle,
  BarChart3,
  Brain,
  Star,
  Shield,
  Timer,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/Slices/authSlice";
import Image from "next/image";
import { useRouter } from "next/navigation";

const MentorHomePage: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isActive, setIsActive] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    const storedRole = localStorage.getItem("userRole");

    if (!storedName || !storedRole) {
      router.replace("/loginForm");
      return;
    }

    if (storedRole !== "mentor") {
      router.replace("/studentHome");
      return;
    }

    setUserName(storedName);
    setLoading(false);
  }, [router]);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.clear();
    router.replace("/loginForm");
  };

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);
      const hour = now.getHours();
      setIsActive(hour >= 10 && hour < 15);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const mentorResponsibilities = [
    {
      icon: Timer,
      title: "Active Hours Commitment",
      description:
        "Must be available and active from 10:00 AM to 3:00 PM daily for real-time student support, instant query resolution, and live mentoring sessions.",
      gradient: "from-red-400 to-red-600",
      priority: "Critical",
      timeframe: "10 AM - 3 PM Daily",
    },
    {
      icon: Calendar,
      title: "Weekly Progress Reviews",
      description:
        "Conduct comprehensive weekend reviews for each student analyzing weekly progress, assigning scores, providing detailed feedback, and identifying improvement areas.",
      gradient: "from-[#1887A1] to-[#0D4C5B]",
      priority: "High",
      timeframe: "Every Weekend",
    },
    {
      icon: Target,
      title: "Weekly Study Plan Creation",
      description:
        "Design personalized weekly study plans at the beginning of each week with clear objectives, milestones, and tailored learning paths for individual students.",
      gradient: "from-emerald-400 to-emerald-600",
      priority: "High",
      timeframe: "Week Start",
    },
    {
      icon: MessageCircle,
      title: "Real-Time Question Support",
      description:
        "Provide instant responses to student queries during active hours, maintain live chat sessions, and offer immediate clarification on academic doubts.",
      gradient: "from-[#1887A1] to-[#0D4C5B]",
      priority: "Critical",
      timeframe: "10 AM - 3 PM",
    },
    {
      icon: BookOpen,
      title: "Weekly Task Assignment",
      description:
        "Create and assign weekly tasks for each student with clear deadlines, learning objectives, and progress tracking mechanisms to ensure continuous engagement.",
      gradient: "from-orange-400 to-orange-600",
      priority: "High",
      timeframe: "Weekly",
    },
    {
      icon: TrendingUp,
      title: "Performance Analytics",
      description:
        "Monitor and analyze student performance metrics, track learning patterns, identify strengths and weaknesses, and provide data-driven insights for improvement.",
      gradient: "from-[#1887A1] to-[#0D4C5B]",
      priority: "Medium",
      timeframe: "Continuous",
    },
    {
      icon: Users,
      title: "Student Engagement Monitoring",
      description:
        "Track student participation levels, monitor engagement metrics, identify at-risk students, and implement intervention strategies to maintain active learning.",
      gradient: "from-pink-400 to-pink-600",
      priority: "Medium",
      timeframe: "Daily",
    },
    {
      icon: FileText,
      title: "Progress Documentation",
      description:
        "Maintain detailed records of student progress, document learning milestones, create progress reports, and update student profiles with achievements.",
      gradient: "from-teal-400 to-teal-600",
      priority: "Medium",
      timeframe: "Ongoing",
    },
    {
      icon: Brain,
      title: "Personalized Learning Strategies",
      description:
        "Develop customized learning approaches for each student based on their learning style, pace, and preferences to maximize educational outcomes.",
      gradient: "from-[#1887A1] to-[#0D4C5B]",
      priority: "High",
      timeframe: "Adaptive",
    },
    {
      icon: Star,
      title: "Motivation & Encouragement",
      description:
        "Provide consistent motivation, celebrate student achievements, offer encouragement during challenges, and maintain positive learning environment.",
      gradient: "from-yellow-400 to-yellow-600",
      priority: "High",
      timeframe: "Daily",
    },
    {
      icon: AlertCircle,
      title: "Issue Identification & Resolution",
      description:
        "Proactively identify learning obstacles, academic difficulties, or engagement issues and implement timely solutions to keep students on track.",
      gradient: "from-rose-400 to-rose-600",
      priority: "High",
      timeframe: "As Needed",
    },
    {
      icon: BarChart3,
      title: "Goal Setting & Tracking",
      description:
        "Collaborate with students to set realistic academic goals, create achievement timelines, and regularly track progress toward goal completion.",
      gradient: "from-cyan-400 to-cyan-600",
      priority: "Medium",
      timeframe: "Monthly",
    },
    {
      icon: Shield,
      title: "Quality Assurance",
      description:
        "Ensure high-quality mentoring standards, maintain professional communication, follow platform guidelines, and uphold educational excellence.",
      gradient: "from-gray-400 to-gray-600",
      priority: "Critical",
      timeframe: "Always",
    },
    {
      icon: Zap,
      title: "Adaptive Response System",
      description:
        "Quickly adapt mentoring approaches based on student feedback, learning outcomes, and changing educational needs to optimize learning experience.",
      gradient: "from-lime-400 to-lime-600",
      priority: "Medium",
      timeframe: "Dynamic",
    },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical":
        return "bg-red-100 text-red-800 border-red-200";
      case "High":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "Medium":
        return "bg-[#1887A1]/10 text-[#0D4C5B] border-[#1887A1]/20";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="bg-white/90 backdrop-blur-md rounded-2xl p-8 flex flex-col items-center gap-4 shadow-lg">
          <div className="w-12 h-12 border-4 border-t-transparent border-[#1887A1] rounded-full animate-spin"></div>
          <div className="text-xl font-semibold text-[#0D4C5B]">
            Loading Your Mentor Dashboard...
          </div>
          <p className="text-sm text-gray-600 max-w-xs text-center">
            Preparing your personalized experience for guiding students to success.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Bar */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <div className="flex items-center">
                <div>
                  <Image
                    src="/skillmentorX.tm.png"
                    alt="Skill MentorX"
                    width={50}
                    height={50}
                  />
                </div>
                <span className="ml-2 text-xl font-bold bg-gradient-to-r from-[#1887A1] to-[#0D4C5B] bg-clip-text text-transparent">
                  SkillMentorX
                </span>
              </div>
              <a
                href="#dashboard"
                className="text-gray-600 hover:text-[#1887A1] transition-colors duration-200 font-medium"
              >
                Dashboard
              </a>
            </div>
            <div className="relative">
              <div
                className="w-8 h-8 bg-gradient-to-r from-[#1887A1] to-[#0D4C5B] rounded-full flex items-center justify-center cursor-pointer hover:scale-105 transition-transform duration-200 shadow-md"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <User className="w-4 h-4 text-white" />
              </div>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50 animate-dropdown">
                  <div className="px-4 py-2 text-[#0D4C5B] font-semibold border-b border-gray-100">
                    {userName ? `Welcome, ${userName}` : "Loading..."}
                  </div>
                  <Link
                    href="/mentorProfile"
                    className="block px-4 py-2 text-gray-600 hover:bg-[#1887A1]/10 hover:text-[#1887A1] transition-colors duration-200"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-gray-600 hover:bg-red-50 hover:text-red-600 flex items-center space-x-2 transition-colors duration-200"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#1887A1] to-[#0D4C5B] text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in-up">
              Hello{" "}
              <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                {userName ? userName : "Mentor"}
              </span>
            </h1>
            <h2 className="text-3xl md:text-4xl font-semibold mb-6 animate-fade-in-delay text-white/90">
              Your Mentor
              <span className="block bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent animate-pulse">
                Responsibilities
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-4xl mx-auto animate-fade-in-delay">
              Comprehensive overview of your duties and commitments as a mentor in our educational platform
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-12">
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-center transform hover:scale-105 transition-all duration-300 animate-bounce-gentle">
                <div className="text-2xl font-bold text-yellow-400">
                  10 AM - 3 PM
                </div>
                <div className="text-sm text-blue-100">Active Hours Daily</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-center transform hover:scale-105 transition-all duration-300 animate-bounce-gentle-delay">
                <div className="text-2xl font-bold text-yellow-400">Weekend</div>
                <div className="text-sm text-blue-100">Weekly Reviews</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-center transform hover:scale-105 transition-all duration-300 animate-bounce-gentle-delay-2">
                <div className="text-2xl font-bold text-yellow-400">24/7</div>
                <div className="text-sm text-blue-100">Commitment</div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Mentor Responsibilities Grid */}
      <section className="py-20 -mt-10 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 animate-fade-in-up">
              Your{" "}
              <span className="bg-gradient-to-r from-[#1887A1] to-[#0D4C5B] bg-clip-text text-transparent">
                Core
              </span>{" "}
              Responsibilities
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in-delay">
              Every responsibility is designed to ensure exceptional student outcomes and educational excellence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mentorResponsibilities.map((item, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 cursor-pointer border border-gray-100 animate-stagger"
                style={{
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                <div className="flex items-center justify-between mb-6">
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${item.gradient} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-md`}
                  >
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                  <div
                    className={`px-3 py-1 rounded-full text-xs font-semibold border ${getPriorityColor(
                      item.priority
                    )}`}
                  >
                    {item.priority}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-[#1887A1] transition-colors duration-200">
                  {item.title}
                </h3>

                <p className="text-gray-600 mb-6 leading-relaxed">
                  {item.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-500">
                      {item.timeframe}
                    </span>
                  </div>
                  <div className="flex items-center text-[#1887A1] font-medium group-hover:text-[#0D4C5B] transition-colors duration-200">
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Active Hours Highlight */}
      <section className="py-20 bg-gradient-to-r from-[#1887A1] to-[#0D4C5B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-12 animate-float">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-8 animate-pulse-slow">
              <Timer className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-4xl font-bold text-white mb-6">
              Critical Active Hours Requirement
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              As a mentor, you must be actively available from{" "}
              <strong>10:00 AM to 3:00 PM</strong> daily. This is when students
              need immediate support, real-time guidance, and instant query
              resolution.
            </p>
            <div className="text-lg text-blue-100 mb-4">
              Current Time: {currentTime.toLocaleTimeString()}
            </div>
            <div
              className={`inline-flex items-center px-6 py-3 rounded-full font-semibold text-lg transition-all duration-500 ${isActive ? "bg-green-500 text-white animate-pulse-success" : "bg-red-500 text-white animate-pulse-warning"
                }`}
            >
              <div
                className={`w-3 h-3 rounded-full mr-3 ${isActive ? "bg-green-200" : "bg-red-200"} animate-pulse`}
              ></div>
              {isActive ? "Currently Active & Available" : "Outside Active Hours"}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-[#1887A1] to-[#0D4C5B] rounded-xl flex items-center justify-center">
                <span className="text-white font-bold">M</span>
              </div>
              <span className="text-base sm:text-lg lg:text-xl font-bold tracking-wide text-gray-800 group-hover:text-[#1887A1] transition-colors duration-200 ml-1 sm:ml-2 truncate">
                SkillMentorX
              </span>
            </div>
            <p className="text-gray-400 mb-8">
              Excellence in mentorship through dedicated responsibility and commitment
            </p>
            <div className="border-t border-gray-800 pt-8">
              <p className="text-gray-500">
                © 2025 SkillMentorX. Transforming education through responsible mentorship.
              </p>
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-delay {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounce-gentle {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes pulse-slow {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
        }

        @keyframes pulse-success {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.4);
          }
          50% {
            box-shadow: 0 0 0 10px rgba(34, 197, 94, 0);
          }
        }

        @keyframes pulse-warning {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.4);
          }
          50% {
            box-shadow: 0 0 0 10px rgba(239, 68, 68, 0);
          }
        }

        @keyframes stagger {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes dropdown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }

        .animate-fade-in-delay {
          animation: fade-in-delay 0.8s ease-out 0.3s both;
        }

        .animate-bounce-gentle {
          animation: bounce-gentle 2s ease-in-out infinite;
        }

        .animate-bounce-gentle-delay {
          animation: bounce-gentle 2s ease-in-out infinite 0.2s;
        }

        .animate-bounce-gentle-delay-2 {
          animation: bounce-gentle 2s ease-in-out infinite 0.4s;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 2s ease-in-out infinite;
        }

        .animate-pulse-success {
          animation: pulse-success 2s infinite;
        }

        .animate-pulse-warning {
          animation: pulse-warning 2s infinite;
        }

        .animate-stagger {
          animation: stagger 0.6s ease-out both;
        }

        .animate-dropdown {
          animation: dropdown 0.2s ease-out;
        }
      `}</style>
    </div>
  );
};

export default MentorHomePage;