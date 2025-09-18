"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";

interface WeekPlan {
  week: number;
  title: string;
  topics: string[];
  task: string;
}

interface CoursePlan {
  name: string;
  description: string;
  weeks: WeekPlan[];
}

const CourseDetailsPage = () => {
  const params = useParams();
  const stackName = params?.stack as string;
  const [course, setCourse] = useState<CoursePlan | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:9999/api/courses/${stackName}`
        );
        setCourse(data);
      } catch (err) {
        console.error("Error fetching course plan:", err);
      } finally {
        setLoading(false);
      }
    };

    if (stackName) fetchCourse();
  }, [stackName]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-[#1887A1]">
        Loading Course Details...
      </div>
    );
  }

  if (!course) {
    return (
      <div className="p-6 text-red-500">
        Course not found or syllabus not available.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold text-[#0D4C5B] mb-4">{course.name}</h1>
      <p className="text-gray-700 mb-6">{course.description}</p>

      <div className="space-y-6">
        {course.weeks.map((week) => (
          <div
            key={week.week}
            className="bg-white p-5 rounded-2xl shadow-md border"
          >
            <h2 className="text-lg font-semibold text-[#1887A1]">
              Week {week.week}: {week.title}
            </h2>
            <ul className="list-disc list-inside mt-2 text-gray-700 space-y-1">
              {week.topics.map((topic, idx) => (
                <li key={idx}>{topic}</li>
              ))}
            </ul>
            <p className="mt-3 text-sm font-medium text-[#0D4C5B]">
              📝 Task: {week.task}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseDetailsPage;
