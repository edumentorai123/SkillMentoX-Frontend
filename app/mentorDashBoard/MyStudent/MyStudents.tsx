"use client";
import React, { useState, useMemo } from 'react';
import { Search, Filter, Mail, User, Calendar, Eye, Home, Users, BookOpen, Settings, LogOut } from 'lucide-react';
import Sidebar from '../Sidebar';

const StudentsPage = () => {
  // Sample student data
  const [students] = useState([
    {
      id: 1,
      name: 'Alex Johnson',
      email: 'alex.johnson@email.com',
      course: 'Full Stack Development',
      status: 'Active',
      joinedDate: '2024-01-15',
      avatar: 'AJ'
    },
    {
      id: 2,
      name: 'Sarah Chen',
      email: 'sarah.chen@email.com',
      course: 'Data Science Bootcamp',
      status: 'Active',
      joinedDate: '2024-02-20',
      avatar: 'SC'
    },
    {
      id: 3,
      name: 'Michael Rodriguez',
      email: 'michael.r@email.com',
      course: 'UI/UX Design',
      status: 'Inactive',
      joinedDate: '2023-11-10',
      avatar: 'MR'
    },
    {
      id: 4,
      name: 'Emily Davis',
      email: 'emily.davis@email.com',
      course: 'Machine Learning',
      status: 'Completed',
      joinedDate: '2023-09-05',
      avatar: 'ED'
    },
    {
      id: 5,
      name: 'David Kim',
      email: 'david.kim@email.com',
      course: 'Mobile Development',
      status: 'Active',
      joinedDate: '2024-03-01',
      avatar: 'DK'
    },
    {
      id: 6,
      name: 'Lisa Thompson',
      email: 'lisa.t@email.com',
      course: 'Cybersecurity Fundamentals',
      status: 'Active',
      joinedDate: '2024-01-28',
      avatar: 'LT'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Filter and search logic
  const filteredStudents = useMemo(() => {
    return students.filter(student => {
      const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           student.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'All' || student.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [students, searchTerm, statusFilter]);

  // Status badge styling
  const getStatusBadge = (status) => {
    const baseClasses = 'px-3 py-1 rounded-full text-sm font-medium';
    switch (status) {
      case 'Active':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'Inactive':
        return `${baseClasses} bg-gray-100 text-gray-800`;
      case 'Completed':
        return `${baseClasses} bg-blue-100 text-blue-800`;
      default:
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
    }
  };

  // Format date
  const formatDate = (dateString:string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Navigation items
  const navItems = [
    { icon: Home, label: 'Dashboard', href: '#' },
    { icon: Users, label: 'Students', href: '#', active: true },
    { icon: BookOpen, label: 'Courses', href: '#' },
    { icon: Settings, label: 'Settings', href: '#' },
    { icon: LogOut, label: 'Logout', href: '#' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex">
     
<Sidebar/>
      {/* Main Content */}
      <div className="flex-1">
        {/* Mobile Sidebar Toggle */}
        <div className="md:hidden p-4 bg-white shadow-sm border-b">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-lg bg-teal-600 text-white"
          >
            <Users className="w-5 h-5" />
          </button>
        </div>

        {/* Header Section */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">My Students</h1>
              <p className="text-gray-600">Manage and track your students in one place</p>
            </div>
            
            {/* Search and Filter Controls */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search students by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                />
              </div>
              
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white min-w-[140px]"
                >
                  <option value="All">All Status</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Student Cards Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStudents.map((student) => (
              <div
                key={student.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-lg hover:scale-[1.02] transition-all duration-200 cursor-pointer"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-teal-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                      {student.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 truncate">{student.name}</h3>
                      <p className="text-sm text-gray-500 truncate">{student.email}</p>
                    </div>
                  </div>
                  <span className={getStatusBadge(student.status)}>
                    {student.status}
                  </span>
                </div>
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-1">Enrolled Course</p>
                  <p className="text-gray-900">{student.course}</p>
                </div>
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>Joined {formatDate(student.joinedDate)}</span>
                </div>
                <div className="flex space-x-3 pt-4 border-t border-gray-100">
                  <button className="flex items-center justify-center space-x-2 flex-1 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm font-medium">
                    <Eye className="w-4 h-4" />
                    <span>View Profile</span>
                  </button>
                  <button className="flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                    <Mail className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          {filteredStudents.length === 0 && (
            <div className="text-center py-12">
              <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No students found</h3>
              <p className="text-gray-500">
                {searchTerm || statusFilter !== 'All' 
                  ? 'Try adjusting your search or filter criteria'
                  : 'No students have been added yet'
                }
              </p>
            </div>
          )}
          {filteredStudents.length > 0 && (
            <div className="mt-8 text-center text-sm text-gray-500">
              Showing {filteredStudents.length} of {students.length} students
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentsPage;
