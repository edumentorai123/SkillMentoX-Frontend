// app/components/Footer.tsx
// Place this in the "components" folder.

import React from 'react';
import Link from 'next/link';
import { Bot } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-center space-x-2 mb-6 cursor-pointer">
              <div className="w-8 h-8 bg-gradient-to-r from-[#1887A1] to-[#0D4C5B] rounded-lg flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">SkillMentroX</span>
            </Link>
            <p className="text-gray-400 leading-relaxed">
              AI-powered learning with human expertise to accelerate your growth.
            </p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Platform</h3>
            <ul className="space-y-2">
              <li><Link href="/mentors" className="hover:text-[#1887A1] transition-colors cursor-pointer">Find Mentors</Link></li>
              <li><Link href="/ai-tutoring" className="hover:text-[#1887A1] transition-colors cursor-pointer">AI Tutoring</Link></li>
              <li><Link href="/group-study" className="hover:text-[#1887A1] transition-colors cursor-pointer">Group Study</Link></li>
              <li><Link href="/mobile-app" className="hover:text-[#1887A1] transition-colors cursor-pointer">Mobile App</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="hover:text-[#1887A1] transition-colors cursor-pointer">About</Link></li>
              <li><Link href="/careers" className="hover:text-[#1887A1] transition-colors cursor-pointer">Careers</Link></li>
              <li><Link href="/blog" className="hover:text-[#1887A1] transition-colors cursor-pointer">Blog</Link></li>
              <li><Link href="/contact" className="hover:text-[#1887A1] transition-colors cursor-pointer">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><Link href="/help" className="hover:text-[#1887A1] transition-colors cursor-pointer">Help Center</Link></li>
              <li><Link href="/faq" className="hover:text-[#1887A1] transition-colors cursor-pointer">FAQ</Link></li>
              <li><Link href="/community" className="hover:text-[#1887A1] transition-colors cursor-pointer">Community</Link></li>
              <li><Link href="/privacy" className="hover:text-[#1887A1] transition-colors cursor-pointer">Privacy & Terms</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400">© 2025 SkillMentroX. All rights reserved based on your learning worldwide.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;