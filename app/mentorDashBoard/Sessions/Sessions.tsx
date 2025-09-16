"use client";
import React, { useState } from "react";
import {
  Search,
  Plus,
  Calendar,
  Users,
  Video,
  Eye,
  X,
  Clock,
  CheckCircle,
  Play,
} from "lucide-react";
import Sidebar from "../Sidebar";

const SessionsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("Upcoming");

  // Updated mock data for sessions (refreshed for 2025-09-15)
  const sessions = [
    {
      id: 1,
      title: "JavaScript Advanced Patterns Review",
      date: "2025-09-18",
      time: "10:30 AM",
      students: [
        { name: "Sarah Chen", avatar: "SC" },
        { name: "Mike Rodriguez", avatar: "MR" },
      ],
      status: "Upcoming",
      duration: "60 min",
    },
    {
      id: 2,
      title: "React Hooks Deep Dive",
      date: "2025-09-15",
      time: "2:00 PM",
      students: [{ name: "Alex Johnson", avatar: "AJ" }],
      status: "Ongoing",
      duration: "90 min",
    },
    {
      id: 3,
      title: "Database Optimization Workshop",
      date: "2025-09-20",
      time: "9:00 AM",
      students: [
        { name: "Emma Davis", avatar: "ED" },
        { name: "John Smith", avatar: "JS" },
        { name: "Lisa Wang", avatar: "LW" },
      ],
      status: "Upcoming",
      duration: "120 min",
    },
    {
      id: 4,
      title: "Career Development Session",
      date: "2025-09-12",
      time: "4:30 PM",
      students: [{ name: "David Brown", avatar: "DB" }],
      status: "Completed",
      duration: "45 min",
    },
    {
      id: 5,
      title: "Next.js API Routes Tutorial",
      date: "2025-09-25",
      time: "11:00 AM",
      students: [
        { name: "Sophie Turner", avatar: "ST" },
        { name: "Ryan Lee", avatar: "RL" },
      ],
      status: "Upcoming",
      duration: "75 min",
    },
  ];

  const filterTabs = ["Upcoming", "Ongoing", "Completed"];

  const getStatusColor = (status) => {
    switch (status) {
      case "Upcoming":
        return "bg-blue-100 text-blue-800";
      case "Ongoing":
        return "bg-green-100 text-green-800";
      case "Completed":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Upcoming":
        return <Clock className="w-3 h-3" />;
      case "Ongoing":
        return <Play className="w-3 h-3" />;
      case "Completed":
        return <CheckCircle className="w-3 h-3" />;
      default:
        return <Clock className="w-3 h-3" />;
    }
  };

  const filteredSessions = sessions.filter((session) => {
    const matchesSearch =
      session.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      session.students.some((student) =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    const matchesFilter =
      activeFilter === "All" || session.status === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const options = {
      day: "numeric",
      month: "short",
      year: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200">
        <Sidebar/>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            {/* Title and Subtitle */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Sessions</h1>
              <p className="text-gray-600 mt-1">
                View and manage your mentoring sessions
              </p>
            </div>

            {/* Create Session Button */}
            <button className="inline-flex items-center px-4 py-2 bg-teal-700 text-white rounded-lg hover:bg-teal-800 transition-colors duration-200 shadow-sm">
              <Plus className="w-5 h-5 mr-2" />
              Create Session
            </button>
          </div>

          {/* Search and Filter Section */}
          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            {/* Search Bar */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Filter by session name, student name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all duration-200"
              />
            </div>

            {/* Filter Tabs */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              {filterTabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveFilter(tab)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    activeFilter === tab
                      ? "bg-white text-teal-700 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Sessions Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredSessions.length === 0 ? (
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No sessions found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSessions.map((session) => (
              <div
                key={session.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 hover:-translate-y-1"
              >
                <div className="p-6">
                  {/* Session Header */}
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                      {session.title}
                    </h3>
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        session.status
                      )}`}
                    >
                      {getStatusIcon(session.status)}
                      {session.status}
                    </span>
                  </div>

                  {/* Date and Time */}
                  <div className="flex items-center text-gray-600 mb-3">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span className="text-sm">
                      {formatDate(session.date)} • {session.time}
                    </span>
                    <span className="ml-auto text-xs bg-gray-100 px-2 py-1 rounded">
                      {session.duration}
                    </span>
                  </div>

                  {/* Students */}
                  <div className="mb-6">
                    <div className="flex items-center mb-2">
                      <Users className="w-4 h-4 text-gray-500 mr-2" />
                      <span className="text-sm font-medium text-gray-700">
                        Students ({session.students.length})
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {session.students.slice(0, 3).map((student, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center text-xs font-semibold text-teal-700">
                            {student.avatar}
                          </div>
                          {index < 2 && index < session.students.length - 1 && (
                            <span className="text-sm text-gray-600">
                              {student.name.split(" ")[0]}
                            </span>
                          )}
                        </div>
                      ))}
                      {session.students.length > 3 && (
                        <span className="text-xs text-gray-500">
                          +{session.students.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    {session.status === "Ongoing" && (
                      <button className="flex-1 inline-flex items-center justify-center px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 text-sm font-medium">
                        <Video className="w-4 h-4 mr-2" />
                        Join
                      </button>
                    )}
                    {session.status === "Upcoming" && (
                      <button className="flex-1 inline-flex items-center justify-center px-3 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors duration-200 text-sm font-medium">
                        <Video className="w-4 h-4 mr-2" />
                        Join
                      </button>
                    )}

                    <button className="inline-flex items-center justify-center px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                      <Eye className="w-4 h-4" />
                    </button>

                    {session.status !== "Completed" && (
                      <button className="inline-flex items-center justify-center px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SessionsPage;