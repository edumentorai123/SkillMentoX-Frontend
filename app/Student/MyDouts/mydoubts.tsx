// "use client";
// import { useState, useEffect } from "react";
// import axiosClient from "../../lib/axiosClient";

// function getStatusColor(status: string) {
//   switch (status) {
//     case "Answered":
//       return "text-green-600 bg-green-100";
//     case "Pending":
//       return "text-orange-600 bg-orange-100";
//     default:
//       return "text-gray-600 bg-gray-100";
//   }
// }

// function getTagColor(tag: string) {
//   switch (tag) {
//     case "JavaScript":
//       return "bg-yellow-100 text-yellow-800";
//     case "Python":
//       return "bg-blue-100 text-blue-800";
//     case "Java":
//       return "bg-red-100 text-red-800";
//     case "Node.js":
//       return "bg-green-100 text-green-800";
//     case "React":
//       return "bg-cyan-100 text-cyan-800";
//     case "TypeScript":
//       return "bg-purple-100 text-purple-800";
//     case "MongoDB":
//       return "bg-emerald-100 text-emerald-800";
//     case "Express":
//       return "bg-gray-100 text-gray-800";
//     default:
//       return "bg-gray-100 text-gray-800";
//   }
// }

// interface Doubt {
//   id: string;
//   _id: string;
//   question: string;
//   tag: string;
//   status: string;
//   createdAt: string;
//   updatedAt: string;
// }

// interface ApiDoubt {
//   _id: string;
//   question: string;
//   tag: string;
//   status: string;
//   createdAt: string;
//   updatedAt: string;
// }

// export default function MyDoubts() {
//   const [activeFilter, setActiveFilter] = useState("All");
//   const [doubts, setDoubts] = useState<Doubt[]>([]);
//   const [uniqueTags, setUniqueTags] = useState<string[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [newQuestion, setNewQuestion] = useState("");
//   const [newTag, setNewTag] = useState("");
//   const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

//   useEffect(() => {
//   const fetchStacks = async () => {
//     try {
//       const res = await axiosClient.get("/api/students/mystacks");
//       const stacks = Array.isArray(res.data?.data) ? res.data.data : [];
//       setUniqueTags(stacks);
//       if (stacks.length > 0) setNewTag(stacks[0]);
//     } catch (err) {
//       console.error("Error fetching stacks:", err);
//       setUniqueTags([]);
//     }
//   };

//   fetchStacks();
// }, []);

//   const handleSubmit = async () => {
//     if (!newQuestion || !newTag) {
//       alert("Please fill in all fields");
//       return;
//     }

//     try {
//       const res = await axiosClient.post("/api/doubts", { question: newQuestion, tag: newTag });
//       const newDoubt = { ...res.data.data, id: res.data.data._id };
//       setDoubts([newDoubt, ...doubts]);
//       if (!uniqueTags.includes(newTag)) {
//         setUniqueTags([...uniqueTags, newTag]);
//       }
//       setNewQuestion("");
//       setNewTag(uniqueTags[0] || "");
//       setIsModalOpen(false);
//     } catch (err) {
//       console.error("Error creating doubt:", err);
//       alert("Failed to create doubt");
//     }
//   };

//   const handleDelete = async (id: string) => {
//     try {
//       await axiosClient.delete(`/api/doubts/${id}`);
//       setDoubts(doubts.filter((doubt) => doubt.id !== id));
//       setDeleteConfirm(null);
//     } catch (err) {
//       console.error("Error deleting doubt:", err);
//       alert("Failed to delete doubt");
//     }
//   };

//   const filters = ["All", "Answered", "Pending", ...uniqueTags];

//   const filteredDoubts = doubts.filter((doubt) => {
//     if (activeFilter === "All") return true;
//     if (activeFilter === "Answered" || activeFilter === "Pending") {
//       return doubt.status === activeFilter;
//     }
//     return doubt.tag === activeFilter;
//   });

//   if (loading) {
//     return <p className="text-center py-10">Loading doubts...</p>;
//   }

