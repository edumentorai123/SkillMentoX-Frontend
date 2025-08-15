"use client";
import React, { useState, useEffect, useRef } from "react";
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
  const profileRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const firstLetter = studentName.charAt(0).toUpperCase();

  const navLinks = [
    { name: "Home", href: "/StudentHome" },
    { name: "Courses", href: "/StudentHome/courses" },
    { name: "Mentor", href: "/StudentHome/mentor" },
    { name: "About", href: "/StudentHome/About" },
  ];

  const profileMenuItems = [
    { name: "Profile", href: "/StudentHome/profile", icon: User },
    { name: "Settings", href: "/StudentHome/settings", icon: Settings },
    { name: "Sign Out", href: "/login", icon: LogOut },
  ];

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileDropdownOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isProfileDropdownOpen || isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isProfileDropdownOpen, isMobileMenuOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsProfileDropdownOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setIsProfileDropdownOpen(false);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
    setIsMobileMenuOpen(false);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="bg-white/95 backdrop-blur-sm shadow-lg sticky top-0 z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
          <div className="flex justify-between items-center h-16 sm:h-18">

            {/* Logo Section */}
            <Link href="/StudentHome" className="flex items-center group min-w-0 flex-shrink-0">
              <div className="relative w-16 h-10 sm:w-20 sm:h-12 lg:w-24 lg:h-14 transform group-hover:scale-105 transition-transform duration-200">
                <Image
                  src="/skillmentorX.tm.png"
                  alt="Company Logo"
                  fill
                  className="object-contain"
                  priority
                  sizes="(max-width: 768px) 80px, (max-width: 1200px) 120px, 150px"
                />
              </div>
              <span className="text-base sm:text-lg lg:text-xl font-bold tracking-wide text-gray-800 group-hover:text-[#1887A1] transition-colors duration-200 ml-1 sm:ml-2 truncate">
                SkillMentorX
              </span>
            </Link>

            {/* Desktop Navigation - Large screens only */}
            <div className="hidden lg:flex items-center space-x-1 xl:space-x-2 flex-1 justify-center max-w-lg mx-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3 xl:px-4 py-2 text-sm font-medium transition-all duration-300 whitespace-nowrap relative group ${pathname === link.href
                      ? "text-[#1887A1]"
                      : "text-gray-600 hover:text-[#1887A1]"
                    }`}
                >
                  {link.name}

                  {/* Active state bottom indicator */}
                  {pathname === link.href && (
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-[#1887A1] rounded-full transition-all duration-300"></div>
                  )}

                  {/* Hover state bottom line */}
                  {pathname !== link.href && (
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-[#1887A1] rounded-full transition-all duration-300 group-hover:w-8"></div>
                  )}
                </Link>
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
              {/* Profile Dropdown */}
              <div className="relative" ref={profileRef}>
                <button
                  onClick={toggleProfileDropdown}
                  className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-r from-[#1887A1] to-[#0D4C5B] cursor-pointer rounded-full flex items-center justify-center text-white text-sm sm:text-base font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 ring-2 ring-transparent hover:ring-[#1887A1]/20 focus:outline-none focus:ring-2 focus:ring-[#1887A1]/30"
                  aria-label="Profile menu"
                  aria-expanded={isProfileDropdownOpen}
                >
                  {firstLetter}
                </button>

                {/* Profile Dropdown Menu */}
                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 sm:w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 animate-fadeIn">
                    <div className="px-3 sm:px-4 py-2 sm:py-3 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900 truncate">{studentName}</p>
                      <p className="text-xs text-gray-500">Student Account</p>
                    </div>

                    {profileMenuItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="flex items-center px-3 sm:px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#1887A1] transition-colors duration-150"
                        onClick={() => setIsProfileDropdownOpen(false)}
                      >
                        <item.icon className="w-4 h-4 mr-2 sm:mr-3 flex-shrink-0" />
                        <span className="truncate">{item.name}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile Menu Button - Show on mobile and tablet */}
              <button
                onClick={toggleMobileMenu}
                className="lg:hidden p-2 text-gray-500 hover:text-[#1887A1] hover:bg-gray-50 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#1887A1]/20 min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="Toggle mobile menu"
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={closeMobileMenu}
        />
      )}

      {/* Mobile Menu */}
      <div
        ref={mobileMenuRef}
        className={`fixed top-0 right-0 w-80 max-w-[85vw] h-full bg-white z-50 transform transition-transform duration-300 ease-in-out lg:hidden shadow-2xl ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        {/* Mobile Menu Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-gray-50">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gradient-to-r from-[#1887A1] to-[#0D4C5B] rounded-full flex items-center justify-center text-white text-sm font-semibold mr-3">
              {firstLetter}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">{studentName}</p>
              <p className="text-xs text-gray-500">Student Account</p>
            </div>
          </div>
          <button
            onClick={closeMobileMenu}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200 min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mobile Menu Content */}
        <div className="flex flex-col h-full overflow-y-auto">
          {/* Navigation Links */}
          <div className="px-4 py-6 space-y-1">
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-4 px-2">
              Navigation
            </div>
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`px-4 py-3 rounded-lg text-base font-medium transition-colors duration-200 min-h-[48px] flex items-center ${pathname === link.href
                  ? "text-[#1887A1] bg-[#1887A1]/10 border-l-4 border-[#1887A1]"
                  : "text-gray-700 hover:text-[#1887A1] hover:bg-gray-50"
                  }`}
                onClick={closeMobileMenu}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Profile Menu Items */}
          <div className="px-4 py-6 border-t border-gray-100 mt-auto">
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-4 px-2">
              Account
            </div>
            {profileMenuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center px-4 py-3 text-base text-gray-700 hover:text-[#1887A1] hover:bg-gray-50 rounded-lg transition-colors duration-150 min-h-[48px]"
                onClick={closeMobileMenu}
              >
                <item.icon className="w-5 h-5 mr-3 flex-shrink-0" />
                <span>{item.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }

        /* Better focus styles */
        button:focus {
          outline: none;
        }

        /* Prevent text selection on buttons */
        button {
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }

        /* Ensure proper touch targets */
        @media (max-width: 1024px) {
          button, a {
            min-height: 44px;
          }
        }

        /* Smooth scrolling for mobile menu */
        .overflow-y-auto {
          -webkit-overflow-scrolling: touch;
        }
      `}</style>
    </>
  );
};

export default Navbar;