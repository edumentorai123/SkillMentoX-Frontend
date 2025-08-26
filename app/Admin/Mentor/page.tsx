"use client";
import React, { useState } from "react";
import {
  Search,
  Users,
  UserCheck,
  MessageSquare,
  FileText,
  BookOpen,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  UserPlus,
  Star,
  Award,
  Clock,
  CheckCircle,
  X,
  Ban,
} from "lucide-react";

const MentorsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [selectedMentors, setSelectedMentors] = useState([]);

  const mentors = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      email: "sarah.johnson@email.com",
      subject: "Mathematics",
      expertise: ["Calculus", "Algebra", "Statistics"],
      status: "Active",
      joinDate: "2023-08-15",
      lastActive: "2 mins ago",
      totalSessions: 89,
      rating: 4.9,
      studentsHelped: 45,
      avatar: "SJ",
      verified: true,
    },
    {
      id: 2,
      name: "Prof. Michael Chen",
      email: "michael.chen@email.com",
      subject: "Physics",
      expertise: ["Quantum Physics", "Mechanics", "Thermodynamics"],
      status: "Active",
      joinDate: "2023-09-20",
      lastActive: "15 mins ago",
      totalSessions: 67,
      rating: 4.8,
      studentsHelped: 38,
      avatar: "MC",
      verified: true,
    },
    {
      id: 3,
      name: "Dr. Emily Rodriguez",
      email: "emily.rodriguez@email.com",
      subject: "Chemistry",
      expertise: ["Organic Chemistry", "Biochemistry", "Lab Techniques"],
      status: "Inactive",
      joinDate: "2023-07-10",
      lastActive: "3 days ago",
      totalSessions: 34,
      rating: 4.7,
      studentsHelped: 22,
      avatar: "ER",
      verified: true,
    },
    {
      id: 4,
      name: "Dr. Robert Smith",
      email: "robert.smith@email.com",
      subject: "Computer Science",
      expertise: ["Programming", "Data Structures", "Algorithms"],
      status: "Active",
      joinDate: "2023-06-05",
      lastActive: "1 hour ago",
      totalSessions: 156,
      rating: 4.9,
      studentsHelped: 78,
      avatar: "RS",
      verified: true,
    },
    {
      id: 5,
      name: "Dr. Amanda Wilson",
      email: "amanda.wilson@email.com",
      subject: "Biology",
      expertise: ["Molecular Biology", "Genetics", "Cell Biology"],
      status: "Pending",
      joinDate: "2024-01-15",
      lastActive: "20 mins ago",
      totalSessions: 12,
      rating: 4.6,
      studentsHelped: 8,
      avatar: "AW",
      verified: false,
    },
    {
      id: 6,
      name: "Prof. David Lee",
      email: "david.lee@email.com",
      subject: "Economics",
      expertise: ["Microeconomics", "Macroeconomics", "Statistics"],
      status: "Active",
      joinDate: "2023-10-12",
      lastActive: "5 mins ago",
      totalSessions: 78,
      rating: 4.8,
      studentsHelped: 42,
      avatar: "DL",
      verified: true,
    },
    {
      id: 7,
      name: "Dr. Lisa Thompson",
      email: "lisa.thompson@email.com",
      subject: "English Literature",
      expertise: ["Literary Analysis", "Creative Writing", "Grammar"],
      status: "Suspended",
      joinDate: "2023-05-20",
      lastActive: "1 week ago",
      totalSessions: 45,
      rating: 4.3,
      studentsHelped: 28,
      avatar: "LT",
      verified: true,
    },
    {
      id: 8,
      name: "Dr. James Martinez",
      email: "james.martinez@email.com",
      subject: "History",
      expertise: ["World History", "American History", "Research Methods"],
      status: "Active",
      joinDate: "2023-11-08",
      lastActive: "30 mins ago",
      totalSessions: 23,
      rating: 4.7,
      studentsHelped: 15,
      avatar: "JM",
      verified: true,
    },
  ];

  const filters = [
    "All",
    "Active",
    "Inactive",
    "Pending",
    "Suspended",
    "Verified",
    "Unverified",
  ];

  const filteredMentors = mentors.filter((mentor) => {
    const matchesSearch =
      mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentor.subject.toLowerCase().includes(searchTerm.toLowerCase());

    let matchesFilter = true;
    if (selectedFilter === "Verified") matchesFilter = mentor.verified;
    else if (selectedFilter === "Unverified") matchesFilter = !mentor.verified;
    else if (selectedFilter !== "All")
      matchesFilter = mentor.status === selectedFilter;

    return matchesSearch && matchesFilter;
  });

  const handleMentorSelect = (mentorId) => {
    setSelectedMentors((prev) =>
      prev.includes(mentorId)
        ? prev.filter((id) => id !== mentorId)
        : [...prev, mentorId]
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800 border-green-200";
      case "Inactive":
        return "bg-gray-100 text-gray-800 border-gray-200";
      case "Pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Suspended":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={14}
        className={
          i < Math.floor(rating)
            ? "text-yellow-400 fill-current"
            : "text-gray-300"
        }
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Mentors Management
              </h1>
              <p className="text-gray-600">
                Manage and monitor your mentor network
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search mentors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full sm:w-80 pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1887A1] focus:border-transparent bg-white"
                />
              </div>
              <button className="px-6 py-3 bg-[#1887A1] text-white rounded-lg hover:bg-[#0D4C5B] transition-colors flex items-center justify-center space-x-2 font-medium">
                <UserPlus size={20} />
                <span>Add Mentor</span>
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <UserCheck size={24} className="text-blue-600" />
                </div>
                <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-semibold">
                  +5
                </span>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">24</div>
              <div className="text-gray-600 text-sm">Total Mentors</div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <CheckCircle size={24} className="text-green-600" />
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">19</div>
              <div className="text-gray-600 text-sm">Active Mentors</div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-yellow-100 rounded-lg">
                  <Clock size={24} className="text-yellow-600" />
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">3</div>
              <div className="text-gray-600 text-sm">Pending Approval</div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-orange-100 rounded-lg">
                  <Award size={24} className="text-orange-600" />
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">4.8</div>
              <div className="text-gray-600 text-sm">Average Rating</div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-6">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-gray-700">
                <Filter size={20} />
                <span className="font-medium">Filter by:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {filters.map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setSelectedFilter(filter)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      selectedFilter === filter
                        ? "bg-[#1887A1] text-white shadow-md"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mentors Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-[#1887A1] focus:ring-[#1887A1]"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedMentors(filteredMentors.map((m) => m.id));
                        } else {
                          setSelectedMentors([]);
                        }
                      }}
                    />
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Mentor
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Subject
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Rating
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Sessions
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Students
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Last Active
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredMentors.map((mentor) => (
                  <tr
                    key={mentor.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-[#1887A1] focus:ring-[#1887A1]"
                        checked={selectedMentors.includes(mentor.id)}
                        onChange={() => handleMentorSelect(mentor.id)}
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#1887A1] to-[#0D4C5B] rounded-full flex items-center justify-center text-white font-semibold text-sm relative shadow-sm">
                          {mentor.avatar}
                          {mentor.verified && (
                            <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center border-2 border-white">
                              <CheckCircle size={12} className="text-white" />
                            </div>
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-semibold text-gray-900">
                            {mentor.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {mentor.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">
                        {mentor.subject}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {mentor.expertise.slice(0, 2).join(", ")}
                        {mentor.expertise.length > 2 && "..."}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full border ${getStatusColor(
                          mentor.status
                        )}`}
                      >
                        {mentor.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center">
                          {renderStars(mentor.rating)}
                        </div>
                        <span className="text-sm font-medium text-gray-900">
                          {mentor.rating}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-gray-900">
                        {mentor.totalSessions}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-gray-900">
                        {mentor.studentsHelped}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600">
                        {mentor.lastActive}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <button
                          className="text-[#1887A1] hover:text-[#0D4C5B] transition-colors p-1"
                          title="View Profile"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          className="text-gray-600 hover:text-gray-900 transition-colors p-1"
                          title="Edit"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          className="text-red-600 hover:text-red-800 transition-colors p-1"
                          title="Remove"
                        >
                          <Trash2 size={16} />
                        </button>
                        <button className="text-gray-400 hover:text-gray-600 transition-colors p-1">
                          <MoreVertical size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="bg-white px-6 py-4 flex items-center justify-between border-t border-gray-200">
            <div className="flex-1 flex justify-between sm:hidden">
              <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                Previous
              </button>
              <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">1</span> to{" "}
                  <span className="font-medium">8</span> of{" "}
                  <span className="font-medium">{filteredMentors.length}</span>{" "}
                  results
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                  <button className="relative inline-flex items-center px-3 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors">
                    Previous
                  </button>
                  <button className="bg-[#1887A1] border-[#1887A1] text-white relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                    1
                  </button>
                  <button className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium transition-colors">
                    2
                  </button>
                  <button className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium transition-colors">
                    3
                  </button>
                  <button className="relative inline-flex items-center px-3 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors">
                    Next
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>

        {/* Bulk Actions Floating Panel */}
        {selectedMentors.length > 0 && (
          <div className="fixed bottom-8 right-8 bg-white rounded-xl shadow-2xl border border-gray-200 p-6 z-50">
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-gray-600">
                {selectedMentors.length} mentor
                {selectedMentors.length !== 1 ? "s" : ""} selected
              </span>
              <div className="flex space-x-2">
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm flex items-center space-x-2 transition-colors">
                  <CheckCircle size={16} />
                  <span>Approve</span>
                </button>
                <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm flex items-center space-x-2 transition-colors">
                  <Ban size={16} />
                  <span>Suspend</span>
                </button>
                <button
                  onClick={() => setSelectedMentors([])}
                  className="px-3 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 text-sm transition-colors"
                  title="Clear selection"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MentorsPage;
