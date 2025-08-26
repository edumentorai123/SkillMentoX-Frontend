"use client";
import {
  LayoutDashboard,
  HelpCircle,
  MessageCircle,
  FileQuestion,
  BookOpen,
} from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

function Sidebar() {
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
    return "DashBoard";
  };

  const activeMenu = getActiveMenu(pathname);

  const menuItems = [
    { name: "DashBoard", icon: LayoutDashboard, href: "/Student" },
    { name: "My Doubts", icon: HelpCircle, href: "/Student/MyDouts" },
    { name: "Chats", icon: MessageCircle, href: "/Student/Chat" },
    { name: "Quizzes", icon: FileQuestion, href: "/Student/Quiezz" },
    { name: "Course", icon: BookOpen, href: "/Student/Course" },
  ];

  return (
    <div className="h-full flex flex-col bg-white shadow-md w-64">
      {/* Logo / Header */}
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-teal-600">SkillMentorX</h1>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = activeMenu === item.name;

            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`w-full  px-4 py-2.5 rounded-lg font-medium transition-all duration-200 flex items-center space-x-3 ${
                    isActive
                      ? "bg-teal-600 text-white shadow-md"
                      : "text-teal-700 hover:bg-teal-50 hover:text-teal-800"
                  }`}
                >
                  <IconComponent className="w-5 h-5 flex-shrink-0" />
                  <span>{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
