"use client";
import React, { useState,  } from "react";
import {
  LayoutDashboard,
  HelpCircle,
  MessageCircle,
  FileQuestion,
  BookOpen,
  X,
} from "lucide-react";
import {  usePathname } from "next/navigation";
import Link from "next/link";

function Navbar() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();

  const getActiveMenu = (currentPath: string) => {
    if (currentPath === "/Student" || currentPath === "/Student/DashBord") {
      return "DashBoard";
    } else if (currentPath === "/Student/MyDouts") {
      return "My Doubts";
    } else if (currentPath === "/Student/Chat") {
      return "Chats";
    } else if (currentPath === "/Student/Quiezz") {
      return "Quizzes";
    } else if (currentPath === "/Student/Course") {
      return "Course";
    } else if (currentPath === "/Student/ProgressHeader") {
      return "Progress";
    }
    return "DashBoard"; // default
  };

  const activeMenu = getActiveMenu(pathname);

  const menuItems = [
    {
      name: "DashBoard",
      icon: LayoutDashboard,
      href: "/Student",
    },
    {
      name: "My Doubts",
      icon: HelpCircle,
      href: "/Student/MyDouts",
    },
    {
      name: "Chats",
      icon: MessageCircle,
      href: "/Student/Chat",
    },
    {
      name: "Quizzes",
      icon: FileQuestion,
      href: "/Student/Quiezz",
    },
    {
      name: "Course",
      icon: BookOpen,
      href: "/Student/Course",
    },
  ];

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
            {menuItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = activeMenu === item.name;
              
              return (
                <li key={item.name}>
                  <Link href={item.href}>
                    <button
                      className={`w-full text-left px-4 py-2.5 rounded-lg font-medium transition-all duration-200 text-sm sm:text-base flex items-center space-x-3 ${
                        isActive
                          ? "bg-teal-600 text-white font-semibold shadow-lg hover:bg-teal-700"
                          : "text-teal-700 hover:bg-teal-50 hover:text-teal-800"
                      }`}
                    >
                      <IconComponent className="w-5 h-5 flex-shrink-0" />
                      <span>{item.name}</span>
                    </button>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </>
  );
}


export default Navbar