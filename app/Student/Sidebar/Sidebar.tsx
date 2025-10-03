"use client";
import {
  LayoutDashboard,
  HelpCircle,
  MessageCircle,
  FileQuestion,
  BookOpen,
  Menu,
  X,
} from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useMemo, useState, useEffect } from "react";
import Image from "next/image";

function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsMobileOpen(false);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  const handleMouseEnter = () => {
    if (!isMobile) {
      setIsCollapsed(false);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      setIsCollapsed(true);
    }
  };

  const getActiveMenu = useMemo(() => {
    return (currentPath: string) => {
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
  }, []);

  const activeMenu = useMemo(() => getActiveMenu(pathname), [pathname, getActiveMenu]);

  const menuItems = useMemo(() => [
    { name: "DashBoard", icon: LayoutDashboard, href: "/Student" },
    { name: "My Doubts", icon: HelpCircle, href: "/Student/MyDouts" },
    { name: "Chats", icon: MessageCircle, href: "/Student/Chat" },
    { name: "Quizzes", icon: FileQuestion, href: "/Student/Quiezz" },
    { name: "Course", icon: BookOpen, href: "/Student/Course" },
  ], []);

  const sidebarWidth = isCollapsed ? "w-20" : "w-64";

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-[#1887A1] text-white shadow-lg hover:bg-[#0D4C5B] transition-all duration-200 transform hover:scale-105"
        aria-label="Toggle menu"
      >
        {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30 transition-opacity duration-300"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Fixed Sidebar */}
      <div
        className={`
          ${isMobile ? 'fixed' : 'fixed'} 
          ${isMobile && !isMobileOpen ? '-translate-x-full' : 'translate-x-0'}
          ${sidebarWidth}
          h-screen top-0 left-0 flex flex-col bg-white shadow-xl z-40
          transition-all duration-300 ease-in-out
          border-r border-gray-100
        `}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Header - Enhanced Logo Section */}
        <div className="relative p-6 bg-white">
          {!isCollapsed && (
            <div className="transition-opacity duration-200">
              <h1 className="text-2xl font-bold text-[#1887A1] pb-2 border-b border-gray-200">
                SkillMentorX
              </h1>
            </div>
          )}
          {isCollapsed && (
            <div className="flex justify-center pb-2 border-b border-gray-200">
              <div className="relative w-20 h-20 rounded-lg overflow-hidden">
                <Image
                  src="/skillmentorX.tm.png"
                  alt="SMX Logo"
                  fill
                  sizes="80px"
                  style={{ objectFit: "cover", objectPosition: "center" }}
                  className="filter drop-shadow-sm transition-transform duration-300 hover:scale-105"
                  priority={false}
                />
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-2">
            {menuItems.map((item, index) => {
              const IconComponent = item.icon;
              const isActive = activeMenu === item.name;

              return (
                <li
                  key={item.name}
                  className="transform transition-all duration-200"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <Link
                    href={item.href}
                    className={`
                      group relative w-full px-4 py-3 rounded-xl font-medium 
                      transition-all duration-300 ease-out
                      flex items-center
                      ${isCollapsed ? 'justify-center px-2' : 'justify-start space-x-3'}
                      transform hover:scale-[1.02] active:scale-[0.98]
                      ${isActive
                        ? "bg-gradient-to-r from-[#1887A1] to-[#0D4C5B] text-white shadow-lg shadow-[#1887A1]/25"
                        : "text-[#0D4C5B] hover:bg-gradient-to-r hover:from-[#1887A1]/10 hover:to-[#0D4C5B]/10 hover:text-[#0D4C5B] hover:shadow-md"
                      }
                    `}
                    prefetch={false}
                    replace={false}
                  >
                    <div className="relative">
                      <IconComponent
                        className={`
                          w-5 h-5 flex-shrink-0 transition-all duration-300
                          ${isActive ? 'drop-shadow-sm' : 'group-hover:scale-110'}
                        `}
                      />
                      {/* Active indicator dot */}
                      {isActive && isCollapsed && (
                        <div className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full animate-pulse" />
                      )}
                    </div>

                    {!isCollapsed && (
                      <span className="transition-opacity duration-200 truncate">
                        {item.name}
                      </span>
                    )}

                    {/* Tooltip for collapsed state */}
                    {isCollapsed && (
                      <div className="absolute left-full ml-2 px-3 py-1 bg-gray-900 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 shadow-lg">
                        {item.name}
                        <div className="absolute left-0 top-1/2 transform -translate-x-1 -translate-y-1/2 w-2 h-2 bg-gray-900 rotate-45" />
                      </div>
                    )}

                    {/* Ripple effect */}
                    <div className="absolute inset-0 rounded-xl overflow-hidden">
                      <div className="absolute inset-0 transform scale-0 bg-white/20 rounded-xl transition-transform duration-300 group-active:scale-100" />
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      <div className={`hidden md:block ${sidebarWidth} flex-shrink-0 transition-all duration-300`} />
    </>
  );
}

export default Sidebar;