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
  Eye,
  CheckCircle,
  X,
  Clock,
  AlertCircle,
  User,
  Flag,
  MessageCircle,
  UserPlus,
  School,
  Calendar,
  ArrowRight,
} from "lucide-react";

const RequestsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [selectedRequests, setSelectedRequests] = useState([]);

  const requests = [
    {
      id: 1,
      type: "Mentor Application",
      title: "Mathematics Mentor Application",
      description: "Sarah Johnson applying to become a Mathematics mentor",
      requester: "Sarah Johnson",
      requesterEmail: "sarah.johnson@email.com",
      status: "Pending",
      priority: "High",
      dateSubmitted: "2024-08-20",
      lastUpdated: "2 mins ago",
      category: "Application",
      details: "PhD in Mathematics, 5 years teaching experience",
      avatar: "SJ",
    },
    {
      id: 2,
      type: "Account Recovery",
      title: "Password Reset Request",
      description: "Michael Chen requesting account password reset",
      requester: "Michael Chen",
      requesterEmail: "michael.chen@email.com",
      status: "In Progress",
      priority: "Medium",
      dateSubmitted: "2024-08-19",
      lastUpdated: "15 mins ago",
      category: "Support",
      details: "Lost access to email account",
      avatar: "MC",
    },
    {
      id: 3,
      type: "Content Report",
      title: "Inappropriate Content in Chemistry Forum",
      description: "Report of inappropriate message in Chemistry discussion",
      requester: "Emma Wilson",
      requesterEmail: "emma.wilson@email.com",
      status: "Under Review",
      priority: "High",
      dateSubmitted: "2024-08-18",
      lastUpdated: "1 hour ago",
      category: "Moderation",
      details: "Spam messages disrupting learning environment",
      avatar: "EW",
    },
    {
      id: 4,
      type: "Session Request",
      title: "Emergency Tutoring Session",
      description: "Urgent request for Physics tutoring before exam",
      requester: "Alex Thompson",
      requesterEmail: "alex.thompson@email.com",
      status: "Approved",
      priority: "High",
      dateSubmitted: "2024-08-17",
      lastUpdated: "2 hours ago",
      category: "Tutoring",
      details: "Final exam in 2 days, need help with Thermodynamics",
      avatar: "AT",
    },
    {
      id: 5,
      type: "Course Addition",
      title: "Add Advanced Biology Course",
      description: "Request to add Advanced Molecular Biology course",
      requester: "Dr. Robert Smith",
      requesterEmail: "robert.smith@email.com",
      status: "Pending",
      priority: "Low",
      dateSubmitted: "2024-08-16",
      lastUpdated: "3 hours ago",
      category: "Curriculum",
      details: "Graduate-level course for advanced students",
      avatar: "RS",
    },
    {
      id: 6,
      type: "Technical Issue",
      title: "Video Call Connection Problems",
      description: "Unable to connect to mentoring sessions",
      requester: "Lisa Davis",
      requesterEmail: "lisa.davis@email.com",
      status: "Resolved",
      priority: "Medium",
      dateSubmitted: "2024-08-15",
      lastUpdated: "1 day ago",
      category: "Technical",
      details: "Browser compatibility issues with video platform",
      avatar: "LD",
    },
    {
      id: 7,
      type: "Refund Request",
      title: "Session Cancellation Refund",
      description: "Requesting refund for cancelled tutoring session",
      requester: "John Martinez",
      requesterEmail: "john.martinez@email.com",
      status: "Rejected",
      priority: "Low",
      dateSubmitted: "2024-08-14",
      lastUpdated: "2 days ago",
      category: "Financial",
      details: "Session cancelled within 24-hour policy window",
      avatar: "JM",
    },
    {
      id: 8,
      type: "Feature Request",
      title: "Mobile App Development",
      description: "Request for dedicated mobile application",
      requester: "Amanda Lee",
      requesterEmail: "amanda.lee@email.com",
      status: "Under Review",
      priority: "Medium",
      dateSubmitted: "2024-08-13",
      lastUpdated: "3 days ago",
      category: "Development",
      details: "Better mobile experience for students and mentors",
      avatar: "AL",
    },
  ];

  const filters = [
    "All",
    "Pending",
    "In Progress",
    "Under Review",
    "Approved",
    "Resolved",
    "Rejected",
  ];
  const categories = [
    "All Categories",
    "Application",
    "Support",
    "Moderation",
    "Tutoring",
    "Curriculum",
    "Technical",
    "Financial",
    "Development",
  ];

  const filteredRequests = requests.filter((request) => {
    const matchesSearch =
      request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.requester.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      selectedFilter === "All" || request.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const handleRequestSelect = (requestId) => {
    setSelectedRequests((prev) =>
      prev.includes(requestId)
        ? prev.filter((id) => id !== requestId)
        : [...prev, requestId]
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "In Progress":
        return "bg-blue-100 text-blue-800";
      case "Under Review":
        return "bg-purple-100 text-purple-800";
      case "Approved":
        return "bg-green-100 text-green-800";
      case "Resolved":
        return "bg-green-100 text-green-800";
      case "Rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      case "Low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case "Mentor Application":
        return <UserPlus size={16} className="text-blue-600" />;
      case "Account Recovery":
        return <User size={16} className="text-green-600" />;
      case "Content Report":
        return <Flag size={16} className="text-red-600" />;
      case "Session Request":
        return <MessageCircle size={16} className="text-purple-600" />;
      case "Course Addition":
        return <School size={16} className="text-orange-600" />;
      case "Technical Issue":
        return <AlertCircle size={16} className="text-gray-600" />;
      case "Refund Request":
        return <FileText size={16} className="text-yellow-600" />;
      case "Feature Request":
        return <MessageSquare size={16} className="text-indigo-600" />;
      default:
        return <FileText size={16} className="text-gray-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-white flex">
      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-gray-900">
              Requests Management
            </h2>
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search requests by title, type or requester"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-80 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1887A1]"
              />
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-4 gap-6 mb-6">
            <div className="bg-[#B8E6F0] p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <FileText size={24} className="text-gray-700" />
                <span className="text-blue-600 font-semibold text-sm">+3</span>
              </div>
              <div className="text-2xl font-bold text-gray-900">12</div>
              <div className="text-gray-700 text-sm">Total Requests</div>
            </div>
            <div className="bg-[#B8E6F0] p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <Clock size={24} className="text-yellow-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">5</div>
              <div className="text-gray-700 text-sm">Pending Review</div>
            </div>
            <div className="bg-[#B8E6F0] p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <AlertCircle size={24} className="text-red-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">3</div>
              <div className="text-gray-700 text-sm">High Priority</div>
            </div>
            <div className="bg-[#B8E6F0] p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <CheckCircle size={24} className="text-green-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">8</div>
              <div className="text-gray-700 text-sm">Resolved Today</div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex items-center space-x-4 mb-6">
            <Filter className="text-gray-500" size={20} />
            <div className="flex space-x-2 overflow-x-auto">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setSelectedFilter(filter)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                    selectedFilter === filter
                      ? "bg-[#1887A1] text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Requests Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedRequests(
                            filteredRequests.map((r) => r.id)
                          );
                        } else {
                          setSelectedRequests([]);
                        }
                      }}
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Request
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Requester
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Priority
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Updated
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredRequests.map((request) => (
                  <tr key={request.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300"
                        checked={selectedRequests.includes(request.id)}
                        onChange={() => handleRequestSelect(request.id)}
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 mt-1">
                          {getTypeIcon(request.type)}
                        </div>
                        <div className="min-w-0">
                          <div className="text-sm font-medium text-gray-900">
                            {request.title}
                          </div>
                          <div className="text-sm text-gray-500">
                            {request.description}
                          </div>
                          <div className="text-xs text-gray-400 mt-1">
                            {request.type}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-[#1887A1] rounded-full flex items-center justify-center text-white font-medium text-sm">
                          {request.avatar}
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">
                            {request.requester}
                          </div>
                          <div className="text-xs text-gray-500">
                            {request.requesterEmail}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                          request.status
                        )}`}
                      >
                        {request.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(
                          request.priority
                        )}`}
                      >
                        {request.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {request.dateSubmitted}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {request.lastUpdated}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          className="text-[#1887A1] hover:text-[#0D4C5B]"
                          title="View Details"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          className="text-green-600 hover:text-green-900"
                          title="Approve"
                        >
                          <CheckCircle size={16} />
                        </button>
                        <button
                          className="text-red-600 hover:text-red-900"
                          title="Reject"
                        >
                          <X size={16} />
                        </button>
                        <button className="text-gray-400 hover:text-gray-600">
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
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="flex-1 flex justify-between sm:hidden">
              <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                Previous
              </button>
              <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">1</span> to{" "}
                  <span className="font-medium">8</span> of{" "}
                  <span className="font-medium">{filteredRequests.length}</span>{" "}
                  results
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                  <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    Previous
                  </button>
                  <button className="bg-[#1887A1] border-[#1887A1] text-white relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                    1
                  </button>
                  <button className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                    2
                  </button>
                  <button className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                    3
                  </button>
                  <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    Next
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedRequests.length > 0 && (
          <div className="fixed bottom-6 right-6 bg-white rounded-lg shadow-lg border border-gray-200 p-4">
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                {selectedRequests.length} requests selected
              </span>
              <div className="flex space-x-2">
                <button className="px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm flex items-center space-x-1">
                  <CheckCircle size={16} />
                  <span>Approve</span>
                </button>
                <button className="px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm flex items-center space-x-1">
                  <X size={16} />
                  <span>Reject</span>
                </button>
                <button
                  onClick={() => setSelectedRequests([])}
                  className="px-3 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 text-sm"
                >
                  Clear
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RequestsPage;
