import React from 'react';
import Link from 'next/link';
import { Star } from 'lucide-react';

const mentors = [
  {
    name: "Danish Pv",
    role: "Python Developer",
    rating: 4.9,
    students: "2.5k",
    avatar: "DP",
    color: "bg-[#1887A1]"
  },
  {
    name: "Dhilshad Tk",
    role: "Web Front Developer",
    rating: 4.8,
    students: "3.1k",
    avatar: "DK",
    color: "bg-[#0D4C5B]"
  },
  {
    name: "Faisal Pk",
    role: "UI President",
    rating: 4.9,
    students: "1.8k",
    avatar: "FP",
    color: "bg-gradient-to-br from-[#1887A1] to-[#0D4C5B]"
  }
];

const Mentors = () => {
  return (
    <section id="mentors" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 scroll-animation opacity-0 translate-y-8 transition-all duration-1000">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Top Mentors</h2>
          <p className="text-xl text-gray-600">Learn from industry experts and experienced educators</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {mentors.map((mentor, index) => (
            <div key={index} className="scroll-animation opacity-0 translate-y-8 bg-white border-2 border-gray-100 rounded-2xl p-8 text-center hover:border-[#1887A1] hover:shadow-lg transition-all duration-300 group cursor-pointer" style={{ transitionDelay: `${index * 150}ms` }}>
              <div className={`w-20 h-20 ${mentor.color} rounded-full flex items-center justify-center text-2xl font-bold text-white mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                {mentor.avatar}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{mentor.name}</h3>
              <p className="text-gray-600 mb-4">{mentor.role}</p>
              <div className="flex items-center justify-center space-x-4 text-sm">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-[#1887A1]" />
                  <span className="text-gray-600">{mentor.rating}</span>
                </div>
                <div className="text-gray-400">•</div>
                <div className="text-gray-600">{mentor.students} students</div>
              </div>
              <Link href={`/mentors/${mentor.name.toLowerCase().replace(' ', '-')}`}>
                <button className="mt-6 w-full bg-gray-100 text-gray-700 py-3 rounded-xl hover:bg-[#1887A1] hover:text-white transition-colors duration-300 cursor-pointer">
                  View Profile
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Mentors;