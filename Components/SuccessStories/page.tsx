import React from 'react';

const successStories = [
  {
    name: "Hrithik",
    story: "The personalized learning path and group study sessions made learning fun and engaging. I went through complex topics easily, just as clearly with content this platform!",
    avatar: "H",
    color: "bg-[#1887A1]"
  },
  {
    name: "Javid",
    story: "The personalized learning path and group study sessions made learning fun and engaging. I went through complex topics easily, just as clearly with content this platform!",
    avatar: "J",
    color: "bg-[#0D4C5B]"
  },
  {
    name: "Afeefa",
    story: "The personalized learning path and group study sessions made learning fun and engaging. I went through complex topics easily, just as clearly with content this platform!",
    avatar: "A",
    color: "bg-gradient-to-br from-[#1887A1] to-[#0D4C5B]"
  }
];

const SuccessStories = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 scroll-animation opacity-0 translate-y-8 transition-all duration-1000">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Student Success Stories</h2>
          <p className="text-xl text-gray-600">Hear from students who've transformed their learning with SkillMentroX</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {successStories.map((story, index) => (
            <div key={index} className="scroll-animation opacity-0 translate-y-8 bg-white border border-gray-100 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer" style={{ transitionDelay: `${index * 150}ms` }}>
              <p className="text-gray-600 leading-relaxed mb-6 italic">"{story.story}"</p>
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 ${story.color} rounded-full flex items-center justify-center text-white font-semibold`}>
                  {story.avatar}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{story.name}</h4>
                  <p className="text-sm text-gray-500">Verified Student</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;