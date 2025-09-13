// "use client";

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Users, Mail, Calendar, MoreVertical, Search, ChevronDown } from "lucide-react";
// import { useRouter } from "next/navigation";

// interface MentorRequest {
//   _id: string;
//   mentorId: {
//     _id: string;
//     fullName: string;
//     currentRole: string;
//     email: string;
//   };
//   status: string;
//   createdAt: string;
// }

// const RequestsPage = () => {
//   const [requests, setRequests] = useState<MentorRequest[]>([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const router = useRouter();

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (!token) return;

//     const fetchRequests = async () => {
//       try {
//         const { data } = await axios.get(
//           "http://localhost:9999/api/admin/mentor-requests",
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );
//         setRequests(data.data);
//       } catch (error: any) {
//         console.error("Error fetching requests:", error);
//       }
//     };

//     fetchRequests();
//   }, []);

//   // 🔹 update status API call
//   const handleStatusChange = async (id: string, newStatus: string) => {
//     try {
//       const endpoint =
//         newStatus === "approved" ? "approve-request" : "reject-request";

//       const token = localStorage.getItem("token");
//       if (!token) return;

//       await axios.put(
//         `http://localhost:9999/api/admin/${endpoint}/${id}`,
//         {},
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       setRequests((prev) =>
//         newStatus === "rejected"
//           ? prev.filter((req) => req._id !== id)
//           : prev.map((req) =>
//               req._id === id ? { ...req, status: newStatus } : req
//             )
//       );
//     } catch (error) {
//       console.error("Error updating request status:", error);
//     }
//   };

//   // 🔹 dropdown inside each card
//   const StatusDropdown = ({ request }: { request: MentorRequest }) => {
//     const [isOpen, setIsOpen] = useState(false);
//     const [currentStatus, setCurrentStatus] = useState(request.status);

//     const statusOptions = ["pending", "approved", "rejected"];

//     const getStatusColor = (status: string) => {
//       switch (status) {
//         case "approved":
//           return "bg-green-50 text-green-700 border-green-200";
//         case "rejected":
//           return "bg-red-50 text-red-700 border-red-200";
//         case "pending":
//           return "bg-yellow-50 text-yellow-700 border-yellow-200";
//         default:
//           return "bg-gray-50 text-gray-700 border-gray-200";
//       }
//     };

//     const handleSelect = async (status: string) => {
//       setCurrentStatus(status);
//       setIsOpen(false);
//       await handleStatusChange(request._id, status);
//     };

//     return (
//       <div className="relative">
//         <button
//           onClick={(e) => {
//             e.stopPropagation();
//             setIsOpen(!isOpen);
//           }}
//           className={`flex items-center justify-between px-3 py-2 rounded-lg border text-sm font-medium min-w-[120px] transition-all duration-200 hover:shadow-md ${getStatusColor(
//             currentStatus
//           )}`}
//         >
//           <span className="capitalize">{currentStatus}</span>
//           <ChevronDown size={16} className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
//         </button>

//         {isOpen && (
//           <>
//             <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
//             <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20 min-w-[120px]">
//               {statusOptions.map((status) => (
//                 <button
//                   key={status}
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     handleSelect(status);
//                   }}
//                   className={`w-full text-left px-3 py-2 text-sm hover:bg-[#4F46E5] hover:bg-opacity-10 transition-colors duration-200 first:rounded-t-lg last:rounded-b-lg ${
//                     status === currentStatus
//                       ? "bg-[#4F46E5] text-white hover:bg-[#4338CA]"
//                       : "text-gray-700"
//                   }`}
//                 >
//                   {status.charAt(0).toUpperCase() + status.slice(1)}
//                 </button>
//               ))}
//             </div>
//           </>
//         )}
//       </div>
//     );
//   };

//   // 🔹 filter requests
//   const filteredRequests = requests.filter((request) =>
//     request.mentorId.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     request.mentorId.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     request.mentorId.currentRole.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="min-h-screen bg-white">
//       <div className="max-w-none mx-auto p-6">
        
//         {/* 🔹 Header */}
//         <div className="bg-[#4F46E5] rounded-2xl p-8 mb-6 text-white shadow-sm">
//           <div className="flex items-center space-x-4">
//             <div>
//               <h1 className="text-3xl font-bold">Mentor Requests</h1>
//               <p className="text-white text-opacity-90 mt-1">
//                 Total Requests: {requests.length}
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* 🔹 Search Bar */}
//         <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-6">
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//             <input
//               type="text"
//               placeholder="Search by name, email, or role..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent"
//             />
//           </div>
//         </div>