//   return (
//     <div className="min-h-screen bg-white">
//       {/* Header Section with Gradient */}
//       <div
//         className="relative overflow-hidden"
//         style={{ background: 'linear-gradient(135deg, #1887A1 0%, #0D4C5B 100%)' }}
//       >
//         <div className="absolute inset-0 bg-black/5"></div>
//         <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
//           <div className="text-center">
//             <div className="inline-block p-3 rounded-2xl bg-white/10 backdrop-blur-sm mb-6">
//               <div className="bg-white/20 rounded-xl p-4">
//                 <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
//                 </svg>
//               </div>
//             </div>
//             <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
//               My Doubts
//             </h1>
//             <p className="text-white/90 text-lg sm:text-xl max-w-2xl mx-auto mb-8">
//               Track, manage, and get answers to all your programming questions
//             </p>
//             <button
//               onClick={() => setIsModalOpen(true)}
//               className="group bg-white text-gray-800 px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-gray-50 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center gap-3 mx-auto"
//             >
//               <svg className="w-5 h-5 group-hover:rotate-90 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
//               </svg>
//               Ask New Doubt
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
//         {/* Filters */}
//         <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-10">
//           {filters.map((filter) => (
//             <button
//               key={filter}
//               onClick={() => setActiveFilter(filter)}
//               className={`px-6 py-3 rounded-xl font-medium text-sm sm:text-base transition-all duration-200 transform hover:scale-105 ${
//                 activeFilter === filter
//                   ? "text-white shadow-lg"
//                   : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200"
//               }`}
//               style={
//                 activeFilter === filter
//                   ? { background: 'linear-gradient(135deg, #1887A1 0%, #0D4C5B 100%)' }
//                   : {}
//               }
//             >
//               {filter}
//             </button>
//           ))}
//         </div>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
//           <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200">
//             <div className="flex items-center gap-4">
//               <div className="p-3 bg-blue-500 rounded-xl">
//                 <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path>
//                 </svg>
//               </div>
//               <div>
//                 <div className="text-2xl font-bold text-gray-800">{doubts.length}</div>
//                 <div className="text-gray-600 text-sm">Total Doubts</div>
//               </div>
//             </div>
//           </div>
//           <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-2xl p-6 border border-green-200">
//             <div className="flex items-center gap-4">
//               <div className="p-3 bg-green-500 rounded-xl">
//                 <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
//                 </svg>
//               </div>
//               <div>
//                 <div className="text-2xl font-bold text-gray-800">{doubts.filter((d) => d.status === "Answered").length}</div>
//                 <div className="text-gray-600 text-sm">Answered</div>
//               </div>
//             </div>
//           </div>
//           <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-2xl p-6 border border-orange-200">
//             <div className="flex items-center gap-4">
//               <div className="p-3 bg-orange-500 rounded-xl">
//                 <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
//                 </svg>
//               </div>
//               <div>
//                 <div className="text-2xl font-bold text-gray-800">{doubts.filter((d) => d.status === "Pending").length}</div>
//                 <div className="text-gray-600 text-sm">Pending</div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Doubts Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
//           {filteredDoubts.map((doubt, index) => (
//             <div
//               key={doubt.id}
//               className="group bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 hover:border-gray-200"
//               style={{ animationDelay: `${index * 100}ms` }}
//             >
//               <div className="flex justify-between items-start mb-4">
//                 <span className={`inline-flex items-center px-3 py-2 rounded-lg text-xs font-semibold ${getStatusColor(doubt.status)}`}>
//                   <div className={`w-2 h-2 rounded-full mr-2 ${doubt.status === "Answered" ? "bg-green-500" : "bg-orange-500"}`}></div>
//                   {doubt.status}
//                 </span>
//                 <div className="flex items-center gap-2">
//                   <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
//                     <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01"></path>
//                     </svg>
//                   </div>
//                   <button
//                     onClick={() => setDeleteConfirm(doubt.id)}
//                     className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-red-600 hover:text-red-700"
//                   >
//                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
//                     </svg>
//                   </button>
//                 </div>
//               </div>
//               <h3 className="text-gray-800 font-semibold mb-4 text-base sm:text-lg leading-relaxed group-hover:text-gray-900 transition-colors line-clamp-3">
//                 {doubt.question}
//               </h3>
//               <div className="mb-5">
//                 <span className={`inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium ${getTagColor(doubt.tag)}`}>
//                   <svg className="w-3 h-3 mr-2" fill="currentColor" viewBox="0 0 20 20">
//                     <path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path>
//                   </svg>
//                   {doubt.tag}
//                 </span>
//               </div>
//               <button
//                 className="w-full py-3 rounded-xl font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 text-white hover:shadow-lg transform hover:scale-105"
//                 style={{ background: 'linear-gradient(135deg, #1887A1 0%, #0D4C5B 100%)' }}
//               >
//                 {doubt.status === "Answered" ? (
//                   <>
//                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
//                     </svg>
//                     View Answer
//                   </>
//                 ) : (
//                   <>
//                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
//                     </svg>
//                     Waiting for Answer
//                   </>
//                 )}
//               </button>
//             </div>
//           ))}
//         </div>

