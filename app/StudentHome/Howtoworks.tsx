'use client';

import React, { useState } from 'react';

interface Step {
  number: string;
  title: string;
  description: string;
  isPremium?: boolean;
  premiumPrice?: number;
  premiumDetails?: string;
}

const howItWorksSteps: Step[] = [
  {
    number: '1',
    title: 'Sign Up',
    description: 'Create your account and tell us about your learning goals, current level, and preferred subjects.',
  },
  {
    number: '2',
    title: 'Upgrade to Premium',
    description:
      'Get full access to personalized mentoring, advanced AI tutor support, and exclusive study resources with our Premium plan.',
    isPremium: true,
    premiumPrice: 2999,
    premiumDetails: `
      • 1-on-1 sessions with expert mentors  
      • Advanced AI mentor for instant help  
      • Tailored study plans for your goals  
      • Exclusive notes, assignments & practice sets  
      • Priority support for quick issue resolution  
    `,
  },
  {
    number: '3',
    title: 'Track Progress',
    description:
      'Monitor your learning journey with detailed analytics, achievements, and personalized recommendations.',
  },
];

const HowItWorks = () => {
  const [selectedStep, setSelectedStep] = useState<Step | null>(null);

  const handleStepClick = (step: Step) => {
    if (step.isPremium) {
      setSelectedStep(step);
    }
  };

  return (
    <section className="py-20 bg-white">
      <div data-aos="fade-up" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">How it Works</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get started in just three simple steps and begin your personalized learning journey
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto relative">
          {howItWorksSteps.map((step, index) => (
            <div
              key={index}
              data-aos="fade-up"
              onClick={() => handleStepClick(step)}
              className="bg-white rounded-2xl p-8 text-center relative cursor-pointer shadow-lg border border-gray-100 group hover:shadow-md transition-all duration-300"
            >
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-[#1887A1] to-[#0D4C5B] rounded-b-full group-hover:w-16 transition-all duration-300"></div>

              <div
                className="w-16 h-16 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 shadow-lg"
                style={{ background: 'linear-gradient(135deg, #1887A1 0%, #0D4C5B 100%)' }}
              >
                {step.number}
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">{step.title}</h3>
              <p className="text-gray-600 leading-relaxed">{step.description}</p>

              {index < howItWorksSteps.length - 1 && (
                <div className="hidden md:block absolute top-12 -right-4 w-8 h-0.5 bg-gray-200"></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Premium Modal */}
      {selectedStep && (
        <div className="fixed inset-0 bg-white/40 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-8 max-w-md w-full relative z-60 shadow-lg">
            <button
              className="absolute top-4 right-4 text-gray-500 cursor-pointer hover:text-gray-700 text-xl font-bold"
              onClick={() => setSelectedStep(null)}
            >
              &times;
            </button>
            <h3 className="text-2xl font-bold mb-4 text-gray-900">
              {selectedStep.title} - Premium Access
            </h3>
            <ul className="text-gray-600 mb-4 list-disc list-inside space-y-2">
              {selectedStep.premiumDetails?.split('•').map(
                (detail, i) =>
                  detail.trim() && <li key={i}>{detail.trim()}</li>
              )}
            </ul>
            <p className="text-lg font-semibold mb-6">Price: ₹{selectedStep.premiumPrice}</p>
            <button className="bg-blue-600 text-white px-6 cursor-pointer py-2 rounded-lg hover:bg-blue-700 transition">
              Subscribe Now
            </button>
          </div>
        </div>
      )}

    </section>
  );
};

export default HowItWorks;