//         {/* 🔹 Request Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filteredRequests.map((request) => (
//             <div
//               key={request._id}
//               onClick={() => router.push(`/Admin/Request/${request.mentorId._id}`)}
//               className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-lg hover:border-[#4F46E5] hover:border-opacity-30 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group"
//             >
//               <div className="flex items-start justify-between mb-4">
//                 <div className="flex items-center space-x-3">
//                   <div className="w-12 h-12 bg-[#4F46E5] rounded-full flex items-center justify-center text-white font-bold text-lg">
//                     {request.mentorId.fullName.charAt(0).toUpperCase()}
//                   </div>
//                   <div>
//                     <h3 className="font-semibold text-gray-900 text-lg group-hover:text-[#4F46E5] transition-colors">
//                       {request.mentorId.fullName}
//                     </h3>
//                     <p className="text-gray-600 text-sm">{request.mentorId.currentRole}</p>
//                   </div>
//                 </div>

//                 <button
//                   onClick={(e) => e.stopPropagation()}
//                   className="text-gray-400 hover:text-[#4F46E5] transition-colors p-1 rounded-full hover:bg-gray-50"
//                 >
//                   <MoreVertical size={20} />
//                 </button>
//               </div>

//               <div className="space-y-3 mb-6">
//                 <div className="flex items-center space-x-2 text-gray-600">
//                   <Mail size={16} className="text-[#4F46E5]" />
//                   <span className="text-sm">{request.mentorId.email}</span>
//                 </div>

//                 <div className="flex items-center space-x-2 text-gray-600">
//                   <Calendar size={16} className="text-[#4F46E5]" />
//                   <span className="text-sm">
//                     Applied on {new Date(request.createdAt).toLocaleDateString()}
//                   </span>
//                 </div>
//               </div>

//               <div className="flex items-center justify-between">
//                 <span className="text-sm font-medium text-gray-700">Status:</span>
//                 <StatusDropdown request={request} />
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* 🔹 Empty State */}
//         {filteredRequests.length === 0 && (
//           <div className="text-center py-16">
//             <div className="w-24 h-24 bg-[#4F46E5] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
//               <Users size={32} className="text-[#4F46E5]" />
//             </div>
//             <h3 className="text-xl font-semibold text-[#4F46E5] mb-2">
//               No requests found
//             </h3>
//             <p className="text-gray-600">
//               No mentor requests available at the moment.
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default RequestsPage;
"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Users,
  Mail,
  Calendar,
  MoreVertical,
  Search,
  ChevronDown,
} from "lucide-react";
import { useRouter } from "next/navigation";

interface MentorRequest {
  _id: string;
  mentorId: {
    _id: string;
    fullName: string;
    currentRole: string;
    email: string;
  };
  status: string;
  createdAt: string;
}

