
'use client';
import React, { useState } from 'react';
import { 
  User,
  Play,
} from 'lucide-react';

const Course = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [activeNav, setActiveNav] = useState('Course');



  const handleNavClick = (navId: string, label: string) => {
    setActiveNav(label);
    setSidebarOpen(false);
    console.log(`Navigating to: ${label}`);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Main Content */}
      <div className="flex-1 bg-blue-500 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-6 py-4 text-white">
            <h2 className="text-xl font-medium">Welcome back, Faizy</h2>
            <p className="text-white/80 text-sm">Ready to continue your learning journey?</p>
          </div>
          
          <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-white">
            <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center mr-2">
              <User className="w-4 h-4" />
            </div>
            <span className="font-medium">Faizy</span>
          </div>
        </div>

        {/* My Courses Section */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-white mb-6">My Courses</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* React Course */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="bg-gradient-to-br from-teal-500 to-teal-700 rounded-xl p-6 mb-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="relative z-10">
                  <div className="w-12 h-12 bg-black/20 rounded-lg flex items-center justify-center mb-4">
                    <div className="w-6 h-6 border-2 border-white rounded-full relative">
                      <div className="absolute top-1 left-1 w-1 h-1 bg-white rounded-full"></div>
                      <div className="absolute top-2 left-3 w-2 h-0.5 bg-white rounded"></div>
                      <div className="absolute bottom-1 right-1 w-1 h-1 bg-white rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <h4 className="text-lg font-semibold text-gray-800 mb-2">Complete React Developer Bootcamp</h4>
              <p className="text-sm text-gray-600 mb-4">65% Complete</p>
              
              <div className="mb-4">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-teal-600 h-2 rounded-full" style={{ width: '65%' }}></div>
                </div>
              </div>
              
              <div className="flex justify-between items-center mb-4">
                <span className="bg-teal-100 text-teal-700 px-3 py-1 rounded-full text-sm font-medium">Frontend</span>
              </div>
              
              <button className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-xl font-medium transition-colors flex items-center justify-center">
                <Play className="w-4 h-4 mr-2" />
                Continue
              </button>
            </div>

            {/* Node.js Course */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="bg-gradient-to-br from-teal-500 to-teal-700 rounded-xl p-6 mb-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="relative z-10">
                  <div className="w-12 h-12 bg-black/20 rounded-lg flex items-center justify-center mb-4">
                    <div className="text-green-400 font-bold text-lg">js</div>
                  </div>
                </div>
              </div>
              
              <h4 className="text-lg font-semibold text-gray-800 mb-2">Complete Node.js Express.js Developer Bootcamp</h4>
              <p className="text-sm text-gray-600 mb-4">0% Complete</p>
              
              <div className="mb-4">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-teal-600 h-2 rounded-full" style={{ width: '0%' }}></div>
                </div>
              </div>
              
              <div className="flex justify-between items-center mb-4">
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">Backend</span>
              </div>
              
              <button className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-xl font-medium transition-colors flex items-center justify-center">
                <Play className="w-4 h-4 mr-2" />
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Course;
