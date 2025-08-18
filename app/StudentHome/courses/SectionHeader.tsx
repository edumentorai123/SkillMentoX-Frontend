import React from 'react';

const SectionHeader: React.FC = () => (
  <div 
    className="text-center mb-12 sm:mb-16 opacity-0 animate-fade-in-up"
    style={{
      animationDelay: '0.2s',
      animationFillMode: 'forwards'
    }}
  >
    <div
      className="inline-block mb-4 opacity-0 animate-scale-in"
      style={{
        animationDelay: '0.4s',
        animationFillMode: 'forwards'
      }}
    >
      <span className="bg-gradient-to-r from-[#1887A1] to-[#0D4C5B] text-white px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium">
        ✨ 50,000+ Students Enrolled
      </span>
    </div>
    
    <h1 
      className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-[#0D4C5B] mb-4 sm:mb-6 leading-tight px-2 opacity-0 animate-fade-in-up"
      style={{
        animationDelay: '0.6s',
        animationFillMode: 'forwards'
      }}
    >
      Master <span className="bg-gradient-to-r from-[#1887A1] to-[#0D4C5B] bg-clip-text text-transparent">In-Demand</span> Skills
    </h1>
    
    <p 
      className="text-base sm:text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed px-4 opacity-0 animate-fade-in-up"
      style={{
        animationDelay: '0.8s',
        animationFillMode: 'forwards'
      }}
    >
      Choose from our expertly curated courses designed by industry professionals. 
      Build real projects, earn certificates, and advance your career with hands-on learning.
    </p>

    <style jsx>{`
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

      @keyframes scale-in {
        from {
          opacity: 0;
          transform: scale(0.8);
        }
        to {
          opacity: 1;
          transform: scale(1);
        }
      }

      .animate-fade-in-up {
        animation: fade-in-up 0.8s ease-out forwards;
      }

      .animate-scale-in {
        animation: scale-in 0.6s ease-out forwards;
      }
    `}</style>
  </div>
);

export default SectionHeader;