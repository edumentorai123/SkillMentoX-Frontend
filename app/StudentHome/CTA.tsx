import React from "react";
import Link from "next/link";

const CTA = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-[#1887A1] to-[#0D4C5B]">
      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        {/* Removed opacity-0 so it's always visible */}
        <div className="transition-all duration-1000 transform">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Join 1000+ Learners Today
          </h2>
          <p className="text-lg sm:text-xl text-white/90 mb-8 leading-relaxed">
            Start your personalized learning journey with AI and human
            mentorship.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/SetupProfile">
              <button className="bg-white text-[#1887A1] px-8 py-4 rounded-xl font-semibold cursor-pointer shadow-md hover:bg-gray-100 transition-transform duration-300 hover:scale-105">
                Get Started Free
              </button>
            </Link>
            <Link href="/demo">
              <button className="border-2 border-white cursor-pointer text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-[#1887A1] transition-colors duration-300">
                View Demo
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
