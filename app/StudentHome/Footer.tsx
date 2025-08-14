import React from "react";
import Link from "next/link";


const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Logo + Description */}
          <div>
            <Link href="/StudentHome" className="inline-block">
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

          {/* Platform */}
          <div>
            <h3 className="text-white font-semibold mb-4">Platform</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/mentors"
                  className="hover:text-[#1887A1] transition-colors"
                >
                  Find Mentors
                </Link>
              </li>
              <li>
                <Link
                  href="/ai-tutoring"
                  className="hover:text-[#1887A1] transition-colors"
                >
                  AI Tutoring
                </Link>
              </li>
              <li>
                <Link
                  href="/group-study"
                  className="hover:text-[#1887A1] transition-colors"
                >
                  Group Study
                </Link>
              </li>
              <li>
                <Link
                  href="/mobile-app"
                  className="hover:text-[#1887A1] transition-colors"
                >
                  Mobile App
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="hover:text-[#1887A1] transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="hover:text-[#1887A1] transition-colors"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="hover:text-[#1887A1] transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-[#1887A1] transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/help"
                  className="hover:text-[#1887A1] transition-colors"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="hover:text-[#1887A1] transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/community"
                  className="hover:text-[#1887A1] transition-colors"
                >
                  Community
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="hover:text-[#1887A1] transition-colors"
                >
                  Privacy & Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom line */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 SkillMentorX. All rights reserved based on your learning worldwide.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
