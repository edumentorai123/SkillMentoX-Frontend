"use client";
import {
  LayoutDashboard,
  GraduationCap, // 🎓 for Students
  MessageCircle,
  FileQuestion,
  BookOpen,
  LogOut,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/Slices/authSlice";

function Sidebar() {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const router = useRouter();

  const getActiveMenu = (currentPath: string) => {
    if (currentPath === "/Admin" || currentPath === "/Admin/DashBord") {
      return "DashBoard";
    } else if (currentPath === "/Admin/Students") {
      return "Students";
    } else if (currentPath === "/Admin/Mentor") {
      return "Mentor";
    } else if (currentPath === "/Admin/Request") {
      return "Request";
    } else if (currentPath === "/Admin/Courses") {
      return "Courses";
    }
    return "DashBoard";
  };

  const activeMenu = getActiveMenu(pathname);

  const menuItems = [
    { name: "DashBoard", icon: LayoutDashboard, href: "/Admin" },
    { name: "Students", icon: GraduationCap, href: "/Admin/Students" },
    { name: "Mentor", icon: MessageCircle, href: "/Admin/Mentor" },
    { name: "Request", icon: FileQuestion, href: "/Admin/Request" },
    { name: "Courses", icon: BookOpen, href: "/Admin/Courses" },

  ];

  return (
    <div className="h-full flex flex-col bg-[#F3F4F6] w-64 shadow-md">
      {/* Logo / Header */}
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-[#0D4C5B]">SkillMentorX</h1>
         <p className="text-black text-xs whitespace-nowrap">Management Panel</p>
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
                        ? "bg-[#1887A1] text-white shadow-md"
                        : "text-[#0D4C5B] hover:bg-white hover:text-[#1887A1]"
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

      {/* Logout */}
      <div className="p-4 border-t border-gray-200 mt-auto">
        <button
          onClick={() => {
            dispatch(logout());
            router.replace("/loginForm");
          }}
          className="w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg font-medium text-red-600 hover:bg-white transition-all duration-200"
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
