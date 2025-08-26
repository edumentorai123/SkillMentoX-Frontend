"use client"

import React, { useState } from 'react';
import { courseCategories } from './courseCategoriesData';
import SectionHeader from './SectionHeader';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import CourseCard from './CourseCard';

const CourseCategories: React.FC = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const handleJourneyClick = () => {
    console.log("Start Your Journey clicked - navigating to profile setup");
    // This will work with your Next.js Link component
  };

  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-8 sm:py-12 md:py-20 px-3 sm:px-4 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <SectionHeader />

        {/* Categories Grid */}
        <div 
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 md:gap-8 opacity-0 animate-fade-in-up"
          style={{
            animationDelay: '0.1s',
            animationFillMode: 'forwards'
          }}
        >
          {courseCategories.map((category, index) => (
            <CourseCard
              key={category.title}
              category={category}
              index={index}
              hoveredCard={hoveredCard}
              setHoveredCard={setHoveredCard}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div 
          className="text-center mt-12 sm:mt-20 opacity-0 animate-fade-in-up"
          style={{
            animationDelay: '1s',
            animationFillMode: 'forwards'
          }}
        >
          <div className="bg-gradient-to-r from-[#1887A1] to-[#0D4C5B] rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-20 sm:w-40 h-20 sm:h-40 bg-white rounded-full -translate-x-10 sm:-translate-x-20 -translate-y-10 sm:-translate-y-20" />
              <div className="absolute bottom-0 right-0 w-30 sm:w-60 h-30 sm:h-60 bg-white rounded-full translate-x-15 sm:translate-x-30 translate-y-15 sm:translate-y-30" />
            </div>
            
            <div className="relative z-10">
              <h3 
                className="text-xl sm:text-2xl md:text-4xl font-bold mb-3 sm:mb-4 opacity-0 animate-fade-in-up"
                style={{
                  animationDelay: '1.2s',
                  animationFillMode: 'forwards'
                }}
              >
                Ready to Transform Your Career?
              </h3>
              
              <p 
                className="text-base sm:text-lg md:text-xl text-blue-100 mb-6 sm:mb-8 max-w-2xl mx-auto px-2 opacity-0 animate-fade-in-up"
                style={{
                  animationDelay: '1.4s',
                  animationFillMode: 'forwards'
                }}
              >
                Join over 50,000 students who have already started their journey to success
              </p>
              
              <div
                className="opacity-0 animate-fade-in-up"
                style={{
                  animationDelay: '1.6s',
                  animationFillMode: 'forwards'
                }}
              >
                <Link href="/StudentProfile">
                  <button
                    onClick={handleJourneyClick}
                    className="inline-flex items-center space-x-2 sm:space-x-3 cursor-pointer px-6 sm:px-8 md:px-12 py-3 sm:py-4 bg-white text-[#1887A1] font-bold text-base sm:text-lg rounded-xl sm:rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 group transform hover:scale-105 active:scale-95"
                  >
                    <span>Start Your Journey</span>
                    <div className="animate-pulse-arrow">
                      <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS */}
      <style jsx>{`
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(50px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse-arrow {
          0%, 100% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(4px);
          }
        }
        
        .animate-slide-up {
          animation: slide-up 0.8s cubic-bezier(0.25, 0.25, 0, 1) forwards;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }

        .animate-pulse-arrow {
          animation: pulse-arrow 1.5s ease-in-out infinite;
        }
        
        .scroll-animate {
          transition: all 0.8s cubic-bezier(0.25, 0.25, 0, 1);
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 4px;
        }
        
        ::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        
        ::-webkit-scrollbar-thumb {
          background: #1887A1;
          border-radius: 2px;
        }

        /* Mobile optimizations */
        @media (max-width: 640px) {
          .grid {
            gap: 1rem;
          }
          
          body {
            overflow-x: hidden;
          }
          
          button, a {
            min-height: 44px;
          }
        }

        /* Tablet optimizations */
        @media (min-width: 641px) and (max-width: 1024px) {
          .grid-cols-2 > * {
            min-height: 500px;
          }
        }
      `}</style>
    </section>
  );
};

export default CourseCategories;