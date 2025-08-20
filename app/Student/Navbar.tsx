"use client";
import React, { useState } from "react";
import {
  LayoutDashboard,
  HelpCircle,
  MessageCircle,
  FileQuestion,
  BookOpen,
  TrendingUp,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

function Navbar() {
  const [activeMenu, setActiveMenu] = useState("DashBoard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const router = useRouter();

  const handleMenuClick = (menu: string) => {
    setActiveMenu(menu);
    if (menu === "DashBoard") {
      router.push("/Student/DashBord");
    } else if (menu === "My Doubts") {
      router.push("/Student/MyDouts");
    } else if (menu === "Chats") {
      router.push("/Student/Chart");
    } else if (menu === "Quizzes") {
      router.push("/Student/Quiezz");
    } else if (menu === "Course") {
      router.push("/Student/Course");
    } else if (menu === "Progress") {
      router.push("/Student/ProgressHeader");
    }
  };

  return (
    <>
      <div className="p-4 sm:p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-xl sm:text-2xl font-bold text-teal-600 mb-2">
            SkillMentorX
          </h1>
          <button
            className="lg:hidden text-gray-500 hover:text-gray-700"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="w-full h-px bg-gray-200 mt-4"></div>
      </div>

      {sidebarOpen && (
        <nav className="px-4 mt-2">
          <ul className="space-y-2">
            <li>
              <Link href={"/Student"}>
                <button
                  className={`text-left px-4 py-2.5 rounded-lg font-medium transition-all duration-200 text-sm sm:text-base flex items-center space-x-3 ${
                    activeMenu === "DashBoard"
                      ? "bg-teal-600 text-white font-semibold shadow-lg hover:bg-teal-700"
                      : "text-teal-700 hover:bg-teal-50 hover:text-teal-800"
                  }`}
                  onClick={() => handleMenuClick("DashBoard")}
                >
                  <LayoutDashboard className="w-5 h-5 flex-shrink-0" />
                  <span>DashBoard</span>
                </button>
              </Link>
            </li>

            {/* My Doubts */}
            <li>
              <Link href={"/MyDouts"}>
                <button
                  className={` text-left px-4 py-2.5 rounded-lg font-medium transition-all duration-200 text-sm sm:text-base flex items-center space-x-3 ${
                    activeMenu === "My Doubts"
                      ? "bg-teal-600 text-white font-semibold shadow-lg hover:bg-teal-700"
                      : "text-teal-700 hover:bg-teal-50 hover:text-teal-800"
                  }`}
                  onClick={() => handleMenuClick("My Doubts")}
                >
                  <HelpCircle className="w-5 h-5 flex-shrink-0" />
                  <span>My Doubts</span>
                </button>
              </Link>
            </li>

            {/* Chats */}
            <li>
              <button
                className={` text-left px-4 py-2.5 rounded-lg font-medium transition-all duration-200 text-sm sm:text-base flex items-center space-x-3 ${
                  activeMenu === "Chats"
                    ? "bg-teal-600 text-white font-semibold shadow-lg hover:bg-teal-700"
                    : "text-teal-700 hover:bg-teal-50 hover:text-teal-800"
                }`}
                onClick={() => handleMenuClick("Chats")}
              >
                <MessageCircle className="w-5 h-5 flex-shrink-0" />
                <span>Chats</span>
              </button>
            </li>

            {/* Quizzes */}
            <li>
              <button
                className={` text-left px-4 py-2.5 rounded-lg font-medium transition-all duration-200 text-sm sm:text-base flex items-center space-x-3 ${
                  activeMenu === "Quizzes"
                    ? "bg-teal-600 text-white font-semibold shadow-lg hover:bg-teal-700"
                    : "text-teal-700 hover:bg-teal-50 hover:text-teal-800"
                }`}
                onClick={() => handleMenuClick("Quizzes")}
              >
                <FileQuestion className="w-5 h-5 flex-shrink-0" />
                <span>Quizzes</span>
              </button>
            </li>

          
            <li>
              <button
                className={` text-left px-4 py-2.5 rounded-lg font-medium transition-all duration-200 text-sm sm:text-base flex items-center space-x-3 ${
                  activeMenu === "Course"
                    ? "bg-teal-600 text-white font-semibold shadow-lg hover:bg-teal-700"
                    : "text-teal-700 hover:bg-teal-50 hover:text-teal-800"
                }`}
                onClick={() => handleMenuClick("Course")}
              >
                <BookOpen className="w-5 h-5 flex-shrink-0" />
                <span>Course</span>
              </button>
            </li>

          </ul>
        </nav>
      )}
    </>
  );
}

export default Navbar;
