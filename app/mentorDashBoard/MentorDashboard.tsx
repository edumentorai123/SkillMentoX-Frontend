"use client";
import React, { useState } from 'react';
import { 
  User, 
  Calendar, 
  MessageSquare, 
  TrendingUp, 
  Clock, 
  Star, 
  CheckCircle, 
  AlertCircle, 
  Users, 
  BookOpen, 
  Target, 
  Award,
  Bell,
  Settings,
  Search,
  Plus,
  Video,
  Phone,
  Mail,
  Filter,
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react';
import Sidebar from './Sidebar';

export default function MentorDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedMentee, setSelectedMentee] = useState(null);

  // Sample data
  const mentees = [
    {
      id: 1,
      name: "Sarah Johnson",
      avatar: "SJ",
      program: "Career Development",
      progress: 78,
      lastSession: "2 days ago",
      nextSession: "Tomorrow, 2:00 PM",
      status: "on-track",
      goals: 5,
      completed: 4,
      messages: 12
    },
    {
      id: 2,
      name: "Alex Chen",
      avatar: "AC",
      program: "Technical Skills",
      progress: 45,
      lastSession: "1 week ago",
      nextSession: "Friday, 10:00 AM",
      status: "needs-attention",
      goals: 6,
      completed: 2,
      messages: 8
    },
    {
      id: 3,
      name: "Maria Rodriguez",
      avatar: "MR",
      program: "Leadership Training",
      progress: 92,
      lastSession: "Yesterday",
      nextSession: "Next week",
      status: "excellent",
      goals: 4,
      completed: 4,
      messages: 15
    }
  ];

  const upcomingSessions = [
    { id: 1, mentee: "Sarah Johnson", time: "Tomorrow, 2:00 PM", type: "video", topic: "Goal Setting" },
    { id: 2, mentee: "Alex Chen", time: "Friday, 10:00 AM", type: "phone", topic: "Technical Review" },
    { id: 3, mentee: "Maria Rodriguez", time: "Monday, 3:00 PM", type: "video", topic: "Leadership Workshop" }
  ];

  const recentMessages = [
    { id: 1, from: "Sarah Johnson", message: "Thank you for the feedback on my presentation!", time: "2h ago", unread: true },
    { id: 2, from: "Alex Chen", message: "Could we reschedule our Friday session?", time: "4h ago", unread: true },
    { id: 3, from: "Maria Rodriguez", message: "I've completed the leadership assessment", time: "1d ago", unread: false }
  ];

  const stats = {
    totalMentees: 8,
    activeSessions: 12,
    completedGoals: 28,
    avgProgress: 73
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'excellent': return 'text-green-600 bg-green-100';
      case 'on-track': return 'text-blue-600 bg-blue-100';
      case 'needs-attention': return 'text-amber-600 bg-amber-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'excellent': return 'Excellent';
      case 'on-track': return 'On Track';
      case 'needs-attention': return 'Needs Attention';
      default: return 'Unknown';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
    

      <div className="flex">
      
      <Sidebar/>


        <main className="flex-1 p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
        
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { label: 'Total Mentees', value: stats.totalMentees, icon: Users, color: 'blue' },
                  { label: 'Active Sessions', value: stats.activeSessions, icon: Calendar, color: 'green' },
                  { label: 'Completed Goals', value: stats.completedGoals, icon: Target, color: 'purple' },
                  { label: 'Avg Progress', value: `${stats.avgProgress}%`, icon: TrendingUp, color: 'orange' }
                ].map((stat, index) => (
                  <div key={index} className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 hover:shadow-lg transition-all duration-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                        <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
                      </div>
                      <div className={`p-3 rounded-xl bg-${stat.color}-100`}>
                        <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

   
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button className="flex items-center space-x-3 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl hover:shadow-md transition-all">
                    <Plus className="w-5 h-5 text-blue-600" />
                    <span className="font-medium text-blue-900">Schedule Session</span>
                  </button>
                  <button className="flex items-center space-x-3 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl hover:shadow-md transition-all">
                    <MessageSquare className="w-5 h-5 text-green-600" />
                    <span className="font-medium text-green-900">Send Message</span>
                  </button>
                  <button className="flex items-center space-x-3 p-4 bg-gradient-to-r from-purple-50 to-violet-50 border border-purple-200 rounded-xl hover:shadow-md transition-all">
                    <BookOpen className="w-5 h-5 text-purple-600" />
                    <span className="font-medium text-purple-900">Add Resource</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
  
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Upcoming Sessions</h3>
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">View All</button>
                  </div>
                  <div className="space-y-3">
                    {upcomingSessions.map((session) => (
                      <div key={session.id} className="flex items-center justify-between p-4 bg-gray-50/50 rounded-xl">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            {session.type === 'video' ? <Video className="w-4 h-4 text-blue-600" /> : <Phone className="w-4 h-4 text-blue-600" />}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{session.mentee}</p>
                            <p className="text-sm text-gray-500">{session.topic}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900">{session.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

         
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Recent Messages</h3>
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">View All</button>
                  </div>
                  <div className="space-y-3">
                    {recentMessages.map((message) => (
                      <div key={message.id} className="flex items-start space-x-3 p-4 bg-gray-50/50 rounded-xl">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                          {message.from.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="font-medium text-gray-900">{message.from}</p>
                            <span className="text-xs text-gray-500">{message.time}</span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{message.message}</p>
                          {message.unread && <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2"></span>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'mentees' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">My Mentees</h2>
                <div className="flex items-center space-x-3">
                  <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                    <Filter className="w-4 h-4" />
                    <span>Filter</span>
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                    <Plus className="w-4 h-4" />
                    <span>Add Mentee</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mentees.map((mentee) => (
                  <div key={mentee.id} className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 hover:shadow-lg transition-all duration-200">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-semibold">
                        {mentee.avatar}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{mentee.name}</h3>
                        <p className="text-sm text-gray-500">{mentee.program}</p>
                      </div>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(mentee.status)}`}>
                        {getStatusText(mentee.status)}
                      </span>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Progress</span>
                          <span className="font-medium">{mentee.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                          <div 
                            className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${mentee.progress}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div>
                          <p className="text-2xl font-bold text-gray-900">{mentee.completed}</p>
                          <p className="text-xs text-gray-500">Goals Met</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-gray-900">{mentee.goals}</p>
                          <p className="text-xs text-gray-500">Total Goals</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-gray-900">{mentee.messages}</p>
                          <p className="text-xs text-gray-500">Messages</p>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-gray-200">
                        <p className="text-sm text-gray-600 mb-2">
                          <span className="font-medium">Last session:</span> {mentee.lastSession}
                        </p>
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Next session:</span> {mentee.nextSession}
                        </p>
                      </div>

                      <div className="flex space-x-2 pt-2">
                        <button className="flex-1 flex items-center justify-center space-x-1 py-2 text-sm text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100">
                          <MessageSquare className="w-4 h-4" />
                          <span>Message</span>
                        </button>
                        <button className="flex-1 flex items-center justify-center space-x-1 py-2 text-sm text-green-600 bg-green-50 rounded-lg hover:bg-green-100">
                          <Calendar className="w-4 h-4" />
                          <span>Schedule</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'sessions' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Sessions</h2>
                <button className="flex items-center space-x-2 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                  <Plus className="w-4 h-4" />
                  <span>New Session</span>
                </button>
              </div>

              <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-gray-200/50">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center space-x-4">
                    <button className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg">
                      Upcoming
                    </button>
                    <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900">
                      Past
                    </button>
                    <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900">
                      All
                    </button>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="space-y-4">
                    {upcomingSessions.map((session) => (
                      <div key={session.id} className="flex items-center justify-between p-4 bg-gray-50/50 rounded-xl hover:bg-gray-50 transition-colors">
                        <div className="flex items-center space-x-4">
                          <div className="p-3 bg-blue-100 rounded-xl">
                            {session.type === 'video' ? <Video className="w-5 h-5 text-blue-600" /> : <Phone className="w-5 h-5 text-blue-600" />}
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">{session.topic}</h4>
                            <p className="text-sm text-gray-600">with {session.mentee}</p>
                            <p className="text-sm text-gray-500">{session.time}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button className="px-3 py-1 text-sm text-blue-600 hover:text-blue-700">
                            Reschedule
                          </button>
                          <button className="px-3 py-1 text-sm text-green-600 bg-green-50 rounded hover:bg-green-100">
                            Join
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'messages' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Messages</h2>
                <button className="flex items-center space-x-2 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                  <Plus className="w-4 h-4" />
                  <span>New Message</span>
                </button>
              </div>

              <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-gray-200/50 h-96">
                <div className="p-6 h-full">
                  <div className="space-y-4 h-full overflow-y-auto">
                    {recentMessages.map((message) => (
                      <div key={message.id} className="flex items-start space-x-3 p-4 bg-gray-50/50 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                          {message.from.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="font-semibold text-gray-900">{message.from}</p>
                            <span className="text-xs text-gray-500">{message.time}</span>
                          </div>
                          <p className="text-gray-600 mt-1">{message.message}</p>
                          {message.unread && (
                            <div className="flex items-center space-x-1 mt-2">
                              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                              <span className="text-xs text-blue-600 font-medium">Unread</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'progress' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Progress Overview</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Mentee Progress Distribution</h3>
                  <div className="space-y-4">
                    {mentees.map((mentee) => (
                      <div key={mentee.id} className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">{mentee.name}</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full"
                              style={{ width: `${mentee.progress}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium text-gray-900 w-12">{mentee.progress}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Goals Achievement</h3>
                  <div className="text-center">
                    <div className="relative w-32 h-32 mx-auto mb-4">
                      <svg className="w-32 h-32 transform -rotate-90">
                        <circle cx="64" cy="64" r="56" stroke="#e5e7eb" strokeWidth="8" fill="none" />
                        <circle 
                          cx="64" 
                          cy="64" 
                          r="56" 
                          stroke="url(#gradient)" 
                          strokeWidth="8" 
                          fill="none"
                          strokeDasharray={`${2 * Math.PI * 56}`}
                          strokeDashoffset={`${2 * Math.PI * 56 * (1 - 0.75)}`}
                          className="transition-all duration-300"
                        />
                        <defs>
                          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#3b82f6" />
                            <stop offset="100%" stopColor="#6366f1" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-2xl font-bold text-gray-900">75%</span>
                      </div>
                    </div>
                    <p className="text-gray-600">Overall Goals Completion</p>
                    <p className="text-sm text-gray-500 mt-1">28 out of 37 goals achieved</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'resources' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Resources</h2>
                <button className="flex items-center space-x-2 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                  <Plus className="w-4 h-4" />
                  <span>Add Resource</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { title: "Career Development Guide", type: "PDF", size: "2.4 MB", downloads: 45 },
                  { title: "Technical Skills Assessment", type: "Excel", size: "1.2 MB", downloads: 32 },
                  { title: "Leadership Workshop Slides", type: "PowerPoint", size: "5.7 MB", downloads: 28 },
                  { title: "Goal Setting Template", type: "Word", size: "856 KB", downloads: 67 },
                  { title: "Communication Skills Video", type: "MP4", size: "124 MB", downloads: 19 },
                  { title: "Industry Trends Report", type: "PDF", size: "3.1 MB", downloads: 41 }
                ].map((resource, index) => (
                  <div key={index} className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 hover:shadow-lg transition-all duration-200">
                    <div className="flex items-start justify-between mb-3">
                      <div className="p-3 bg-blue-100 rounded-xl">
                        <BookOpen className="w-6 h-6 text-blue-600" />
                      </div>
                      <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        {resource.type}
                      </span>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{resource.title}</h3>
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <span>{resource.size}</span>
                      <span>{resource.downloads} downloads</span>
                    </div>
                    <div className="flex space-x-2">
                      <button className="flex-1 py-2 text-sm text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                        Share
                      </button>
                      <button className="flex-1 py-2 text-sm text-gray-600 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        Edit
                      </button>
                    </div>
                  </div>
                ))}
              </div>


              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Resource Categories</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { name: "Career Development", count: 12, color: "blue" },
                    { name: "Technical Skills", count: 8, color: "green" },
                    { name: "Leadership", count: 15, color: "purple" },
                    { name: "Communication", count: 6, color: "orange" }
                  ].map((category, index) => (
                    <div key={index} className="text-center p-4 bg-gray-50/50 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
                      <div className={`w-12 h-12 mx-auto mb-2 bg-${category.color}-100 rounded-full flex items-center justify-center`}>
                        <BookOpen className={`w-6 h-6 text-${category.color}-600`} />
                      </div>
                      <p className="font-medium text-gray-900">{category.name}</p>
                      <p className="text-sm text-gray-500">{category.count} resources</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>


      <div className="fixed bottom-6 right-6">
        <div className="relative group">
          <button className="w-14 h-14 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center">
            <Plus className="w-6 h-6" />
          </button>

          <div className="absolute bottom-16 right-0 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
            <div className="p-2">
              <button className="w-full flex items-center space-x-3 px-3 py-2 text-left text-gray-700 hover:bg-gray-50 rounded-lg">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">Schedule Session</span>
              </button>
              <button className="w-full flex items-center space-x-3 px-3 py-2 text-left text-gray-700 hover:bg-gray-50 rounded-lg">
                <MessageSquare className="w-4 h-4" />
                <span className="text-sm">Send Message</span>
              </button>
              <button className="w-full flex items-center space-x-3 px-3 py-2 text-left text-gray-700 hover:bg-gray-50 rounded-lg">
                <Target className="w-4 h-4" />
                <span className="text-sm">Set Goal</span>
              </button>
              <button className="w-full flex items-center space-x-3 px-3 py-2 text-left text-gray-700 hover:bg-gray-50 rounded-lg">
                <BookOpen className="w-4 h-4" />
                <span className="text-sm">Add Resource</span>
              </button>
            </div>
          </div>
        </div>
      </div>

   
      <div className="fixed top-20 right-6 bg-white border border-green-200 rounded-lg shadow-lg p-4 hidden">
        <div className="flex items-center space-x-3">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <div>
            <p className="font-medium text-gray-900">Success!</p>
            <p className="text-sm text-gray-600">Action completed successfully</p>
          </div>
        </div>
      </div>
    </div>
  );
}

