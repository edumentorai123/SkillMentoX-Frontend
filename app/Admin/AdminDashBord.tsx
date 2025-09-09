"use client";
import React, { useState } from "react";
import {
  Search,
  Users,
  UserCheck,
  MessageSquare,
  Flag,
  Settings,
  BookOpen,
  AlertTriangle,
  CheckCircle,
  User,
  FileText,
} from "lucide-react";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("Dashboard");

  const sidebarItems = [
    {
      name: "Dashboard",
      icon: (
        <div className="w-4 h-4 grid grid-cols-2 gap-0.5">
          <div className="bg-current w-1.5 h-1.5"></div>
          <div className="bg-current w-1.5 h-1.5"></div>
          <div className="bg-current w-1.5 h-1.5"></div>
          <div className="bg-current w-1.5 h-1.5"></div>
        </div>
      ),
    },
    { name: "Users", icon: <Users size={18} /> },
    { name: "Mentors", icon: <UserCheck size={18} /> },
    { name: "Requests", icon: <FileText size={18} /> },
    { name: "add coursed", icon: <BookOpen size={18} /> },
  ];

  const statsCards = [
    {
      title: "Total Users",
      value: "2,847",
      change: "+12",
      changeType: "positive",
      icon: <Users size={24} />,
    },
     {
      title: "Total Mentors",
      value: "24",
      change: "+5",
      changeType: "positive",
      icon: <UserCheck size={24} />,
    },

    {
      title: "Total Sessions",
      value: "164",
      change: "",
      changeType: "",
      icon: <MessageSquare size={24} />,
    },
    {
      title: "Requests",
      value: "12",
      change: "",
      changeType: "",
      icon: <Flag size={24} />,
    },
  ];

  const weeklyData = [
    { day: "Mon", value: 15 },
    { day: "Tue", value: 45 },
    { day: "Wed", value: 35 },
    { day: "Thu", value: 30 },
    { day: "Fri", value: 40 },
    { day: "Sat", value: 55 },
    { day: "Sun", value: 50 },
  ];

  const recentActivities = [
    {
      type: "approval",
      title: "Mentor Application Approved",
      description: "Sarah Johnson has been approved as a Mathematics mentor",
      time: "2 mins ago",
      icon: <CheckCircle size={16} className="text-green-600" />,
    },
    {
      type: "registration",
      title: "New User Registration",
      description: "Michael Chen joined as a student",
      time: "15 mins ago",
      icon: <User size={16} className="text-blue-600" />,
    },
    {
      type: "report",
      title: "Content Reported",
      description: "Inappropriate message reported in Chemistry discussion",
      time: "1 hour ago",
      icon: <Flag size={16} className="text-red-600" />,
    },
    {
      type: "suspension",
      title: "User Account Suspended",
      description: "Alex Thompson suspended for policy violation",
      time: "2 hours ago",
      icon: <AlertTriangle size={16} className="text-yellow-600" />,
    },
    {
      type: "session",
      title: "Chat Session Started",
      description: "Physics tutoring session between Emma and Dr. Wilson",
      time: "3 hours ago",
      icon: <MessageSquare size={16} className="text-blue-600" />,
    },
  ];

  const maxValue = Math.max(...weeklyData.map((d) => d.value));

  return (
    <div className="flex h-screen bg-gray-50">
   

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-white shadow-sm border-b px-8 py-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800">
              Dashboard Overview
            </h2>
            <div className="relative">
              <Search
                size={20}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search users, Mentors or reports"
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg w-80 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="flex-1 overflow-y-auto p-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {statsCards.map((card, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl p-6 border border-cyan-100"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="text-gray-600">{card.icon}</div>
                  {card.change && (
                    <span
                      className={`text-sm font-semibold px-2 py-1 rounded-full ${
                        card.changeType === "positive"
                          ? "text-green-700 bg-green-100"
                          : "text-red-700 bg-red-100"
                      }`}
                    >
                      {card.change}
                    </span>
                  )}
                </div>
                <h3 className="text-3xl font-bold text-gray-800 mb-1">
                  {card.value}
                </h3>
                <p className="text-gray-600 text-sm">{card.title}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Weekly Chart */}
            <div className="lg:col-span-2 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl p-6 border border-cyan-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-6">
                Weekly Activity
              </h3>
              <div className="flex items-end space-x-4 h-48">
                {weeklyData.map((data, index) => (
                  <div
                    key={data.day}
                    className="flex flex-col items-center flex-1"
                  >
                    <div
                      className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-md transition-all duration-500 hover:from-blue-600 hover:to-blue-500"
                      style={{
                        height: `${(data.value / maxValue) * 160}px`,
                        minHeight: "20px",
                      }}
                    ></div>
                    <span className="text-sm text-gray-600 mt-2 font-medium">
                      {data.day}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center">
                <div className="inline-flex items-center space-x-4 text-sm text-gray-600">
                  <span>0</span>
                  <span>20</span>
                  <span>40</span>
                  <span>60</span>
                </div>
              </div>
            </div>

            {/* User Roles Distribution */}
            <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl p-6 border border-cyan-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-6">
                User Roles Distribution
              </h3>
              <div className="flex flex-col items-center">
                <div className="relative w-32 h-32 mb-6">
                  <svg
                    className="w-32 h-32 transform -rotate-90"
                    viewBox="0 0 100 100"
                  >
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="#e5e7eb"
                      strokeWidth="10"
                      fill="none"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="#0891b2"
                      strokeWidth="10"
                      fill="none"
                      strokeDasharray="196"
                      strokeDashoffset="43"
                      className="transition-all duration-1000"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl font-bold text-gray-800">
                      78%
                    </span>
                  </div>
                </div>
                <div className="flex justify-center space-x-6 text-sm">
                  <div className="text-center">
                    <div className="w-3 h-3 bg-cyan-600 rounded-full mx-auto mb-1"></div>
                    <span className="text-gray-600 font-medium">Students</span>
                  </div>
                  <div className="text-center">
                    <div className="w-3 h-3 bg-gray-300 rounded-full mx-auto mb-1"></div>
                    <span className="text-gray-600 font-medium">Mentor</span>
                  </div>
                  <div className="text-center">
                    <div className="w-3 h-3 bg-gray-200 rounded-full mx-auto mb-1"></div>
                    <span className="text-gray-600 font-medium">Admin</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="mt-8">
            <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl p-6 border border-cyan-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-6">
                Recent Activity
              </h3>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div
                    key={index}
                    className={`flex items-start space-x-4 p-4 rounded-lg transition-colors hover:bg-white/50 ${
                      index === recentActivities.length - 1
                        ? "border-2 border-blue-300 bg-blue-50/50"
                        : "bg-white/30"
                    }`}
                  >
                    <div className="flex-shrink-0 mt-1">{activity.icon}</div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-gray-800 mb-1">
                        {activity.title}
                      </h4>
                      <p className="text-sm text-gray-600 mb-1">
                        {activity.description}
                      </p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
