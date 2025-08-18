import React from 'react';
import Link from 'next/link';
import { Bot } from 'lucide-react';

const Nav = () => {
  return (
    <nav className="bg-white  sticky  top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2 cursor-pointer">
            <div className="w-8 h-8 bg-gradient-to-r from-[#1887A1] to-[#0D4C5B] rounded-lg flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">SkillMentroX</span>
          </Link>
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/features" className="text-gray-600 hover:text-gray-900 transition-colors cursor-pointer">Features</Link>
            <Link href="/mentors" className="text-gray-600 hover:text-gray-900 transition-colors cursor-pointer">Mentors</Link>
            <Link href="/premium" className="text-gray-600 hover:text-gray-900 transition-colors cursor-pointer">Premium</Link>
            <Link href="/about" className="text-gray-600 hover:text-gray-900 transition-colors cursor-pointer">About</Link>
            <Link href="/registerForm">
              <button className="bg-[#1887A1] text-white px-6 py-2 rounded-2xl hover:bg-[#0D4C5B] transition-colors cursor-pointer">
                Signup Free
              </button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;