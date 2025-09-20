
"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

// ====== Types ======
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

// ====== Course Categories ======
const courseCategories: Record<string, { Stacks: string[] }> = {
  "Full Stack Web Development": {
    Stacks: [
      "MERN Stack (MongoDB, Express, React, Node.js)",
      "MEAN Stack (MongoDB, Express, Angular, Node.js)",
      "Python Full Stack (Django + React / Angular)",
      "Spring Boot + React / Angular",
      "LAMP Stack (Linux, Apache, MySQL, PHP)",
      "Next.js + NestJS + PostgreSQL",
      "Ruby on Rails + React",
      "T3 Stack (Next.js + Prisma + tRPC + Tailwind)",
    ],
  },
};

const MentorPage = () => {
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  // filters
  const [category, setCategory] = useState("");
  const [courseName, setCourseName] = useState("");

  const router = useRouter();

  // ====== Fetch Mentors ======
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const fetchMentors = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        params.append("page", page.toString());
        params.append("limit", "6");
        if (category) params.append("category", category);
        if (courseName) params.append("courseName", courseName);

        const { data } = await axios.get(
          `http://localhost:9999/api/admin/approved-mentors?${params.toString()}`,
          { headers: { Authorization: `Bearer ${token}` } }
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
  }, [page, category, courseName]);

  // 🔹 Local filter for search
  const filteredMentors = mentors.filter(
    (mentor) =>
      mentor.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentor.currentRole.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ====== UI ======
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

      {/* 🔹 Search Bar */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by name, email, or role..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg 
                       focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent"
          />
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setCourseName("");
            setPage(1);
          }}
          className="px-3 py-2 border rounded"
        >
          <option value="">All Categories</option>
          {Object.keys(courseCategories).map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <select
          value={courseName}
          onChange={(e) => {
            setCourseName(e.target.value);
            setPage(1);
          }}
          className="px-3 py-2 border rounded"
          disabled={!category}
        >
          <option value="">All Courses</option>
          {category &&
            courseCategories[category].Stacks.map((course) => (
              <option key={course} value={course}>
                {course}
              </option>
            ))}
        </select>
      </div>

      {/* Mentor Cards */}
      {filteredMentors.length === 0 ? (
        <p className="text-gray-600">No mentors found.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMentors.map((mentor) => (
              <div
                key={mentor._id}
                onClick={() => router.push(`/Admin/Mentor/${mentor._id}`)}
                className="bg-white p-5 rounded-2xl shadow-md border 
                           hover:shadow-lg cursor-pointer transition"
              >
                <h2 className="text-lg font-bold text-[#0D4C5B]">
                  {mentor.fullName}
                </h2>
                <p className="text-sm text-gray-500">{mentor.headline}</p>

                <div className="mt-3 text-sm text-gray-700 space-y-1">
                  <p>
                    <span className="font-semibold">Role:</span>{" "}
                    {mentor.currentRole}
                  </p>
                  <p>
                    <span className="font-semibold">Company:</span>{" "}
                    {mentor.company}
                  </p>
                  <p>
                    <span className="font-semibold">Experience:</span>{" "}
                    {mentor.yearsOfExperience} yrs
                  </p>
                </div>

                {/* Courses */}
                <div className="mt-4">
                  <p className="font-semibold text-gray-800 mb-1">Courses:</p>
                  <div className="flex flex-wrap gap-2">
                    {mentor.courses.map((c, idx) => (
                      <span
                        key={idx}
                        className="bg-[#1887A1] text-white px-2 py-1 text-xs rounded-full"
                      >
                        {c.courseName}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {pagination && (
            <div className="flex justify-center items-center gap-4 mt-8">
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
