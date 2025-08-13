import React from 'react';
import { Brain, MessageCircle, Users, BarChart3, Smartphone } from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: "AI Tutor",
    description: "Get instant AI tutoring, explanations, and personalized learning recommendations based on your progress."
  },
  {
    icon: MessageCircle,
    title: "Mentor Chat",
    description: "Connect directly with expert mentors for guidance, career advice and deep subject knowledge."
  },
  {
    icon: Users,
    title: "Group Study",
    description: "Join collaborative study groups to learn together and share knowledge with peers from around the world."
  },
  {
    icon: Brain,
    title: "Smart Quizzes",
    description: "Test your knowledge with adaptive quizzes that adjust difficulty based on your performance."
  },
  {
    icon: BarChart3,
    title: "Progress Tracking",
    description: "Monitor your learning journey with detailed analytics and personalized insights."
  },
  {
    icon: Smartphone,
    title: "Mobile Learning",
    description: "Learn anywhere, anytime with our fully responsive mobile-optimized platform."
  }
];

const Features = () => {
  return (
    <section id="features"  className="py-20 bg-white" style={{ background: 'linear-gradient(135deg, #f0f4f8 0%, #ffffff 100%)' }}>
      <div data-aos="fade-up" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16  transition-all duration-1000">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Powerful Features</h2>
          <p className="text-xl text-gray-600">Everything you need for effective learning in one integrated platform</p>
        </div>
        <div data-aos="fade-up" className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className=" bg-white border-2 border-transparent rounded-2xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group cursor-pointer" style={{ transitionDelay: `${index * 100}ms` }}>
              <div className="w-14 h-14 bg-gradient-to-br from-[#1887A1] to-[#0D4C5B] rounded-xl flex items-center justify-center mb-6 group-hover:animate-bounce-slow transition-transform duration-300">
                <feature.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;