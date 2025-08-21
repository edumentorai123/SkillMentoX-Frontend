"use client";
import { useState } from "react";

export default function MyDoubts() {
  const [activeFilter, setActiveFilter] = useState("All");

  const doubts = [
    { id: 1, question: "How do I implement async/await in JavaScript for handling API calls?", status: "Answered", tag: "JavaScript" },
    { id: 2, question: "How do I implement async/await in JavaScript for handling API calls?", status: "Pending", tag: "JavaScript" },
    { id: 3, question: "How do I implement async/await in JavaScript for handling API calls?", status: "Answered", tag: "JavaScript" },
    { id: 4, question: "How do I implement async/await in JavaScript for handling API calls?", status: "Pending", tag: "JavaScript" },
    { id: 5, question: "How do I implement async/await in JavaScript for handling API calls?", status: "Answered", tag: "JavaScript" },
    { id: 6, question: "How do I implement async/await in JavaScript for handling API calls?", status: "Pending", tag: "JavaScript" },
  ];

  const filteredDoubts = doubts.filter((doubt) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Java Script") return doubt.tag === "JavaScript";
    return doubt.status.toLowerCase() === activeFilter.toLowerCase();
  });
  
  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Main Content */}
      <main className="flex-1 bg-gradient-to-br from-teal-500 to-teal-700 p-4 sm:p-6 lg:p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          {/* Heading */}
          <header className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
              My Doubts
            </h1>
            <p className="text-teal-100 text-sm sm:text-base">
              Track and manage your questions
            </p>
          </header>

          {/* Ask Doubt */}
          <div className="mb-4 sm:mb-6">
            <button className="bg-white text-teal-600 px-4 sm:px-6 py-2 rounded-full font-semibold text-sm sm:text-base hover:bg-gray-50 shadow-md">
              Ask New Doubt
            </button>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2 sm:gap-3 mb-6 sm:mb-8">
            {["All", "Answered", "Pending", "Java Script"].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-1.5 rounded-full font-medium ${
                  activeFilter === filter
                    ? "bg-white text-teal-600"
                    : "bg-teal-600 text-white border-2 border-white hover:bg-white hover:text-teal-600"
                }`}
              >
                {filter === "Java Script" ? "JavaScript" : filter}
              </button>
            ))}
          </div>

          {/* Doubts */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
            {filteredDoubts.map((doubt) => (
              <div
                key={doubt.id}
                className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition"
              >
                <span
                  className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                    doubt.status === "Answered"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {doubt.status}
                </span>
                <h3 className="text-gray-800 font-medium mt-3 mb-2 text-sm sm:text-base">
                  {doubt.question}
                </h3>
                <span className="inline-block bg-teal-600 text-white px-2 py-1 rounded text-xs font-medium">
                  {doubt.tag}
                </span>
                <button className="mt-4 w-full border-2 border-teal-600 text-teal-600 py-2 rounded font-medium text-sm hover:bg-teal-600 hover:text-white">
                  View Answer
                </button>
              </div>
            ))}
          </div>

          {filteredDoubts.length === 0 && (
            <div className="text-center py-12">
              <div className="text-white text-lg mb-4">No doubts found</div>
              <p className="text-teal-100">Try adjusting your filter</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
