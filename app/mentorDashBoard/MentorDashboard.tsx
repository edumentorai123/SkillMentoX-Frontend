"use client";
import React, { useState } from "react";
import {
  LayoutDashboard,
  Users,
  Calendar,
  MessageCircle,
  User,
  Bell,
  Search,
  TrendingUp,
  Clock,
  Star,
  Video,
  Phone,
  MessageSquare,
} from "lucide-react";
import { useSelector } from "react-redux";
import Sidebar from "./Sidebar";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const upcomingSessions = [
    {
      id: 1,
      student: "Alex Chen",
      topic: "React Fundamentals",
      time: "2:00 PM",
      avatar: "AC",
    },
    {
      id: 2,
      student: "Sarah Wilson",
      topic: "JavaScript ES6",
      time: "4:30 PM",
      avatar: "SW",
    },
    {
      id: 3,
      student: "Mike Johnson",
      topic: "Node.js Backend",
      time: "6:00 PM",
      avatar: "MJ",
    },
  ];

  const recentChats = [
    {
      id: 1,
      student: "Emma Davis",
      message: "Thanks for the explanation on...",
      time: "5m ago",
      unread: 2,
    },
    {
      id: 2,
      student: "John Smith",
      message: "Could you review my code?",
      time: "12m ago",
      unread: 0,
    },
    {
      id: 3,
      student: "Lisa Wang",
      message: "The assignment is complete",
      time: "1h ago",
      unread: 1,
    },
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 font-sans">
      <div className="fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-64 flex flex-col">
        {/* Top Navigation */}
        <header className="bg-white/80 backdrop-blur-xl border-b border-slate-200/50 shadow-sm sticky top-0 z-40">
          <div className="flex items-center justify-between px-8 py-4">
            {/* Left Side - Title + Search */}
            <div className="flex items-center gap-4">
              <h2 className="text-2xl font-bold text-slate-800">
                Welcome back, mentor!
              </h2>
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Search students, sessions..."
                  className="pl-10 pr-4 py-2 w-80 bg-slate-100/70 rounded-xl border-0 focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all duration-300"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button className="p-2 rounded-xl bg-slate-100/70 hover:bg-white hover:shadow-lg transition-all duration-300 relative">
                <Bell size={20} className="text-slate-600" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
              </button>
              <div className="flex items-center gap-3 bg-white/70 rounded-xl px-4 py-2 hover:shadow-lg transition-all duration-300">
                <div className="w-10 h-10 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                  JD
                </div>
                <div>
                  <p className="font-semibold text-slate-800">John Doe</p>
                  <p className="text-sm text-slate-500">Senior Mentor</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="p-8 flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-500 text-sm font-medium">
                    Total Students
                  </p>
                  <p className="text-3xl font-bold text-slate-800 mt-2">124</p>
                  <p className="text-teal-600 text-sm mt-1">+12 this month</p>
                </div>
                <div className="p-3 bg-gradient-to-r from-teal-100 to-blue-100 rounded-xl">
                  <Users className="text-teal-600" size={24} />
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-500 text-sm font-medium">
                    Sessions Today
                  </p>
                  <p className="text-3xl font-bold text-slate-800 mt-2">8</p>
                  <p className="text-blue-600 text-sm mt-1">6 completed</p>
                </div>
                <div className="p-3 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-xl">
                  <Calendar className="text-blue-600" size={24} />
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-500 text-sm font-medium">
                    Average Rating
                  </p>
                  <p className="text-3xl font-bold text-slate-800 mt-2">4.9</p>
                  <div className="flex items-center mt-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star
                        key={i}
                        size={14}
                        className="text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                </div>
                <div className="p-3 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-xl">
                  <TrendingUp className="text-yellow-600" size={24} />
                </div>
              </div>
            </div>

            {/* Card 4 */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-500 text-sm font-medium">
                    Hours This Week
                  </p>
                  <p className="text-3xl font-bold text-slate-800 mt-2">32</p>
                  <p className="text-green-600 text-sm mt-1">
                    +4 from last week
                  </p>
                </div>
                <div className="p-3 bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl">
                  <Clock className="text-green-600" size={24} />
                </div>
              </div>
            </div>
          </div>

          {/* Sessions + Chats */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Upcoming Sessions */}
            <div className="lg:col-span-2">
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-slate-800">
                    Upcoming Sessions
                  </h3>
                  <button className="text-teal-600 hover:text-teal-700 font-medium">
                    View All
                  </button>
                </div>
                <div className="space-y-4">
                  {upcomingSessions.map((session) => (
                    <div
                      key={session.id}
                      className="bg-gradient-to-r from-slate-50 to-white rounded-xl p-4 hover:shadow-lg transition-all duration-300 hover:scale-[1.01] border border-slate-100"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                            {session.avatar}
                          </div>
                          <div>
                            <p className="font-semibold text-slate-800">
                              {session.student}
                            </p>
                            <p className="text-slate-500 text-sm">
                              {session.topic}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-slate-600 font-medium">
                            {session.time}
                          </span>
                          <div className="flex gap-2">
                            <button className="p-2 bg-teal-100 hover:bg-teal-200 rounded-lg transition-colors duration-200">
                              <Video size={16} className="text-teal-600" />
                            </button>
                            <button className="p-2 bg-blue-100 hover:bg-blue-200 rounded-lg transition-colors duration-200">
                              <Phone size={16} className="text-blue-600" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Chats */}
            <div className="space-y-6">
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-slate-800">
                    Recent Chats
                  </h3>
                  <button className="text-teal-600 hover:text-teal-700 font-medium">
                    View All
                  </button>
                </div>
                <div className="space-y-4">
                  {recentChats.map((chat) => (
                    <div
                      key={chat.id}
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-all duration-200 cursor-pointer"
                    >
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                        {chat.student
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-slate-800 truncate">
                          {chat.student}
                        </p>
                        <p className="text-sm text-slate-500 truncate">
                          {chat.message}
                        </p>
                        <p className="text-xs text-slate-400 mt-1">
                          {chat.time}
                        </p>
                      </div>
                      {chat.unread > 0 && (
                        <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                          {chat.unread}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
