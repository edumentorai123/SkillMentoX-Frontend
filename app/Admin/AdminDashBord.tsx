"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Search, Users, UserCheck, MessageSquare } from "lucide-react";

// TypeScript interfaces
interface StatCard {
  title: string;
  value: string | number;
  changeType: string;
  icon: React.ReactNode;
}

interface Mentor {
  id: string;
  name: string;
  courses: string[];
}

interface StudentRequest {
  _id: string;
  student: { _id: string; email: string };
  category: string;
  status: string;
  stack: string;
  assignedMentor: string | null;
  requestedAt: string;
  updatedAt: string;
}

const AdminDashboard: React.FC = () => {
  const [totalMentors, setTotalMentors] = useState<number>(0);
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [pendingRequestsCount, setPendingRequestsCount] = useState<number>(0);
  const [studentRequests, setStudentRequests] = useState<StudentRequest[]>([]);
  const [mentors, setMentors] = useState<Mentor[]>([]);

  // ✅ Fetch total approved mentors count
  const fetchTotalMentors = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get<{ count: number }>(
        "http://localhost:9999/api/admin/approved/count",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTotalMentors(res.data.count);
    } catch (error: any) {
      console.error(
        "Error fetching total mentors:",
        error.response?.data || error.message
      );
    }
  };

  // ✅ Fetch total verified users
  const fetchTotalUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get<{ verifiedUsersCount: number }>(
        "http://localhost:9999/api/admin/totalUsers",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTotalUsers(res.data.verifiedUsersCount);
    } catch (error: any) {
      console.error(
        "Error fetching total users:",
        error.response?.data || error.message
      );
    }
  };

  // ✅ Fetch all student requests
  const fetchStudentRequests = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:9999/api/requests", {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("API Response:", res.data);
      if (res.data && Array.isArray(res.data.requests)) {
        setStudentRequests(res.data.requests);
        setPendingRequestsCount(res.data.requests.length);
      } else {
        setStudentRequests([]);
        setPendingRequestsCount(0);
        console.error("Unexpected API response format:", res.data);
      }
    } catch (error: any) {
      console.error(
        "Error fetching student requests:",
        error.response?.data || error.message
      );
      setStudentRequests([]);
      setPendingRequestsCount(0);
    }
  };

  // ✅ Fetch Approved Mentors
  const fetchApprovedMentors = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        "http://localhost:9999/api/admin/approved-mentors",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("Approved Mentors Response:", res.data);

      if (res.data && Array.isArray(res.data.data)) {
        const mentorsData = res.data.data.map((mentor: any) => ({
          id: mentor._id,
          name: mentor.fullName,
          courses: mentor.courses.map((c: any) => c.courseName),
        }));
        setMentors(mentorsData);
      } else {
        setMentors([]);
        console.error("Unexpected mentor API response:", res.data);
      }
    } catch (error: any) {
      console.error(
        "Error fetching mentors:",
        error.response?.data || error.message
      );
    }
  };

  // ✅ Change request status (frontend + API)
  const handleStatusChange = async (requestId: string, newStatus: string) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:9999/api/admin/${requestId}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setStudentRequests((prev) =>
        prev.map((req) =>
          req._id === requestId ? { ...req, status: newStatus } : req
        )
      );
      console.log(`Request ${requestId} status changed to ${newStatus}`);
    } catch (error: any) {
      console.error(
        "Error updating request status:",
        error.response?.data || error.message
      );
    }
  };

  // ✅ Assign mentor to request (frontend + API)
  const handleMentorAssign = async (requestId: string, mentorId: string) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:9999/api/admin/${requestId}/assign-mentor`,
        { mentorId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setStudentRequests((prev) =>
        prev.map((req) =>
          req._id === requestId ? { ...req, assignedMentor: mentorId } : req
        )
      );
      console.log(`Request ${requestId} assigned to mentor ${mentorId}`);
    } catch (error: any) {
      console.error(
        "Error assigning mentor:",
        error.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    fetchTotalMentors();
    fetchTotalUsers();
    fetchStudentRequests();
    fetchApprovedMentors();
  }, []);

  const statsCards: StatCard[] = [
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
      title: "Pending Students",
      value: pendingRequestsCount,
      changeType: "positive",
      icon: <MessageSquare size={24} />,
    },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-white shadow-sm border-b px-8 py-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800">
              Dashboard Overview
            </h2>
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
                </div>
                <h3 className="text-3xl font-bold text-gray-800 mb-1">
                  {card.value}
                </h3>
                <p className="text-gray-600 text-sm">{card.title}</p>
              </div>
            ))}
          </div>

          {/* Student Requests */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Pending Student Requests
            </h3>
            <div className="space-y-4">
              {studentRequests.map((req) => (
                <div
                  key={req._id}
                  className="border border-gray-200 rounded-lg p-4 flex justify-between items-center"
                >
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800">
                      {req.student.email}
                    </h4>
                    <p className="text-gray-600">Category: {req.category}</p>
                    <p className="text-gray-600">Stack: {req.stack}</p>
                  </div>
                  <div className="flex space-x-4">
                    {/* Status Dropdown */}
                    <select
                      value={req.status}
                      onChange={(e) =>
                        handleStatusChange(req._id, e.target.value)
                      }
                      className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    >
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                    </select>

                    {/* Mentor Assignment */}
                    <select
                      value={req.assignedMentor || ""}
                      onChange={(e) =>
                        handleMentorAssign(req._id, e.target.value)
                      }
                      className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    >
                      <option value="">Assign Mentor</option>
                      {mentors
                        .filter((mentor) => mentor.courses.includes(req.stack))
                        .map((mentor) => (
                          <option key={mentor.id} value={mentor.id}>
                            {mentor.name}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
              ))}
              {studentRequests.length === 0 && (
                <p className="text-gray-500 text-sm">
                  No pending student requests.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
