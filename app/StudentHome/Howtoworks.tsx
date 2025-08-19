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
    <section className="py-20 bg-white">
      <div data-aos="fade-up" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">How to Works</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">Get started in just three simple steps and begin your personalized learning journey</p>
        </div>
        
        <div  className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {howItWorksSteps.map((step, index) => (
            <div key={index} data-aos="fade-up" className="bg-white rounded-2xl p-8 text-center relative cursor-pointer shadow-lg border border-gray-100 group hover:shadow-md transition-all duration-300">
              {/* Small hover line at top */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-[#1887A1] to-[#0D4C5B] rounded-b-full group-hover:w-16 transition-all duration-300"></div>
              {/* Step number circle */}
              <div 
                className="w-16 h-16 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 shadow-lg"
                style={{
                  background: 'linear-gradient(135deg, #1887A1 0%, #0D4C5B 100%)'
                }}
              >
                {step.number}
              </div>
              
              {/* Title */}
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{step.title}</h3>
              
              {/* Description */}
              <p className="text-gray-600 leading-relaxed">{step.description}</p>
              
              {/* Connecting line for desktop */}
              {index < howItWorksSteps.length - 1 && (
                <div className="hidden md:block absolute top-12 -right-4 w-8 h-0.5 "></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;