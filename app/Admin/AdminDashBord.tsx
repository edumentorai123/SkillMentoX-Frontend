"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Search,
  Users,
  UserCheck,
  MessageSquare,
  Flag,
  BookOpen,
  FileText,
} from "lucide-react";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [totalMentors, setTotalMentors] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);


  const fetchTotalMentors = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        "http://localhost:9999/api/admin/approved/count",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Mentors API response:", res.data);
      setTotalMentors(res.data.count);
    } catch (error: any) {
      console.error(
        "Error fetching total mentors:",
        error.response?.data || error.message
      );
    }
  };

  // ✅ Fetch total registered users (verified only)
  const fetchTotalUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        "http://localhost:9999/api/admin/totalUsers",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Users API response:", res.data);
      setTotalUsers(res.data.verifiedUsersCount); // API gives { verifiedUsersCount: number }
    } catch (error: any) {
      console.error(
        "Error fetching total users:",
        error.response?.data || error.message
      );
    }
  };

  // ✅ Call APIs on component mount
  useEffect(() => {
    fetchTotalMentors();
    fetchTotalUsers();
  }, []);

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
    { name: "Add Course", icon: <BookOpen size={18} /> },
  ];

  const statsCards = [
    {
      title: "Total Registered Users",
      value: totalUsers,
      changeType: "positive",
      icon: <Users size={24} />,
    },
    {
      title: "Total Mentors",
      value: totalMentors,
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
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