//         {/* Empty State */}
//         {filteredDoubts.length === 0 && (
//           <div className="text-center py-16">
//             <div className="inline-block p-6 rounded-full bg-gray-100 mb-6">
//               <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.5-1.006-6-2.709M15 11V9a6 6 0 10-12 0v2M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
//               </svg>
//             </div>
//             <div className="text-gray-800 text-xl font-semibold mb-3">No doubts found</div>
//             <p className="text-gray-600 text-base mb-6">Try adjusting your filter or ask a new question</p>
//             <button
//               className="bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-medium hover:bg-gray-200 transition-colors border border-gray-200"
//               onClick={() => setActiveFilter("All")}
//             >
//               Clear Filters
//             </button>
//           </div>
//         )}
//       </main>

//       {/* Modal for New Doubt */}
//       {isModalOpen && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//           <div className="bg-white p-8 rounded-2xl max-w-md w-full mx-4">
//             <h2 className="text-2xl font-bold mb-6 text-gray-800">Ask a New Doubt</h2>
//             <div className="space-y-4">
//               <textarea
//                 value={newQuestion}
//                 onChange={(e) => setNewQuestion(e.target.value)}
//                 placeholder="Enter your question here..."
//                 className="w-full h-32 p-4 border border-gray-300 rounded-xl resize-none focus:outline-none focus:border-blue-500"
//               />
//               <select
//                 value={newTag}
//                 onChange={(e) => setNewTag(e.target.value)}
//                 className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-500"
//               >
//                 {uniqueTags.length > 0 ? (
//                   uniqueTags.map((tag) => (
//                     <option key={tag} value={tag}>
//                       {tag}
//                     </option>
//                   ))
//                 ) : (
//                   <option value="" disabled>
//                     No tags available
//                   </option>
//                 )}
//               </select>
//             </div>
//             <div className="flex justify-end gap-4 mt-6">
//               <button
//                 onClick={() => setIsModalOpen(false)}
//                 className="px-6 py-3 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleSubmit}
//                 className="px-6 py-3 rounded-xl text-white font-medium"
//                 style={{ background: 'linear-gradient(135deg, #1887A1 0%, #0D4C5B 100%)' }}
//               >
//                 Submit
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Delete Confirmation Modal */}
//       {deleteConfirm && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//           <div className="bg-white p-8 rounded-2xl max-w-md w-full mx-4">
//             <h2 className="text-2xl font-bold mb-6 text-gray-800">Confirm Deletion</h2>
//             <p className="text-gray-600 mb-6">Are you sure you want to delete this doubt?</p>
//             <div className="flex justify-end gap-4">
//               <button
//                 onClick={() => setDeleteConfirm(null)}
//                 className="px-6 py-3 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={() => handleDelete(deleteConfirm)}
//                 className="px-6 py-3 rounded-xl text-white font-medium bg-red-600 hover:bg-red-700"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }



"use client";
import { useState, useEffect } from "react";
import axiosClient from "../../lib/axiosClient";

function getStatusColor(status: string) {
  switch (status) {
    case "Answered":
      return "text-green-600 bg-green-100";
    case "Pending":
      return "text-orange-600 bg-orange-100";
    default:
      return "text-gray-600 bg-gray-100";
  }
}

