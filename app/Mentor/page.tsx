"use client";
import React from 'react';
import { Bell, MessageSquare, Star } from 'lucide-react';

const SkillMentroXDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-blue-600 mb-1">SkillMentroX</h1>
              <p className="text-sm text-blue-400">Welcome back Thomas Shelby! Here's your mentoring overview</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-500 hover:text-gray-700 transition-colors">
                <Bell className="h-5 w-5" />
              </button>
              <button className="p-2 text-gray-500 hover:text-gray-700 transition-colors">
                <MessageSquare className="h-5 w-5" />
              </button>
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors">
                New session
              </button>
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                TS
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          
          {/* Current Students Card */}
          <div className="bg-yellow-100 rounded-2xl p-6 shadow-sm">
            <h3 className="text-gray-700 font-medium text-sm mb-4">No.Of Current Students</h3>
            <div className="text-4xl font-bold text-gray-800">57</div>
          </div>

          {/* Current Batches Card */}
          <div className="bg-purple-200 rounded-2xl p-6 shadow-sm">
            <h3 className="text-gray-700 font-medium text-sm mb-4">No.Of Current Batches</h3>
            <div className="text-4xl font-bold text-gray-800">12</div>
          </div>

          {/* Average Rating Card */}
          <div className="bg-gray-200 rounded-2xl p-6 shadow-sm">
            <h3 className="text-gray-700 font-medium text-sm mb-4">Average Rating</h3>
            <div className="flex items-center">
              <span className="text-4xl font-bold text-gray-800 mr-2">4.5</span>
              <Star className="h-8 w-8 text-yellow-500 fill-yellow-500" />
            </div>
          </div>

          {/* Completed Sessions Card */}
          <div className="bg-green-200 rounded-2xl p-6 shadow-sm md:col-span-1 xl:col-span-1">
            <h3 className="text-gray-700 font-medium text-sm mb-4">Completed Session</h3>
            <div className="text-4xl font-bold text-gray-800">158</div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default SkillMentroXDashboard;