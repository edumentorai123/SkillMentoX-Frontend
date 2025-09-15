
"use client";
import React from "react";
interface MyStudentsSectionProps {
  myStudents: Array<{
    id: number;
    name: string;
    subject: string;
    level: string;
    progress: number;
    lastSession: string;
    status: string;
  }>;
}

export default function MyStudentsSection({
  myStudents,

}: MyStudentsSectionProps) {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-4 lg:p-6 shadow-sm border border-gray-100">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 space-y-3 sm:space-y-0">
          <h2 className="text-xl font-semibold text-gray-900">My Students</h2>
          <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform hover:scale-105">
            Add Student
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
          {myStudents.map((student) => (
            <div
              key={student.id}
              className="p-4 lg:p-6 border border-gray-200 rounded-lg hover:shadow-lg hover:border-blue-300 transition-all duration-300 cursor-pointer transform hover:scale-105"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-medium text-sm">
                  {student.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{student.name}</h3>
                  <p className="text-sm text-gray-600">
                    {student.subject} • {student.level}
                  </p>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Progress</span>
                  <span className="text-sm font-medium text-gray-900">
                    {student.progress}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="h-2 rounded-full transition-all duration-500"
                    style={{
                      width: `${student.progress}%`,
                      background: "linear-gradient(to right, #1887A1, #0D4C5B)",
                    }}
                  ></div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500">
                    Last session: {student.lastSession}
                  </p>
                  <span
                    className={`text-xs px-2 py-1 rounded-full mt-1 inline-block ${
                      student.status === "Active"
                        ? "bg-green-100 text-green-600"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {student.status}
                  </span>
                </div>
                <button
                  className="text-sm font-medium px-3 py-1 rounded-lg transition-all duration-200 hover:bg-blue-50"
                  style={{ color: "#1887A1" }}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
