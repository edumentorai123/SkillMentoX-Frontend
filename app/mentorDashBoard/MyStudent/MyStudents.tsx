"use client";
import React, { useState, } from 'react';
import { Search, Filter, Home, Users, BookOpen, Settings, LogOut } from 'lucide-react';
import Sidebar from '../Sidebar';

const StudentsPage = () => {
 


  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); 


  


  const getStatusBadge = (status: string) => {
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


  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };


  const navItems = [
    { icon: Home, label: 'Dashboard', href: '#' },
    { icon: Users, label: 'Students', href: '#', active: true },
    { icon: BookOpen, label: 'Courses', href: '#' },
    { icon: Settings, label: 'Settings', href: '#' },
    { icon: LogOut, label: 'Logout', href: '#' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Pass required props to Sidebar */}
      <Sidebar
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />
      {/* Main Content */}
      <div className="flex-1">
        {/* Mobile Sidebar Toggle */}
        <div className="md:hidden p-4 bg-white shadow-sm border-b">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} // Updated to use setMobileMenuOpen
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

     
      </div>
    </div>
  );
};

export default StudentsPage;
