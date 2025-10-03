"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { MoreVertical, Mail, Calendar, ChevronDown, BookOpen, Users } from "lucide-react";
import { useRouter } from "next/navigation";

interface StudentRequest {
  _id: string;
  student: {
    _id: string;
    fullName: string;
    email: string;
  };
  category: string;
  stack: string;
  status: string;
  assignedMentor?: {
    _id: string;
    fullName: string;
    expertise?: string[];
  };
  requestedAt: string;
  updatedAt: string;
}

interface MentorOption {
  _id: string;
  fullName: string;
  expertise: string[];
}

interface MentorApiResponse {
  _id: string;
  name: string;
  expertise: string[];
}

const StudentRequestsPage = () => {
  const [students, setRequests] = useState<StudentRequest[]>([]);
  const [mentors, setMentors] = useState<MentorOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL as string;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No token found. Please log in.");
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        // Fetch student students for admin
        const requestsRes = await axios.get(`${API_URL}/api/students`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRequests(requestsRes.data.students || []);

        // Fetch available mentors (approved ones)
        const mentorsRes = await axios.get(`${API_URL}/api/admin/getAllmentors`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMentors(mentorsRes.data?.data?.map((m: MentorApiResponse) => ({
          _id: m._id,
          fullName: m.name,
          expertise: m.expertise || []
        })) || []);
      } catch (err: unknown) {
        console.error("Error fetching data:", err);
        const error = err as Error & { response?: { data?: { message?: string } } };
        setError(error.response?.data?.message || "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [API_URL]);

    const handleStatusChange = async (id: string, newStatus: string, mentorId?: string) => {
      if (newStatus === "approved" && !mentorId) {
        setError("Please select a mentor to assign.");
        return;
      }

      try {
        const token = localStorage.getItem("token");
        await axios.put(
          `${API_URL}/api/students/${id}`,
          { status: newStatus, ...(mentorId && { mentorId }) },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setRequests((prev) =>
          prev.map((req) =>
            req._id === id
              ? {
                  ...req,
                  status: newStatus,
                  assignedMentor: mentorId ? { _id: mentorId, fullName: mentors.find((m: MentorOption) => m._id === mentorId)?.fullName || "Assigned Mentor", expertise: mentors.find((m: MentorOption) => m._id === mentorId)?.expertise || [] } : req.assignedMentor,
                }
              : req
          )
        );
        setError(null);
      } catch (err: unknown) {
        console.error("Error updating request:", err);
        const error = err as Error & { response?: { data?: { message?: string } } };
        setError(error.response?.data?.message || "Failed to update request");
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
      case "resolved":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const StatusAndMentorDropdown = ({ request }: { request: StudentRequest }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentStatus, setCurrentStatus] = useState(request.status);
    const [selectedMentor, setSelectedMentor] = useState<string | null>(request.assignedMentor?._id || null);
    const [showMentorSelect, setShowMentorSelect] = useState(false);

    const statusOptions = ["pending", "approved", "rejected", "resolved"];

    const handleStatusSelect = async (newStatus: string) => {
      if (newStatus === "approved" && !selectedMentor) {
        setShowMentorSelect(true);
        return;
      }
      setCurrentStatus(newStatus);
      setIsOpen(false);
      await handleStatusChange(request._id, newStatus, selectedMentor ? selectedMentor : undefined);
    };

    const handleMentorSelect = (mentorId: string) => {
      setSelectedMentor(mentorId);
      setShowMentorSelect(false);
      // If already approved, just assign mentor without changing status
      const newStatus = currentStatus === "approved" ? "approved" : "approved";
      handleStatusChange(request._id, newStatus, mentorId);
    };

    return (
      <>
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

        {showMentorSelect && (
          <div className="mt-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Assign Mentor:</label>
            <select
              value={selectedMentor || ""}
              onChange={(e) => setSelectedMentor(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1887A1]"
            >
              <option value="">Select a mentor</option>
              {mentors.map((mentor) => (
                <option key={mentor._id} value={mentor._id}>
                  {mentor.fullName} ({mentor.expertise.join(", ") || "No expertise"})
                </option>
              ))}
            </select>
            <div className="flex space-x-2 mt-2">
              <button
                onClick={() => handleMentorSelect(selectedMentor!)}
                disabled={!selectedMentor}
                className="px-3 py-1 bg-[#1887A1] text-white rounded text-sm disabled:opacity-50"
              >
                Assign & Approve
              </button>
              <button
                onClick={() => setShowMentorSelect(false)}
                className="px-3 py-1 bg-gray-300 text-gray-700 rounded text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {request.status === "approved" && !request.assignedMentor && (
          <button
            onClick={() => setShowMentorSelect(true)}
            className="mt-2 px-3 py-1 bg-[#1887A1] text-white rounded text-sm hover:bg-[#0D4C5B]"
          >
            Assign Mentor
          </button>
        )}

        {request.assignedMentor && (
          <p className="text-xs text-gray-600 mt-1">Assigned: {request.assignedMentor.fullName}</p>
        )}
      </>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1887A1] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading student students...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-[#1887A1] text-white rounded-lg"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-[#0D4C5B] mb-2">Student Mentor Requests</h1>
            <p className="text-gray-600">Review and assign mentors to student students</p>
          </div>
          <div className="text-sm text-gray-500">
            Total Requests: {students.length} | Available Mentors: {mentors.length}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {students.map((request) => (
            <div
              key={request._id}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#1887A1] to-[#0D4C5B] rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {request.student.fullName.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-bold text-[#0D4C5B] text-lg">
                      {request.student.fullName}
                    </h3>
                    <p className="text-gray-600 text-sm">{request.category} - {request.stack}</p>
                  </div>
                </div>

                <button className="text-gray-400 hover:text-gray-600 transition-colors">
                  <MoreVertical size={20} />
                </button>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-2 text-gray-600">
                  <Mail size={16} />
                  <span className="text-sm">{request.student.email}</span>
                </div>

                <div className="flex items-center space-x-2 text-gray-600">
                  <Calendar size={16} />
                  <span className="text-sm">
                    Requested on {new Date(request.requestedAt).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex items-center space-x-2 text-gray-600">
                  <BookOpen size={16} />
                  <span className="text-sm">{request.category} / {request.stack}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-[#0D4C5B]">Status:</span>
                <StatusAndMentorDropdown request={request} />
              </div>
            </div>
          ))}
        </div>

        {students.length === 0 && !loading && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users size={32} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-[#0D4C5B] mb-2">No students found</h3>
            <p className="text-gray-600">No student mentor students available at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentRequestsPage;
