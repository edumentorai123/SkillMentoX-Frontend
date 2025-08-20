"use client";
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';

const Nav = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { name: "Features", href: "/features" },
    { name: "Mentors", href: "/mentors" },
    { name: "Premium", href: "/premium" },
    { name: "About", href: "/About" },
  ];

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden';
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        document.body.style.overflow = 'unset';
      };
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-18 lg:h-20">
            
            {/* Logo Section */}
            <Link href="/" className="flex items-center group flex-shrink-0">
              <div className="relative w-20 h-12 sm:w-24 sm:h-14 lg:w-32 lg:h-16 transform group-hover:scale-105 transition-transform duration-200">
                <Image
                  src="/skillmentorX.tm.png"
                  alt="Company Logo"
                  fill
                  className="object-contain"
                  priority
                  sizes="(max-width: 640px) 80px, (max-width: 1024px) 96px, 128px"
                />
              </div>
              <span className="text-lg sm:text-xl lg:text-2xl font-bold tracking-wide text-gray-800 group-hover:text-[#1887A1] transition-colors duration-200 ml-2 truncate">
                SkillMentorX
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-gray-600 hover:text-[#1887A1] font-medium transition-colors duration-200 relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#1887A1] transition-all duration-200 group-hover:w-full"></span>
                </Link>
              ))}
              <Link href="/loginForm">
                <button className="bg-[#1887A1] text-white px-6 py-2.5 rounded-2xl hover:bg-[#0D4C5B] cursor-pointer hover:shadow-lg transform hover:scale-105 transition-all duration-200 font-medium">
                  Signup Free
                </button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 text-gray-600 hover:text-[#1887A1] hover:bg-gray-50 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#1887A1]/20 min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
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
        className={`fixed top-0 right-0 w-80 max-w-[85vw] h-full bg-white z-50 transform transition-transform duration-300 ease-in-out lg:hidden shadow-2xl ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Mobile Menu Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-gray-50">
          <div className="flex items-center">
            <div className="relative w-8 h-6 mr-2">
              <Image
                src="/skillmentorX.tm.png"
                alt="SkillMentorX"
                fill
                className="object-contain"
                sizes="32px"
              />
            </div>
            <span className="text-lg font-bold text-gray-800">SkillMentorX</span>
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
          <div className="px-4 py-6 space-y-2">
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-4 px-2">
              Menu
            </div>
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className=" px-4 py-3 rounded-lg text-base font-medium text-gray-700 hover:text-[#1887A1] hover:bg-gray-50 transition-colors duration-200 min-h-[48px] flex items-center"
                onClick={closeMobileMenu}
              >
                {link.name}
              </Link>
            ))}
          </div>
          
          {/* CTA Section */}
          <div className="px-4 py-6 border-t border-gray-100 mt-auto">
            <Link href="/loginForm" onClick={closeMobileMenu}>
              <button className="w-full bg-[#1887A1] text-white px-6 py-3 rounded-2xl hover:bg-[#0D4C5B] cursor-pointer transition-colors duration-200 font-medium text-center min-h-[48px] flex items-center justify-center">
                Signup Free
              </button>
            </Link>
            
            {/* Additional mobile-specific links if needed */}
            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-xs text-gray-500 text-center">
                Already have an account?{' '}
                <Link 
                  href="/login" 
                  className="text-[#1887A1] font-medium hover:underline"
                  onClick={closeMobileMenu}
                >
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        /* Smooth scrolling for mobile menu */
        .overflow-y-auto {
          -webkit-overflow-scrolling: touch;
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

        /* Underline animation for desktop nav */
        .group:hover .absolute {
          width: 100%;
        }
      `}</style>
    </>
  );
};

export default Nav;