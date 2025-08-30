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
    if (currentPath === "/Admin" || currentPath === "/Admin/DashBord") {
      return "DashBoard";
    } else if (currentPath === "/Admin/Users") {
      return "Users";
    } else if (currentPath === "/Admin/Mentor") {
      return "Mentor";
    } else if (currentPath === "/Admin/Request") {
      return "Request";
    } else if (currentPath === "/Admin/Course") {
      return "Add Course";
    }
    return "DashBoard";
  };

  const activeMenu = getActiveMenu(pathname);

  const menuItems = [
    { name: "DashBoard", icon: LayoutDashboard, href: "/Admin" },
    { name: "Users", icon: HelpCircle, href: "/Admin/Users" },
    { name: "Mentor", icon: MessageCircle, href: "/Admin/Mentor" },
    { name: "Request", icon: FileQuestion, href: "/Admin/Request" },
    { name: "Add Course", icon: BookOpen, href: "/Admin/Add Course" },
  ];

  return (
    <div className="h-full flex flex-col bg-white shadow-md w-64">
      {/* Logo / Header */}
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-teal-600">AdminHub</h1>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = activeMenu === item.name;

            return (
              <li key={item.name}>
                <Link href={item.href}>
                  <button
                    className={`w-full text-left px-4 py-2.5 rounded-lg font-medium transition-all duration-200 flex items-center space-x-3 ${
                      isActive
                        ? "bg-teal-600 text-white shadow-md"
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
    </div>
  );
}

export default Sidebar;
