"use client";
import React, { useState } from "react";
import {
  Star,
  MapPin,
  Clock,
  Users,
  Award,
  Calendar,
  MessageCircle,
  Heart,
  Share2,
  CheckCircle,
  Globe,
  Linkedin,
  Github,
  Twitter,
} from "lucide-react";
import Sidebar from "../Sidebar";

const MentorProfilePage = () => {
  const [activeTab, setActiveTab] = useState("about");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const mentorData = {
    name: "Dr. Sarah Chen",
    title: "Senior Full-Stack Developer & AI Specialist",
    company: "Google",
    location: "San Francisco, CA",
    avatar: "SC",
    rating: 4.9,
    totalStudents: 1240,
    experience: 8,
    responseTime: "< 2 hours",
    languages: ["English", "Mandarin", "Spanish"],
    totalSessions: 890,
    expertise: [
      "React",
      "Python",
      "Machine Learning",
      "System Design",
      "Cloud Architecture",
    ],
    bio: "Passionate educator with 8+ years at top tech companies. I specialize in helping developers transition into senior roles and master complex technical concepts.",
    achievements: [
      "Google Cloud Certified Professional",
      "Published 15+ research papers",
      "Speaker at 20+ tech conferences",
      "Mentored 1000+ developers globally",
    ],
    socialLinks: {
      linkedin: "#",
      github: "#",
      twitter: "#",
    },
  };


  const availableSlots = [
    { day: "Today", slots: ["2:00 PM", "4:30 PM", "6:00 PM"] },
    { day: "Tomorrow", slots: ["10:00 AM", "1:00 PM", "3:30 PM", "5:00 PM"] },
    { day: "Friday", slots: ["9:00 AM", "11:30 AM", "2:00 PM", "4:00 PM"] },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex">
    

        <Sidebar />
  

      {/* Main content on the right */}
      <main className="flex-1 px-6 py-8 overflow-y-auto">
        {/* Hero Section */}
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 mb-8 border border-white/50 shadow-xl">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Column - Mentor Info */}
            <div className="flex-1">
              <div className="flex items-start gap-6 mb-6">
                <div className="relative">
                  <div className="w-32 h-32 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-2xl flex items-center justify-center text-white text-4xl font-bold shadow-2xl">
                    {mentorData.avatar}
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                </div>

                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-gray-800 mb-1">
                    {mentorData.name}
                  </h1>
                  <p className="text-xl text-gray-600 mb-2">
                    {mentorData.title}
                  </p>
                  <div className="flex items-center gap-2 text-gray-500 mb-3">
                    <span className="font-medium">{mentorData.company}</span>
                    <span>•</span>
                    <MapPin className="w-4 h-4" />
                    <span>{mentorData.location}</span>
                  </div>

                  <div className="flex items-center gap-6 mb-4">
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5 text-yellow-500 fill-current" />
                      <span className="font-bold text-lg">
                        {mentorData.rating}
                      </span>
                      <span className="text-gray-500">
                        ({mentorData.totalReviews} reviews)
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-blue-500" />
                      <span className="font-medium">
                        {mentorData.totalStudents} students
                      </span>
                    </div>
                  </div>

                  {/* Expertise Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {mentorData.expertise.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 rounded-full text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Social Links */}
                  <div className="flex gap-3">
                    <a
                      href={mentorData.socialLinks.linkedin}
                      className="p-2 rounded-lg bg-blue-100 hover:bg-blue-200 transition-colors"
                    >
                      <Linkedin className="w-5 h-5 text-blue-600" />
                    </a>
                    <a
                      href={mentorData.socialLinks.github}
                      className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                    >
                      <Github className="w-5 h-5 text-gray-700" />
                    </a>
                    <a
                      href={mentorData.socialLinks.twitter}
                      className="p-2 rounded-lg bg-blue-100 hover:bg-blue-200 transition-colors"
                    >
                      <Twitter className="w-5 h-5 text-blue-500" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

         
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-8 bg-white/50 backdrop-blur-sm p-2 rounded-2xl border border-white/50">
          {[
            { id: "about", label: "About" },
            { id: "courses", label: "Courses" },
            { id: "experience", label: "Experience" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 px-6 py-3 rounded-xl transition-all duration-300 ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg"
                  : "text-gray-600 hover:bg-white/70"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

       
        {activeTab === "about" && (
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              About Me
            </h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              {mentorData.bio}
            </p>
            <h4 className="font-semibold mb-3 text-gray-800">
              Key Achievements
            </h4>
            <ul className="space-y-2">
              {mentorData.achievements.map((ach, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 text-gray-700"
                >
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  {ach}
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>
    </div>
  );
};

export default MentorProfilePage;
