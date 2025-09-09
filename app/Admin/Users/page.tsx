"use client";
import React, { useState } from "react";
import {
  Search,
  Users,
  UserCheck,
  MessageSquare,
  FileText,
  BookOpen,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  UserX,
  CheckCircle,
  X,
} from "lucide-react";

const UsersPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [selectedUsers, setSelectedUsers] = useState([]);

  const users = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.johnson@email.com",
      role: "Student",
      status: "Active",
      joinDate: "2024-01-15",
      lastActive: "2 mins ago",
      sessions: 12,
      avatar: "SJ",
    },
    {
      id: 2,
      name: "Michael Chen",
      email: "michael.chen@email.com",
      role: "Mentor",
      status: "Active",
      joinDate: "2024-02-20",
      lastActive: "15 mins ago",
      sessions: 45,
      avatar: "MC",
    },
    {
      id: 3,
      name: "Emma Wilson",
      email: "emma.wilson@email.com",
      role: "Student",
      status: "Inactive",
      joinDate: "2024-01-08",
      lastActive: "2 days ago",
      sessions: 8,
      avatar: "EW",
    },
    {
      id: 4,
      name: "Dr. Robert Smith",
      email: "robert.smith@email.com",
      role: "Mentor",
      status: "Active",
      joinDate: "2023-12-10",
      lastActive: "1 hour ago",
      sessions: 78,
      avatar: "RS",
    },
    {
      id: 5,
      name: "Alex Thompson",
      email: "alex.thompson@email.com",
      role: "Student",
      status: "Suspended",
      joinDate: "2024-03-01",
      lastActive: "1 week ago",
      sessions: 3,
      avatar: "AT",
    },

    {
      id: 7,
      name: "John Martinez",
      email: "john.martinez@email.com",
      role: "Student",
      status: "Active",
      joinDate: "2024-02-28",
      lastActive: "5 mins ago",
      sessions: 23,
      avatar: "JM",
    },
    {
      id: 8,
      name: "Dr. Amanda Lee",
      email: "amanda.lee@email.com",
      role: "Mentor",
      status: "Active",
      joinDate: "2024-01-05",
      lastActive: "20 mins ago",
      sessions: 67,
      avatar: "AL",
    },
  ];

  const filters = [
    "All",
    "Student",
    "Mentor",
    "Active",
    "Inactive",
    "Suspended",
  ];

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      selectedFilter === "All" ||
      user.role === selectedFilter ||
      user.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const handleUserSelect = (userId: number) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Inactive":
        return "bg-gray-100 text-gray-800";
      case "Suspended":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case "Student":
        return "bg-blue-100 text-blue-800";
      case "Mentor":
        return "bg-purple-100 text-purple-800";
      case "Admin":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-white flex">
      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-gray-900">
              Users Management
            </h2>
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search users by name or email"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-80 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1887A1]"
              />
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-4 gap-6 mb-6">
            <div className="bg-[#B8E6F0] p-4 rounded-lg">
              <div className="text-2xl font-bold text-gray-900">2,847</div>
              <div className="text-gray-700 text-sm">Total Users</div>
            </div>
            <div className="bg-[#B8E6F0] p-4 rounded-lg">
              <div className="text-2xl font-bold text-gray-900">2,456</div>
              <div className="text-gray-700 text-sm">Active Users</div>
            </div>
            <div className="bg-[#B8E6F0] p-4 rounded-lg">
              <div className="text-2xl font-bold text-gray-900">287</div>
              <div className="text-gray-700 text-sm">New This Month</div>
            </div>
            <div className="bg-[#B8E6F0] p-4 rounded-lg">
              <div className="text-2xl font-bold text-gray-900">12</div>
              <div className="text-gray-700 text-sm">Suspended</div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex items-center space-x-4 mb-6">
            <Filter className="text-gray-500" size={20} />
            <div className="flex space-x-2">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setSelectedFilter(filter)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedFilter === filter
                      ? "bg-[#1887A1] text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedUsers(filteredUsers.map((u) => u.id));
                        } else {
                          setSelectedUsers([]);
                        }
                      }}
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Join Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Active
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sessions
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300"
                        checked={selectedUsers.includes(user.id)}
                        onChange={() => handleUserSelect(user.id)}
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-[#1887A1] rounded-full flex items-center justify-center text-white font-medium">
                          {user.avatar}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {user.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleColor(
                          user.role
                        )}`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                          user.status
                        )}`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {user.joinDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.lastActive}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {user.sessions}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          className="text-[#1887A1] hover:text-[#0D4C5B]"
                          title="View"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          className="text-gray-600 hover:text-gray-900"
                          title="Edit"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          className="text-red-600 hover:text-red-900"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                        <button className="text-gray-400 hover:text-gray-600">
                          <MoreVertical size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="flex-1 flex justify-between sm:hidden">
              <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                Previous
              </button>
              <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">1</span> to{" "}
                  <span className="font-medium">8</span> of{" "}
                  <span className="font-medium">{filteredUsers.length}</span>{" "}
                  results
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                  <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    Previous
                  </button>
                  <button className="bg-[#1887A1] border-[#1887A1] text-white relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                    1
                  </button>
                  <button className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                    2
                  </button>
                  <button className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                    3
                  </button>
                  <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    Next
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedUsers.length > 0 && (
          <div className="fixed bottom-6 right-6 bg-white rounded-lg shadow-lg border border-gray-200 p-4">
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                {selectedUsers.length} users selected
              </span>
              <div className="flex space-x-2">
                <button className="px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm flex items-center space-x-1">
                  <CheckCircle size={16} />
                  <span>Activate</span>
                </button>
                <button className="px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm flex items-center space-x-1">
                  <UserX size={16} />
                  <span>Suspend</span>
                </button>
                <button
                  onClick={() => setSelectedUsers([])}
                  className="px-3 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 text-sm"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersPage;
