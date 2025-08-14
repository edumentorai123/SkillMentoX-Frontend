"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Menu, X, Settings, LogOut, User } from "lucide-react";

interface NavbarProps {
  studentName?: string;
}

const Navbar: React.FC<NavbarProps> = ({ studentName = "Student" }) => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const firstLetter = studentName.charAt(0).toUpperCase();

  const navLinks = [
    { name: "Home", href: "/StudentHome" },
    { name: "Courses", href: "/StudentHome/courses" },
    { name: "Mentor", href: "/StudentHome/mentor" },
    { name: "About", href: "/StudentHome/profile" },
  ];

  const profileMenuItems = [
    { name: "Profile", href: "/StudentHome/profile", icon: User },
    { name: "Settings", href: "/StudentHome/settings", icon: Settings },
    { name: "Sign Out", href: "/login", icon: LogOut },
  ];

  return (
    <nav className="bg-white/95 backdrop-blur-sm shadow-lg sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <Link href="/StudentHome" className="flex items-center group">
            <div className="relative w-32 h-[90px] transform group-hover:scale-105 transition-transform duration-200">
              <Image
                src="/skillmentorX.tm.png"
                alt="Company Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span
        className="text-2xl font-bold tracking-wide text-gray-800 group-hover:text-[#1887A1] transition-colors duration-200"
        style={{ lineHeight: "1.2" }}
            >
        SkillMentorX
        </span>
            </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`px-4 py-2 text-sm font-medium transition-all duration-200 ${
                  pathname === link.href
                    ? "text-[#1887A1] border-[#1887A1]"
                    : "text-gray-600 border-transparent hover:text-[#1887A1] hover:border-[#1887A1]"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-3">
            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="w-10 h-10 bg-gradient-to-r from-[#1887A1] to-[#0D4C5B] cursor-pointer rounded-full flex items-center justify-center text-white font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 ring-2 ring-transparent hover:ring-[#1887A1]/20"
              >
                {firstLetter}
              </button>

                {/* Profile Dropdown Menu */}
              {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">{studentName}</p>
                    <p className="text-xs text-gray-500">Student Account</p>
                  </div>
                  
                  {profileMenuItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="flex items-center px-4 py-2 text-sm text-gray-700  hover:bg-gray-50 hover:text-[#1887A1] transition-colors duration-150"
                      onClick={() => setIsProfileDropdownOpen(false)}
                    >
                      <item.icon className="w-4 h-4 mr-3" />
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-500 hover:text-[#1887A1] hover:bg-gray-50 rounded-lg transition-colors duration-200"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-100 py-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  pathname === link.href
                    ? "text-[#1887A1] bg-gray-100"
                    : "text-gray-600 hover:text-[#1887A1] hover:bg-gray-50"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Click outside handler */}
      {(isProfileDropdownOpen || isMobileMenuOpen) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setIsProfileDropdownOpen(false);
            setIsMobileMenuOpen(false);
          }}
        />
      )}
    </nav>
  );
};

export default Navbar;
