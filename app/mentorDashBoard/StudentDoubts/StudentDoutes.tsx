"use client";
import React, { useState, useMemo } from 'react';
import { Search, Filter, Plus, MessageCircle, Check, Clock, AlertCircle, User, Calendar, Tag, Menu } from 'lucide-react';
import Sidebar from '../Sidebar';

const StudentDoubtsManager = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [selectedDoubt, setSelectedDoubt] = useState(null);
  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [doubts, setDoubts] = useState([]);


  const filteredDoubts = useMemo(() => {
    return doubts.filter(doubt => {
      const matchesSearch = 
        doubt.questionTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doubt.studentName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doubt.subject?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterStatus === 'All' || doubt.status === filterStatus;
      return matchesSearch && matchesFilter;
    });
  }, [doubts, searchTerm, filterStatus]);

  // Status badge component
  const StatusBadge = ({ status }) => {
    const statusConfig = {
      'Pending': { color: 'bg-red-100 text-red-800', icon: AlertCircle },
      'In Progress': { color: 'bg-yellow-100 text-yellow-800', icon: Clock },
      'Resolved': { color: 'bg-green-100 text-green-800', icon: Check }
    };
    
    const config = statusConfig[status] || statusConfig['Pending'];
    const Icon = config.icon;
    
    return (
      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        <Icon className="w-3 h-3 mr-1" />
        {status}
      </span>
    );
  };


  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    };
    return date.toLocaleString('en-US', options).replace(',', '');
  };


  const handleReply = (doubtId) => {
    setSelectedDoubt(doubts.find(d => d.id === doubtId));
    setIsReplyModalOpen(true);
  };


  const handleMarkResolved = (doubtId) => {
    setDoubts(prev => prev.map(doubt => 
      doubt.id === doubtId ? { ...doubt, status: 'Resolved' } : doubt
    ));
  };

 
  const handleSubmitReply = () => {
    if (replyText.trim()) {
      setDoubts(prev => prev.map(doubt => 
        doubt.id === selectedDoubt.id 
          ? { 
              ...doubt, 
              status: doubt.status === 'Pending' ? 'In Progress' : doubt.status,
              replies: [...(doubt.replies || []), {
                mentor: "Current Mentor",
                text: replyText,
                time: new Date().toISOString()
              }]
            }
          : doubt
      ));
      setReplyText('');
      setIsReplyModalOpen(false);
    }
  };


  const stats = useMemo(() => {
    const studentCounts = doubts.reduce((acc, doubt) => {
      acc[doubt.studentName] = (acc[doubt.studentName] || 0) + 1;
      return acc;
    }, {});
    
    const topStudents = Object.entries(studentCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5);
    
    const subjectCounts = doubts.reduce((acc, doubt) => {
      acc[doubt.subject] = (acc[doubt.subject] || 0) + 1;
      return acc;
    }, {});

    return { topStudents, subjectCounts };
  }, [doubts]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white shadow-lg z-10 transform transition-transform duration-300 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <Sidebar />
      </div>

      {/* Mobile Menu Button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-20 p-2 bg-blue-600 text-white rounded-md"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Main Content */}
      <div className="flex-1 pl-0 lg:pl-64 h-full overflow-auto">
        <div className="max-w-7xl mx-auto px-4 py-4 h-full flex flex-col">
          {/* Header Section */}
          <div className="mb-4 flex-shrink-0">
            <h1 className="text-2xl font-bold text-gray-900">Student Doubts</h1>
            <p className="text-gray-600 text-sm mt-1">Manage and resolve students' questions efficiently</p>
          </div>

          {/* Filters and New Doubt Button */}
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-between mb-4 flex-shrink-0">
            <div className="flex flex-1 gap-3 w-full sm:w-auto">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search doubts..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="relative">
                <select 
                  className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="All">All Status</option>
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                </select>
                <Filter className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
              </div>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 text-sm">
              <Plus className="w-4 h-4" />
              New Doubt
            </button>
          </div>

          {/* Main Content and Right Sidebar */}
          <div className="flex flex-1 overflow-hidden">
            {/* Doubts List */}
            <div className="flex-1 overflow-y-auto pr-4">
              <div className="grid gap-3">
                {filteredDoubts.length === 0 ? (
                  <div className="text-center py-12">
                    <MessageCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No doubts found</h3>
                    <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
                  </div>
                ) : (
                  filteredDoubts.map((doubt) => (
                    <div key={doubt.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0">
                          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium text-sm">
                            {doubt.avatar}
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="text-base font-semibold text-gray-900 mb-1">{doubt.questionTitle}</h3>
                              <div className="flex items-center gap-2 text-xs text-gray-600">
                                <span className="flex items-center gap-1">
                                  <User className="w-3 h-3" />
                                  {doubt.studentName}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Calendar className="w-3 h-3" />
                                  {formatDate(doubt.datePosted)}
                                </span>
                              </div>
                            </div>
                            <StatusBadge status={doubt.status} />
                          </div>
                          <div className="flex items-center gap-2 mb-3">
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                              <Tag className="w-3 h-3 mr-1" />
                              {doubt.subject}
                            </span>
                          </div>
                          <p className="text-gray-700 text-sm mb-3 line-clamp-2">{doubt.fullQuestion}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <button
                                onClick={() => handleReply(doubt.id)}
                                className="flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium text-sm"
                              >
                                <MessageCircle className="w-4 h-4" />
                                Reply ({(doubt.replies || []).length})
                              </button>
                            </div>
                            {doubt.status !== 'Resolved' && (
                              <button
                                onClick={() => handleMarkResolved(doubt.id)}
                                className="flex items-center gap-1 text-green-600 hover:text-green-800 font-medium text-sm"
                              >
                                <Check className="w-4 h-4" />
                                Mark as Resolved
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="w-64 space-y-4 flex-shrink-0">
              {/* Top Students */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <h3 className="text-base font-semibold text-gray-900 mb-3">Top Students</h3>
                <div className="space-y-2">
                  {stats.topStudents.length === 0 ? (
                    <p className="text-xs text-gray-600">No student data available</p>
                  ) : (
                    stats.topStudents.map(([name, count], index) => (
                      <div key={name} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 text-xs font-medium">
                            {name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <span className="text-xs font-medium text-gray-900">{name}</span>
                        </div>
                        <span className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
                          {count} doubts
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Quick Filters by Subject */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <h3 className="text-base font-semibold text-gray-900 mb-3">Quick Filters</h3>
                <div className="space-y-2">
                  <button 
                    onClick={() => setFilterStatus('All')}
                    className={`w-full text-left px-2 py-1 rounded-lg transition-colors text-xs ${
                      filterStatus === 'All' ? 'bg-blue-100 text-blue-800' : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    All Subjects ({doubts.length})
                  </button>
                  {Object.entries(stats.subjectCounts).map(([subject, count]) => (
                    <button
                      key={subject}
                      onClick={() => {
                        setSearchTerm('');
                        setFilterStatus('All');
                        setSearchTerm(subject);
                      }}
                      className="w-full text-left px-2 py-1 rounded-lg hover:bg-gray-100 text-gray-700 transition-colors text-xs"
                    >
                      {subject} ({count})
                    </button>
                  ))}
                </div>
              </div>

              {/* Stats Summary */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <h3 className="text-base font-semibold text-gray-900 mb-3">Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-600">Total Doubts</span>
                    <span className="font-medium">{doubts.length}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-600">Pending</span>
                    <span className="font-medium text-red-600">
                      {doubts.filter(d => d.status === 'Pending').length}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-600">In Progress</span>
                    <span className="font-medium text-yellow-600">
                      {doubts.filter(d => d.status === 'In Progress').length}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-600">Resolved</span>
                    <span className="font-medium text-green-600">
                      {doubts.filter(d => d.status === 'Resolved').length}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Reply Modal */}
          {isReplyModalOpen && selectedDoubt && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-4 max-h-[80vh] overflow-y-auto">
                <div className="p-4">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900">Reply to Doubt</h2>
                      <p className="text-gray-600 text-sm">{selectedDoubt.studentName}</p>
                    </div>
                    <button 
                      onClick={() => setIsReplyModalOpen(false)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <div className="mb-4">
                    <h3 className="font-medium text-gray-900 text-sm mb-2">{selectedDoubt.questionTitle}</h3>
                    <p className="text-gray-700 bg-gray-50 p-3 rounded-lg text-sm">{selectedDoubt.fullQuestion}</p>
                  </div>
                  {(selectedDoubt.replies || []).length > 0 && (
                    <div className="mb-4">
                      <h4 className="font-medium text-gray-900 text-sm mb-2">Previous Replies</h4>
                      <div className="space-y-2">
                        {selectedDoubt.replies.map((reply, index) => (
                          <div key={index} className="bg-blue-50 p-3 rounded-lg">
                            <div className="flex justify-between items-start mb-1">
                              <span className="font-medium text-blue-900 text-sm">{reply.mentor}</span>
                              <span className="text-xs text-gray-500">{formatDate(reply.time)}</span>
                            </div>
                            <p className="text-gray-700 text-sm">{reply.text}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Your Reply</label>
                    <textarea
                      rows={4}
                      className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      placeholder="Type your reply here..."
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setIsReplyModalOpen(false)}
                      className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSubmitReply}
                      disabled={!replyText.trim()}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed text-sm"
                    >
                      Send Reply
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentDoubtsManager;