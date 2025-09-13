


"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

interface Course {
  category: string;
  courseName: string;
}

interface Mentor {
  _id: string;
  fullName: string;
  headline: string;
  currentRole: string;
  company: string;
  yearsOfExperience: number;
  email: string;
  phoneNumber: string;
  courses: Course[];
}

interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

const MentorPage = () => {
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const fetchMentors = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `http://localhost:9999/api/admin/approved-mentors?page=${page}&limit=5`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setMentors(data.data || []);
        setPagination(data.pagination);
      } catch (error) {
        console.error("Error fetching mentors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMentors();
  }, [page]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-[#1887A1]">
        Loading mentors...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <h1 className="text-2xl font-bold text-[#0D4C5B] mb-6">
        Approved Mentors
      </h1>

      {mentors.length === 0 ? (
        <p className="text-gray-600">No approved mentors found.</p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-200 bg-white rounded-xl shadow-sm">
              <thead className="bg-[#1887A1] text-white">
                <tr>
                  <th className="px-4 py-3 text-left">Name</th>
                  <th className="px-4 py-3 text-left">Role</th>
                  <th className="px-4 py-3 text-left">Company</th>
                  <th className="px-4 py-3 text-left">Experience</th>
                  <th className="px-4 py-3 text-left">Email</th>
                  <th className="px-4 py-3 text-left">Phone</th>
                  <th className="px-4 py-3 text-left">Courses</th>
                </tr>
              </thead>
              <tbody>
                {mentors.map((mentor) => (
                  <tr
                    key={mentor._id}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="px-4 py-3 font-medium text-[#0D4C5B]">
                      {mentor.fullName}
                    </td>
                    <td className="px-4 py-3">{mentor.currentRole}</td>
                    <td className="px-4 py-3">{mentor.company}</td>
                    <td className="px-4 py-3">
                      {mentor.yearsOfExperience} yrs
                    </td>
                    <td className="px-4 py-3">{mentor.email}</td>
                    <td className="px-4 py-3">{mentor.phoneNumber}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {mentor.courses.map((c) => c.courseName).join(", ")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          {pagination && (
            <div className="flex justify-center items-center gap-4 mt-6">
              <button
                disabled={page === 1}
                onClick={() => setPage((prev) => prev - 1)}
                className="px-4 py-2 bg-[#0D4C5B] text-white rounded disabled:opacity-50"
              >
                Previous
              </button>
              <span className="text-gray-700">
                Page {pagination.page} of {pagination.totalPages}
              </span>
              <button
                disabled={page === pagination.totalPages}
                onClick={() => setPage((prev) => prev + 1)}
                className="px-4 py-2 bg-[#1887A1] text-white rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MentorPage;
