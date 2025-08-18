import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-16">
      <div data-aos="fade-up" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="inline-block">
              <div className="flex flex-col items-start space-y-2">
                <span className="text-2xl font-bold tracking-wide text-white hover:text-[#1887A1] transition-colors duration-200">
                  SkillMentorX
                </span>
              </div>
            </Link>
            <p className="mt-4 text-gray-400 leading-relaxed max-w-xs">
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