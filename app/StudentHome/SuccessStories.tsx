import React from 'react';
import { Star, Quote } from 'lucide-react';

const successStories = [
  {
    name: "Hrithik",
    story: "The personalized learning path and group study sessions made learning fun and engaging. I went through complex topics easily, just as clearly with content this platform!",
    avatar: "H",
    color: "bg-[#1887A1]",
    rating: 5,
    course: "Data Science"
  },
  {
    name: "Javid",
    story: "The personalized learning path and group study sessions made learning fun and engaging. I went through complex topics easily, just as clearly with content this platform!",
    avatar: "J",
    color: "bg-[#0D4C5B]",
    rating: 5,
    course: "Web Development"
  },
  {
    name: "Afeefa",
    story: "The personalized learning path and group study sessions made learning fun and engaging. I went through complex topics easily, just as clearly with content this platform!",
    avatar: "A",
    color: "bg-gradient-to-br from-[#1887A1] to-[#0D4C5B]",
    rating: 5,
    course: "Machine Learning"
  }
];

const SuccessStories = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div data-aos="fade-up" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Star className="w-4 h-4 mr-2" />
            Success Stories
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Student Success Stories</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Hear from students who ve transformed their learning with SkillMentroX
          </p>
        </div>
        
        <div data-aos="fade-up" className="grid md:grid-cols-3 gap-8">
          {successStories.map((story, index) => (
            <div 
              key={index} 
              className="relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 group overflow-hidden"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-50 to-transparent rounded-bl-3xl opacity-50"></div>
              
              {/* Quote icon */}
              <div className="mb-6">
                <Quote className="w-8 h-8 text-[#1887A1] opacity-20" />
              </div>
              
              {/* Story content */}
              <div className="mb-8">
                <p className="text-gray-700 leading-relaxed text-lg italic font-light">
                  {story.story}
                </p>
              </div>
              
              {/* Rating */}
              <div className="flex items-center mb-6">
                {[...Array(story.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              
              {/* User info */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`w-14 h-14 ${story.color} rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    {story.avatar}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg">{story.name}</h4>
                    <p className="text-sm text-gray-500 font-medium">{story.course}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-400 uppercase tracking-wider">Verified</div>
                  <div className="text-xs text-green-600 font-semibold">✓ Student</div>
                </div>
              </div>
              
              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#1887A1]/5 to-[#0D4C5B]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"></div>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
};

export default SuccessStories;