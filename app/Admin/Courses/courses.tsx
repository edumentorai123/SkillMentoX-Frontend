"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface CourseCategory {
  [key: string]: {
    Stacks: string[];
  };
}

const CoursesPage = () => {
  const [categories, setCategories] = useState<CourseCategory>({});
  const [loading, setLoading] = useState(true);
  const router = useRouter();

useEffect(() => {
  const fetchCourses = async () => {
    const token = localStorage.getItem("accessToken");  // ✅ JWT token key

    if (!token) {
      console.error("No token found in localStorage");
      return;
    }

    try {
      const { data } = await axios.get("http://localhost:9999/api/courses", {
        headers: {
          Authorization: `Bearer ${token}`,   // 🔥 ഇതാണ് backend check ചെയ്യുന്നത്
        },
        withCredentials: true,  // optional: cookie send ചെയ്യാൻ
      });
      setCategories(data);
    } catch (err) {
      console.error("Error fetching courses:", err);
    } finally {
      setLoading(false);
    }
  };

  fetchCourses();
}, []);


  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-[#1887A1]">
        Loading Courses...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold text-[#0D4C5B] mb-6">All Courses</h1>

      {Object.keys(categories).map((category) => (
        <div key={category} className="mb-10">
          <h2 className="text-xl font-semibold text-[#0D4C5B] mb-4">
            {category}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories[category].Stacks.map((stack) => (
              <div
                key={stack}
                onClick={() =>
                  router.push(`/Admin/Courses/${encodeURIComponent(stack)}`)
                }
                className="bg-white p-5 rounded-2xl shadow-md border hover:shadow-lg cursor-pointer transition"
              >
                <h3 className="text-lg font-bold text-[#1887A1]">{stack}</h3>
                <p className="text-sm text-gray-600 mt-2">
                  Click to view full weekly syllabus & tasks
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CoursesPage;