function getTagColor(tag: string) {
  switch (tag) {
    case "JavaScript":
      return "bg-yellow-100 text-yellow-800";
    case "Python":
      return "bg-blue-100 text-blue-800";
    case "Java":
      return "bg-red-100 text-red-800";
    case "Node.js":
      return "bg-green-100 text-green-800";
    case "React":
      return "bg-cyan-100 text-cyan-800";
    case "TypeScript":
      return "bg-purple-100 text-purple-800";
    case "MongoDB":
      return "bg-emerald-100 text-emerald-800";
    case "Express":
      return "bg-gray-100 text-gray-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

interface Doubt {
  id: string;
  _id: string;
  question: string;
  tag: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

interface ApiDoubt {
  _id: string;
  question: string;
  tag: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export default function MyDoubts() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [doubts, setDoubts] = useState<Doubt[]>([]);
  const [uniqueTags, setUniqueTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newQuestion, setNewQuestion] = useState("");
  const [newTag, setNewTag] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    const fetchDoubts = async () => {
      try {
        const res = await axiosClient.get("/api/doubts");
        const doubtsWithId = (res.data?.data || []).map((doubt: ApiDoubt) => ({
          ...doubt,
          id: doubt._id,
        }));
        setDoubts(doubtsWithId);
      } catch (err) {
        console.error("Error fetching doubts:", err);
        setDoubts([]);
      }
    };

    const fetchStacks = async () => {
      try {
        const res = await axiosClient.get("/api/students/mystacks");
        const stacks = Array.isArray(res.data?.data) ? res.data.data : [];
        setUniqueTags(stacks);
        if (stacks.length > 0) setNewTag(stacks[0]);
      } catch (err) {
        console.error("Error fetching stacks:", err);
        setUniqueTags([]);
      }
    };

    Promise.all([fetchDoubts(), fetchStacks()]).finally(() => setLoading(false));
  }, []);

  const handleSubmit = async () => {
    if (!newQuestion || !newTag) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const res = await axiosClient.post("/api/doubts", { question: newQuestion, tag: newTag });
      const newDoubt = { ...res.data.data, id: res.data.data._id };
      setDoubts([newDoubt, ...doubts]);
      if (!uniqueTags.includes(newTag)) {
        setUniqueTags([...uniqueTags, newTag]);
      }
      setNewQuestion("");
      setNewTag(uniqueTags[0] || "");
      setIsModalOpen(false);
    } catch (err) {
      console.error("Error creating doubt:", err);
      alert("Failed to create doubt");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axiosClient.delete(`/api/doubts/${id}`);
      setDoubts(doubts.filter((doubt) => doubt.id !== id));
      setDeleteConfirm(null);
    } catch (err) {
      console.error("Error deleting doubt:", err);
      alert("Failed to delete doubt");
    }
  };

  const filters = ["All", "Answered", "Pending", ...uniqueTags];

  const filteredDoubts = doubts.filter((doubt) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Answered" || activeFilter === "Pending") {
      return doubt.status === activeFilter;
    }
    return doubt.tag === activeFilter;
  });

  if (loading) {
    return <p className="text-center py-10">Loading doubts...</p>;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section with Gradient */}
      <div
        className="relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #1887A1 0%, #0D4C5B 100%)' }}
      >
        <div className="absolute inset-0 bg-black/5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="text-center">
            <div className="inline-block p-3 rounded-2xl bg-white/10 backdrop-blur-sm mb-6">
              <div className="bg-white/20 rounded-xl p-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
              My Doubts
            </h1>
            <p className="text-white/90 text-lg sm:text-xl max-w-2xl mx-auto mb-8">
              Track, manage, and get answers to all your programming questions
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="group bg-white text-gray-800 px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-gray-50 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center gap-3 mx-auto"
            >
              <svg className="w-5 h-5 group-hover:rotate-90 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
              </svg>
              Ask New Doubt
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-10">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-3 rounded-xl font-medium text-sm sm:text-base transition-all duration-200 transform hover:scale-105 ${
                activeFilter === filter
                  ? "text-white shadow-lg"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200"
              }`}
              style={
                activeFilter === filter
                  ? { background: 'linear-gradient(135deg, #1887A1 0%, #0D4C5B 100%)' }
                  : {}
              }
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-500 rounded-xl">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path>
                </svg>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-800">{doubts.length}</div>
                <div className="text-gray-600 text-sm">Total Doubts</div>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-2xl p-6 border border-green-200">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-500 rounded-xl">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-800">{doubts.filter((d) => d.status === "Answered").length}</div>
                <div className="text-gray-600 text-sm">Answered</div>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-2xl p-6 border border-orange-200">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-500 rounded-xl">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-800">{doubts.filter((d) => d.status === "Pending").length}</div>
                <div className="text-gray-600 text-sm">Pending</div>
              </div>
            </div>
          </div>
        </div>

        {/* Doubts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
          {filteredDoubts.map((doubt, index) => (
            <div
              key={doubt.id}
              className="group bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 hover:border-gray-200"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex justify-between items-start mb-4">
                <span className={`inline-flex items-center px-3 py-2 rounded-lg text-xs font-semibold ${getStatusColor(doubt.status)}`}>
                  <div className={`w-2 h-2 rounded-full mr-2 ${doubt.status === "Answered" ? "bg-green-500" : "bg-orange-500"}`}></div>
                  {doubt.status}
                </span>
                <div className="flex items-center gap-2">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01"></path>
                    </svg>
                  </div>
                  <button
                    onClick={() => setDeleteConfirm(doubt.id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-red-600 hover:text-red-700"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </button>
                </div>
              </div>
              <h3 className="text-gray-800 font-semibold mb-4 text-base sm:text-lg leading-relaxed group-hover:text-gray-900 transition-colors line-clamp-3">
                {doubt.question}
              </h3>
              <div className="mb-5">
                <span className={`inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium ${getTagColor(doubt.tag)}`}>
                  <svg className="w-3 h-3 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path>
                  </svg>
                  {doubt.tag}
                </span>
              </div>
              <button
                className="w-full py-3 rounded-xl font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 text-white hover:shadow-lg transform hover:scale-105"
                style={{ background: 'linear-gradient(135deg, #1887A1 0%, #0D4C5B 100%)' }}
              >
                {doubt.status === "Answered" ? (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                    </svg>
                    View Answer
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    Waiting for Answer
                  </>
                )}
              </button>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredDoubts.length === 0 && (
          <div className="text-center py-16">
            <div className="inline-block p-6 rounded-full bg-gray-100 mb-6">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.5-1.006-6-2.709M15 11V9a6 6 0 10-12 0v2M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
            </div>
            <div className="text-gray-800 text-xl font-semibold mb-3">No doubts found</div>
            <p className="text-gray-600 text-base mb-6">Try adjusting your filter or ask a new question</p>
            <button
              className="bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-medium hover:bg-gray-200 transition-colors border border-gray-200"
              onClick={() => setActiveFilter("All")}
            >
              Clear Filters
            </button>
          </div>
        )}
      </main>

      {/* Modal for New Doubt */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-2xl max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Ask a New Doubt</h2>
            <div className="space-y-4">
              <textarea
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
                placeholder="Enter your question here..."
                className="w-full h-32 p-4 border border-gray-300 rounded-xl resize-none focus:outline-none focus:border-blue-500"
              />
              <select
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-500"
              >
                {uniqueTags.length > 0 ? (
                  uniqueTags.map((tag) => (
                    <option key={tag} value={tag}>
                      {tag}
                    </option>
                  ))
                ) : (
                  <option value="" disabled>
                    No tags available
                  </option>
                )}
              </select>
            </div>
            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-3 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-6 py-3 rounded-xl text-white font-medium"
                style={{ background: 'linear-gradient(135deg, #1887A1 0%, #0D4C5B 100%)' }}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-2xl max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Confirm Deletion</h2>
            <p className="text-gray-600 mb-6">Are you sure you want to delete this doubt?</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="px-6 py-3 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="px-6 py-3 rounded-xl text-white font-medium bg-red-600 hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}