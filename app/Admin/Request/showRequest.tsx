"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { MoreVertical, User, Mail, Calendar, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";  // top import



interface MentorRequest {
  _id: string;
  mentorId: {
    _id: string;
    fullName: string;
    currentRole: string;
    email: string;
  };
  status: string;
  createdAt: string;
}

const RequestsPage = () => {
  const [requests, setRequests] = useState<MentorRequest[]>([]);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const fetchRequests = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:9999/api/admin/mentor-requests",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setRequests(data.data);
      } catch (error: any) {
        console.error(
          error.response?.status === 401
            ? "Unauthorized! Token may be invalid or expired."
            : "Error fetching requests:",
          error
        );
      }
    };

    fetchRequests();
  }, []);

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const endpoint =
        newStatus === "approved" ? "approve-request" : "reject-request";

      const token = localStorage.getItem("token"); // get token
      if (!token) {
        console.error("No token found!");
        return;
      }

      await axios.put(
        `http://localhost:9999/api/admin/${endpoint}/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` }, // <-- add token here
        }
      );

      setRequests((prev) =>
        newStatus === "rejected"
          ? prev.filter((req) => req._id !== id) // remove rejected
          : prev.map((req) =>
              req._id === id ? { ...req, status: newStatus } : req
            )
      );
    } catch (error: any) {
      console.error(
        error.response?.status === 401
          ? "Unauthorized! Token may be invalid or expired."
          : "Error updating request status:",
        error
      );
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "approved":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200";
      case "pending":
        return "bg-amber-100 text-amber-800 border-amber-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const StatusDropdown = ({ request }: { request: MentorRequest }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentStatus, setCurrentStatus] = useState(request.status);

    const statusOptions = ["pending", "approved", "rejected"];

    const handleStatusSelect = async (newStatus: string) => {
      setCurrentStatus(newStatus);
      setIsOpen(false);
      await handleStatusChange(request._id, newStatus);
    };

    return (
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center justify-between px-3 py-2 rounded-lg border text-sm font-medium min-w-[120px] transition-all duration-200 hover:shadow-md ${getStatusColor(
            currentStatus
          )}`}
        >
          <span className="capitalize">{currentStatus}</span>
          <ChevronDown size={16} className={isOpen ? "rotate-180" : ""} />
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-[120px]">
            {statusOptions.map((status) => (
              <button
                key={status}
                onClick={() => handleStatusSelect(status)}
                className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 ${
                  status === currentStatus
                    ? "bg-[#1887A1] text-white hover:bg-[#1887A1]"
                    : ""
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto p-8">
        <h1 className="text-4xl font-bold text-[#0D4C5B] mb-2">
          Mentor Requests
        </h1>
        <p className="text-gray-600 mb-8">
          Manage and review mentor applications for your platform
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {requests.map((request) => (
            <div
              key={request._id}
              onClick={() => router.push(`/Admin/Request/${request.mentorId._id}`)}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#1887A1] to-[#0D4C5B] rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {request.mentorId.fullName.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-bold text-[#0D4C5B] text-lg">
                      {request.mentorId.fullName}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {request.mentorId.currentRole}
                    </p>
                  </div>
                </div>

                <button className="text-gray-400 hover:text-gray-600 transition-colors">
                  <MoreVertical size={20} />
                </button>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-2 text-gray-600">
                  <Mail size={16} />
                  <span className="text-sm">{request.mentorId.email}</span>
                </div>

                <div className="flex items-center space-x-2 text-gray-600">
                  <Calendar size={16} />
                  <span className="text-sm">
                    Applied on{" "}
                    {new Date(request.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-[#0D4C5B]">
                  Status:
                </span>
                <StatusDropdown request={request} />
              </div>
            </div>
          ))}
        </div>

        {requests.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <User size={32} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-[#0D4C5B] mb-2">
              No requests found
            </h3>
            <p className="text-gray-600">
              No mentor requests available at the moment.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RequestsPage;
