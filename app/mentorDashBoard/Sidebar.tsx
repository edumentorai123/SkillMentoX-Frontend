"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  MessageCircle,
  GraduationCap,
  Calendar,
  TrendingUp,
  User,
  BookOpen,
  X,
  ChevronRight,
} from "lucide-react";

interface SidebarProps {
  sidebarCollapsed: boolean;
  setSidebarCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Sidebar({
  sidebarCollapsed,
  setSidebarCollapsed,
  mobileMenuOpen,
  setMobileMenuOpen,
}: SidebarProps) {
  const pathname = usePathname();

  const links = [
    { href: "/mentorDashBoard", label: "Dashboard", icon: Activity },
    {href: "/mentorDashBoard/StudentDoubts",label: "Student Doubts",icon: MessageCircle,},
    { href: "/mentorDashBoard/MyStudent", label: "My Students",icon: GraduationCap,},
    { href: "/mentorDashBoard/Sessions", label: "Sessions", icon: Calendar },
    { href: "/mentorDashBoard/Chat", label: "Chat", icon: TrendingUp },
    { href: "/mentorDashBoard/Profile", label: "Profile", icon: User },
  ];


  const isLinkActive = (href: string) => {
    if (href === "/mentorDashBoard") {

      return pathname === "/mentorDashBoard";
    }
   
    return pathname.startsWith(href);
  };

  return (
    <>
    
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="bg-white w-64 h-full shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{
                    background: "linear-gradient(to right, #1887A1, #0D4C5B)",
                  }}
                >
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <span className="ml-2 text-xl font-bold text-gray-900">
                  SkillMentroX
                </span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <nav className="mt-8 space-y-1">
              {links.map(({ href, label, icon: Icon }) => {
                const active = isLinkActive(href);
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`flex items-center px-4 py-3 rounded-lg transition ${
                      active
                        ? "bg-blue-50 text-[#1887A1] border-r-2 border-[#1887A1]"
                        : "text-gray-600 hover:text-gray-900 hover:bg-blue-50"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="ml-3 font-medium">{label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div
        className={`${
          sidebarCollapsed ? "w-16" : "w-64"
        } bg-white shadow-lg transition-all duration-300 min-h-screen hidden lg:block`}
      >
        <div className="p-4 flex items-center justify-between">
          {!sidebarCollapsed && (
            <div className="flex items-center">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{
                  background: "linear-gradient(to right, #1887A1, #0D4C5B)",
                }}
              >
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="ml-2 text-xl font-bold text-gray-900">
                SkillMentroX
              </span>
            </div>
          )}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronRight
              className={`w-5 h-5 text-gray-500 transition-transform ${
                sidebarCollapsed ? "" : "rotate-180"
              }`}
            />
          </button>
        </div>

        <nav className="mt-8 space-y-1">
          {links.map(({ href, label, icon: Icon }) => {
            const active = isLinkActive(href);
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center px-4 py-3 rounded-lg transition ${
                  active
                    ? "bg-blue-50 text-[#1887A1] border-r-2 border-[#1887A1]"
                    : "text-gray-600 hover:text-gray-900 hover:bg-blue-50"
                }`}
              >
                <Icon className="w-5 h-5" />
                {!sidebarCollapsed && (
                  <span className="ml-3 font-medium">{label}</span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
}
