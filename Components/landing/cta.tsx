import React from 'react';
import Link from 'next/link';

const CTA = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-[#1887A1] to-[#0D4C5B]">
      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <div data-aos="fade-up" className="scroll-animation opacity-0 translate-y-8 transition-all duration-1000">
          <h2 className="text-4xl font-bold text-white mb-6">Join 1000+ Learners Today</h2>
          <p className="text-xl text-white opacity-90 mb-8">Start your personalized learning journey with AI and human mentorship</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/Register">
              <button className="bg-white text-[#1887A1] px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors duration-300 transform hover:scale-105 cursor-pointer">
                Get Start Free
              </button>
            </Link>
            <Link href="/demo">
              <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-[#1887A1] transition-all duration-300 cursor-pointer">
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