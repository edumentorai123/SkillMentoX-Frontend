"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Search,
  FileText,
  Filter,
  MoreVertical,
  CheckCircle,
  X,
  AlertCircle,
  User,
  Flag,
  MessageCircle,
  UserPlus,
  School,
} from "lucide-react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:9999";
interface Request {
  _id: string;
  title?: string;
  description?: string;
  requester?: string;
  status: string;
  type: string;
  dateSubmitted: string;
}

const RequestsPage = () => {
  const [requests, setRequests] = useState<Request[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [selectedRequests, setSelectedRequests] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null); 

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        setError(null); 
        const { data } = await axios.get(
            `${API_BASE_URL}/api/mentor/admin/mentor-requests`,
            { withCredentials: true }
          );
          console.log("API Response:", data);
          setRequests(data);
      } catch (error: any) {
        console.error("Error fetching requests:", error);
        setError(
          error.response?.status === 404
            ? "API endpoint not found. Please check the server configuration."
            : "Failed to fetch requests. Please try again later."
        );
      }
    };
    fetchRequests();
  }, []);

  const filters = [
    "All",
    "Pending",
    "In Progress",
    "Under Review",
    "Approved",
    "Resolved",
    "Rejected",
  ];

  const filteredRequests = requests.filter((request) => {
    const matchesSearch =
      request.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.requester?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.type?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      selectedFilter === "All" || request.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const handleRequestSelect = (requestId: string) => {
    setSelectedRequests((prev) =>
      prev.includes(requestId)
        ? prev.filter((id) => id !== requestId)
        : [...prev, requestId]
    );
  };

  // Approve request
  const handleApprove = async (id: string) => {
    try {
      await axios.put(`${API_BASE_URL}/api/mentor/requests/${id}/approve`, null, {
        withCredentials: true, // Add withCredentials for consistency
      });
      setRequests((prev) =>
        prev.map((req) =>
          req._id === id ? { ...req, status: "Approved" } : req
        )
      );
    } catch (error: any) {
      console.error("Error approving request:", error);
      setError("Failed to approve request. Please try again.");
    }
  };

  // Reject request
  const handleReject = async (id: string) => {
    try {
      await axios.put(`${API_BASE_URL}/api/mentor/requests/${id}/reject`, null, {
        withCredentials: true, // Add withCredentials for consistency
      });
      setRequests((prev) =>
        prev.map((req) =>
          req._id === id ? { ...req, status: "Rejected" } : req
        )
      );
    } catch (error: any) {
      console.error("Error rejecting request:", error);
      setError("Failed to reject request. Please try again.");
    }
  };

  const getStatusColor = (status: string) => {
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

  const getTypeIcon = (type: string) => {
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
      default:
        return <FileText size={16} className="text-gray-600" />;
    }
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-white flex">
      <div className="flex-1 p-8">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
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
              placeholder="Search requests..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-80 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1887A1]"
            />
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-100 text-red-800 rounded-lg">
            {error}
          </div>
        )}

        {/* Filters */}
        <div className="flex items-center space-x-4 mb-6">
          <Filter className="text-gray-500" size={20} />
          <div className="flex space-x-2 overflow-x-auto">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
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

        {/* Table */}
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3"></th>
                <th className="px-6 py-3 text-left">Request</th>
                <th className="px-6 py-3 text-left">Requester</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-left">Date</th>
                <th className="px-6 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.map((request) => (
                <tr key={request._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedRequests.includes(request._id)}
                      onChange={() => handleRequestSelect(request._id)}
                    />
                  </td>
                  <td className="px-6 py-4 flex items-center space-x-2">
                    {getTypeIcon(request.type)}
                    <div>
                      <div className="font-medium">{request.title || "N/A"}</div>
                      <div className="text-sm text-gray-500">
                        {request.description || "No description"}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">{request.requester || "Unknown"}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                        request.status
                      )}`}
                    >
                      {request.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">{formatDate(request.dateSubmitted)}</td>
                  <td className="px-6 py-4 flex space-x-2">
                    <button
                      onClick={() => handleApprove(request._id)}
                      className="text-green-600"
                      disabled={request.status === "Approved"} // Disable if already approved
                    >
                      <CheckCircle size={16} />
                    </button>
                    <button
                      onClick={() => handleReject(request._id)}
                      className="text-red-600"
                      disabled={request.status === "Rejected"} // Disable if already rejected
                    >
                      <X size={16} />
                    </button>
                    <button className="text-gray-400">
                      <MoreVertical size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredRequests.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="text-center py-6 text-gray-500 text-sm"
                  >
                    No requests found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RequestsPage;