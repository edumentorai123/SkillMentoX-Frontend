"use client";
import React, { useEffect, useState } from "react";
import {LayoutDashboard,Users,Calendar,
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
import Sidebar from "./Sidebar";
import axios from "axios";
import axiosClient from "../lib/axiosClient";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [mentorName, setMentorName] = useState("mentor");
  const [loading, setLoading] = useState(true);
  const [ totalStudents, setTotalStudents] = useState(124);


  useEffect(() => {
    const fetchTotalStudents = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axiosClient.get("/api/admin/getAllStudents", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTotalStudents(response.data.length); 
      } catch (err) {
        console.error("Error fetching students:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTotalStudents();
  }, []);

  
  useEffect(() => {
    const fetchMentorDetails = async () => {
      try {
        const mentorId = localStorage.getItem("mentorId") || "123";
        const token = localStorage.getItem("token");
        const auth = JSON.parse(localStorage.getItem("auth") || "{}");

        const initialName = auth.user
          ? `${auth.user.firstName} ${auth.user.lastName}`
          : "mentor";
        setMentorName(initialName);

        const response = await axiosClient.get(`/mentor/getMentorDetails${mentorId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const { username } = response.data.mentor;
        setMentorName(username || initialName);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };

    fetchMentorDetails();
  }, []);


  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 font-sans">
      <div className="fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50">
        <Sidebar/>
      </div>
      <div className="flex-1 ml-64 flex flex-col">
        <header className="bg-white/80 backdrop-blur-xl border-b border-slate-200/50 shadow-sm sticky top-0 z-40">
          <div className="flex items-center justify-between px-8 py-4">
            <div className="flex items-center gap-4">
              <h2 className="text-2xl font-bold text-slate-800">
                Welcome back, {loading ? "mentor" : mentorName}!
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
              <div className="flex items-center gap-3 bg-white/70 rounded-xl px-4 py-2 hover:shadow-lg transition-all duration-300"></div>
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
                  <p className="text-3xl font-bold text-slate-800 mt-2">
                    {loading ? "..." : totalStudents}
                  </p>
                  <p className="text-teal-600 text-sm mt-1">+12 this month</p>
                </div>
                <div className="p-3 bg-gradient-to-r from-teal-100 to-blue-100 rounded-xl">
                  <Users className="text-teal-600" size={24} />
                </div>
              </div>
            </div>

           

            {/* Card 3 */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-500 text-sm font-medium">
                    Student Doubuts
                  </p>
                  <p className="text-3xl font-bold text-slate-800 mt-2">0</p>
                  <div className="flex items-center mt-1"></div>
                </div>
                <div className="p-3 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-xl">
                  <TrendingUp className="text-yellow-600" size={24} />
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
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