const RequestsPage = () => {
  const [requests, setRequests] = useState<MentorRequest[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const router = useRouter();

  const fetchRequests = async (page = 1) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const { data } = await axios.get(
        `http://localhost:9999/api/admin/mentor-requests?page=${page}&limit=10`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setRequests(data.data);
      setTotalPages(data.pagination.totalPages);
    } catch (error: any) {
      console.error("Error fetching requests:", error);
    }
  };

  useEffect(() => {
    fetchRequests(currentPage);
  }, [currentPage]);

  // 🔹 update status API call
  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const endpoint =
        newStatus === "approved" ? "approve-request" : "reject-request";

      const token = localStorage.getItem("token");
      if (!token) return;

      await axios.put(
        `http://localhost:9999/api/admin/${endpoint}/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setRequests((prev) =>
        newStatus === "rejected"
          ? prev.filter((req) => req._id !== id)
          : prev.map((req) =>
              req._id === id ? { ...req, status: newStatus } : req
            )
      );
    } catch (error) {
      console.error("Error updating request status:", error);
    }
  };

  // 🔹 dropdown inside each card
  const StatusDropdown = ({ request }: { request: MentorRequest }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentStatus, setCurrentStatus] = useState(request.status);

    const statusOptions = ["pending", "approved", "rejected"];

    const getStatusColor = (status: string) => {
      switch (status) {
        case "approved":
          return "bg-green-50 text-green-700 border-green-200";
        case "rejected":
          return "bg-red-50 text-red-700 border-red-200";
        case "pending":
          return "bg-yellow-50 text-yellow-700 border-yellow-200";
        default:
          return "bg-gray-50 text-gray-700 border-gray-200";
      }
    };

    const handleSelect = async (status: string) => {
      setCurrentStatus(status);
      setIsOpen(false);
      await handleStatusChange(request._id, status);
    };

    return (
      <div className="relative">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(!isOpen);
          }}
          className={`flex items-center justify-between px-3 py-2 rounded-lg border text-sm font-medium min-w-[120px] transition-all duration-200 hover:shadow-md ${getStatusColor(
            currentStatus
          )}`}
        >
          <span className="capitalize">{currentStatus}</span>
          <ChevronDown
            size={16}
            className={`transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setIsOpen(false)}
            />
            <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20 min-w-[120px]">
              {statusOptions.map((status) => (
                <button
                  key={status}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelect(status);
                  }}
                  className={`w-full text-left px-3 py-2 text-sm hover:bg-[#4F46E5] hover:bg-opacity-10 transition-colors duration-200 first:rounded-t-lg last:rounded-b-lg ${
                    status === currentStatus
                      ? "bg-[#4F46E5] text-white hover:bg-[#4338CA]"
                      : "text-gray-700"
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    );
  };

  // 🔹 filter requests
  const filteredRequests = requests.filter(
    (request) =>
      request.mentorId.fullName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      request.mentorId.email
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      request.mentorId.currentRole
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-none mx-auto p-6">
        {/* 🔹 Header */}
        <div className="bg-[#4F46E5] rounded-2xl p-8 mb-6 text-white shadow-sm">
          <div className="flex items-center space-x-4">
            <div>
              <h1 className="text-3xl font-bold">Mentor Requests</h1>
              <p className="text-white text-opacity-90 mt-1">
                Total Requests: {filteredRequests.length}
              </p>
            </div>
          </div>
        </div>

        {/* 🔹 Search Bar */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by name, email, or role..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent"
            />
          </div>
        </div>

        {/* 🔹 Request Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRequests.map((request) => (
            <div
              key={request._id}
              onClick={() =>
                router.push(`/Admin/Request/${request.mentorId._id}`)
              }
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-lg hover:border-[#4F46E5] hover:border-opacity-30 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-[#4F46E5] rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {request.mentorId.fullName.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg group-hover:text-[#4F46E5] transition-colors">
                      {request.mentorId.fullName}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {request.mentorId.currentRole}
                    </p>
                  </div>
                </div>

                <button
                  onClick={(e) => e.stopPropagation()}
                  className="text-gray-400 hover:text-[#4F46E5] transition-colors p-1 rounded-full hover:bg-gray-50"
                >
                  <MoreVertical size={20} />
                </button>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-2 text-gray-600">
                  <Mail size={16} className="text-[#4F46E5]" />
                  <span className="text-sm">{request.mentorId.email}</span>
                </div>

                <div className="flex items-center space-x-2 text-gray-600">
                  <Calendar size={16} className="text-[#4F46E5]" />
                  <span className="text-sm">
                    Applied on{" "}
                    {new Date(request.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">
                  Status:
                </span>
                <StatusDropdown request={request} />
              </div>
            </div>
          ))}
        </div>

        {/* 🔹 Empty State */}
        {filteredRequests.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-[#4F46E5] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users size={32} className="text-[#4F46E5]" />
            </div>
            <h3 className="text-xl font-semibold text-[#4F46E5] mb-2">
              No requests found
            </h3>
            <p className="text-gray-600">
              No mentor requests available at the moment.
            </p>
          </div>
        )}

        {/* 🔹 Pagination */}
        <div className="flex justify-center items-center space-x-4 mt-8">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg disabled:opacity-50 hover:bg-gray-200 transition"
          >
            Previous
          </button>

          <span className="text-gray-600">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg disabled:opacity-50 hover:bg-gray-200 transition"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default RequestsPage;
