
import React from 'react';

const howItWorksSteps = [
  {
    number: "1",
    title: "Sign Up",
    description: "Create your account and tell us about your learning goals, current level, and preferred subjects."
  },
  {
    number: "2", 
    title: "Learn via AI Mentor",
    description: "Get instant help from our AI tutor but integrate graphics or learn 1-on-1 sessions with expert mentors."
  },
  {
    number: "3",
    title: "Track Progress", 
    description: "Monitor your learning journey with detailed analytics, achievements, and personalized recommendations."
  }
];

const HowItWorks = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 scroll-animation opacity-0 translate-y-8 transition-all duration-1000">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
          <p className="text-xl text-gray-600">Get started in just three simple steps and begin your personalized learning journey</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {howItWorksSteps.map((step, index) => (
            <div key={index} className="scroll-animation opacity-0 translate-y-8 transition-all duration-1000 text-center group" style={{ transitionDelay: `${index * 200}ms` }}>
              <div className="relative mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-[#1887A1] to-[#0D4C5B] text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300 cursor-pointer animate-pulse-slow">
                  {step.number}
                </div>
                {index < howItWorksSteps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gray-200 -translate-y-1/2 group-hover:bg-[#1887A1] transition-colors duration-300"></div>
                )}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
              <p className="text-gray-600 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;