"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    Search,
    Filter,
    MoreVertical,
    Edit,
    Trash2,
    Eye,
    UserX,
    CheckCircle,
    X,
} from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:9999";

interface User {
    _id: string;
    firstName?: string;
    email?: string;
    role?: string;
    status?: string;
    joinDate?: string;
    lastActive?: string;
    sessions?: number;
    avatar?: string;
}


const UsersPage = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedFilter, setSelectedFilter] = useState("All");
    const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const usersPerPage = 10;

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setIsLoading(true);
                console.log("Fetching users from:", `${API_BASE_URL}/api/admin/getAllUsers`);
                const response = await axios.get(`${API_BASE_URL}/api/admin/getAllUsers`, {
                    params: { page: currentPage, limit: usersPerPage },
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                console.log("Users API Response:", response.data);
                if (!response.data.success || !Array.isArray(response.data.data)) {
                    throw new Error("Invalid API response: Expected an array of users");
                }
                setUsers(response.data.data);
                setTotalPages(Math.ceil(response.data.data.length / usersPerPage));
            } catch (error: any) {
                console.error("Error fetching users:", error);
                console.log("Request headers:", error.config?.headers);
                console.log("Response data:", error.response?.data);
                toast.error(
                    error.response?.status === 401
                        ? "Unauthorized. Please log in as an admin or check your credentials."
                        : error.response?.status === 403
                            ? "Forbidden. You do not have admin privileges."
                            : error.code === "ERR_NETWORK"
                                ? "Cannot connect to the backend server. Ensure the server is running on port 9999."
                                : error.response?.status === 404
                                    ? "Users endpoint not found. Please check the server configuration."
                                    : error.message || "Failed to fetch users. Please try again later.",
                    { position: "top-right", autoClose: 5000 }
                );
            } finally {
                setIsLoading(false);
            }
        };
        fetchUsers();
    }, [currentPage]);

    const handleActivateUsers = async () => {
        try {
            const responses = await Promise.all(
                selectedUsers.map((id) =>
                    axios.put(`${API_BASE_URL}/api/users/users/${id}/activate`, null, {
                        withCredentials: true,
                    })
                )
            );
            setUsers((prev) =>
                prev.map((user) =>
                    selectedUsers.includes(user._id)
                        ? responses.find((res) => res.data.data.id === user._id)?.data.data || user
                        : user
                )
            );
            setSelectedUsers([]);
            toast.success("Users activated successfully!", {
                position: "top-right",
                autoClose: 3000,
            });
        } catch (error: any) {
            console.error("Error activating users:", error);
            toast.error(
                error.response?.status === 401
                    ? "Unauthorized. Please log in as an admin."
                    : error.response?.status === 404
                        ? "User not found."
                        : "Failed to activate users. Please try again.",
                { position: "top-right", autoClose: 5000 }
            );
        }
    };

    const handleSuspendUsers = async () => {
        try {
            const responses = await Promise.all(
                selectedUsers.map((id) =>
                    axios.put(`${API_BASE_URL}/api/users/users/${id}/suspend`, null, {
                        withCredentials: true,
                    })
                )
            );
            setUsers((prev) =>
                prev.map((user) =>
                    selectedUsers.includes(user._id)
                        ? responses.find((res) => res.data.data.id === user._id)?.data.data || user
                        : user
                )
            );
            setSelectedUsers([]);
            toast.success("Users suspended successfully!", {
                position: "top-right",
                autoClose: 3000,
            });
        } catch (error: any) {
            console.error("Error suspending users:", error);
            toast.error(
                error.response?.status === 401
                    ? "Unauthorized. Please log in as an admin."
                    : error.response?.status === 404
                        ? "User not found."
                        : "Failed to suspend users. Please try again.",
                { position: "top-right", autoClose: 5000 }
            );
        }
    };

    const filters = ["All", "Student", "Mentor", "Admin", "Active", "Inactive", "Suspended"];

    const filteredUsers = users.filter((user) => {
        const name = user.firstName?.toLowerCase() || "";
        const email = user.email?.toLowerCase() || "";
        const matchesSearch =
            name.includes(searchTerm.toLowerCase()) ||
            email.includes(searchTerm.toLowerCase());
        const matchesFilter =
            selectedFilter === "All" ||
            user.role === selectedFilter ||
            user.status === selectedFilter;
        return matchesSearch && matchesFilter;
    });

    const handleUserSelect = (userId: string) => {
        setSelectedUsers((prev) =>
            prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]
        );
    };

    const getStatusColor = (status?: string) => {
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

    const getRoleColor = (role?: string) => {
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

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
            setSelectedUsers([]);
        }
    };

    return (
        <div className="min-h-screen bg-white flex">
            <div className="flex-1 p-8">
                <ToastContainer position="top-right" autoClose={5000} />
                {isLoading && (
                    <div className="text-center py-6 text-gray-500">Loading...</div>
                )}

                <div className="mb-8">
                    {/* Header with Search */}
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-3xl font-bold text-gray-900">Users Management</h2>
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

                    {/* Statistics Cards */}
                    <div className="grid grid-cols-4 gap-6 mb-6">
                        <div className="bg-[#B8E6F0] p-4 rounded-lg">
                            <div className="text-2xl font-bold text-gray-900">{users.length}</div>
                            <div className="text-gray-700 text-sm">Total Users</div>
                        </div>
                        <div className="bg-[#B8E6F0] p-4 rounded-lg">
                            <div className="text-2xl font-bold text-gray-900">
                                {users.filter((u) => u.status === "Active").length}
                            </div>
                            <div className="text-gray-700 text-sm">Active Users</div>
                        </div>
                        <div className="bg-[#B8E6F0] p-4 rounded-lg">
                            <div className="text-2xl font-bold text-gray-900">
                                {users.filter((u) => {
                                    if (!u.joinDate) return false;
                                    try {
                                        return new Date(u.joinDate).getMonth() === new Date().getMonth();
                                    } catch {
                                        return false;
                                    }
                                }).length}
                            </div>
                            <div className="text-gray-700 text-sm">New This Month</div>
                        </div>
                        <div className="bg-[#B8E6F0] p-4 rounded-lg">
                            <div className="text-2xl font-bold text-gray-900">
                                {users.filter((u) => u.status === "Suspended").length}
                            </div>
                            <div className="text-gray-700 text-sm">Suspended</div>
                        </div>
                    </div>

                    {/* Filter Buttons */}
                    <div className="flex items-center space-x-4 mb-6">
                        <Filter className="text-gray-500" size={20} />
                        <div className="flex space-x-2">
                            {filters.map((filter) => (
                                <button
                                    key={filter}
                                    onClick={() => setSelectedFilter(filter)}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${selectedFilter === filter
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
                                            onChange={(e) =>
                                                setSelectedUsers(
                                                    e.target.checked ? filteredUsers.map((u) => u._id) : []
                                                )
                                            }
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
                                    <tr key={user._id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <input
                                                type="checkbox"
                                                className="rounded border-gray-300"
                                                checked={selectedUsers.includes(user._id)}
                                                onChange={() => handleUserSelect(user._id)}
                                            />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="w-10 h-10 bg-[#1887A1] rounded-full flex items-center justify-center text-white font-medium">
                                                    {user.avatar || user.firstName?.charAt(0)?.toUpperCase() || "U"}
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {user.firstName || "Unknown"}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        {user.email || "No email"}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span
                                                className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleColor(user.role)}`}
                                            >
                                                {user.role || "N/A"}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span
                                                className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(user.status)}`}
                                            >
                                                {user.status || "N/A"}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {user.joinDate || "-"}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {user.lastActive || "-"}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {user.sessions ?? 0}
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
                                {filteredUsers.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan={8}
                                            className="text-center py-6 text-gray-500 text-sm"
                                        >
                                            No users found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>


                    <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                        <div className="flex-1 flex justify-between sm:hidden">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                            >
                                Previous
                            </button>
                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                            >
                                Next
                            </button>
                        </div>
                        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                            <div>
                                <p className="text-sm text-gray-700">
                                    Showing <span className="font-medium">{(currentPage - 1) * usersPerPage + 1}</span> to{" "}
                                    <span className="font-medium">
                                        {Math.min(currentPage * usersPerPage, users.length)}
                                    </span> of <span className="font-medium">{users.length}</span> results
                                </p>
                            </div>
                            <div>
                                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                                    <button
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        disabled={currentPage === 1}
                                        className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                                    >
                                        Previous
                                    </button>
                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                        <button
                                            key={page}
                                            onClick={() => handlePageChange(page)}
                                            className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${page === currentPage
                                                    ? "bg-[#1887A1] border-[#1887A1] text-white"
                                                    : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                                                }`}
                                        >
                                            {page}
                                        </button>
                                    ))}
                                    <button
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        disabled={currentPage === totalPages}
                                        className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                                    >
                                        Next
                                    </button>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>


                {selectedUsers.length > 0 && (
                    <div className="fixed bottom-6 right-6 bg-white rounded-lg shadow-lg border border-gray-200 p-4">
                        <div className="flex items-center space-x-4">
                            <span className="text-sm text-gray-600">
                                {selectedUsers.length} users selected
                            </span>
                            <div className="flex space-x-2">
                                <button
                                    onClick={handleActivateUsers}
                                    className="px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm flex items-center space-x-1"
                                >
                                    <CheckCircle size={16} />
                                    <span>Activate</span>
                                </button>
                                <button
                                    onClick={handleSuspendUsers}
                                    className="px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm flex items-center space-x-1"
                                >
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