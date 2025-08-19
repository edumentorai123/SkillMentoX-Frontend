// "use client";
// import { useState } from "react";
// import {
//   LayoutDashboard,
//   HelpCircle,
//   MessageSquare,
//   Brain,
//   BookOpen,
//   TrendingUp,
//   X,
//   Menu,
// } from "lucide-react";
// import Page from "./page";

// export default function MyDoubts() {
//   const [activeFilter, setActiveFilter] = useState("All");
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [activeNav, setActiveNav] = useState("My Doubts");

//   const doubts = [
//     {
//       id: 1,
//       question:
//         "How do I implement async/await in JavaScript for handling API calls?",
//       status: "Answered",
//       tag: "JavaScript",
//     },
//     {
//       id: 2,
//       question:
//         "How do I implement async/await in JavaScript for handling API calls?",
//       status: "Pending",
//       tag: "JavaScript",
//     },
//     {
//       id: 3,
//       question:
//         "How do I implement async/await in JavaScript for handling API calls?",
//       status: "Answered",
//       tag: "JavaScript",
//     },
//     {
//       id: 4,
//       question:
//         "How do I implement async/await in JavaScript for handling API calls?",
//       status: "Pending",
//       tag: "JavaScript",
//     },
//     {
//       id: 5,
//       question:
//         "How do I implement async/await in JavaScript for handling API calls?",
//       status: "Answered",
//       tag: "JavaScript",
//     },
//     {
//       id: 6,
//       question:
//         "How do I implement async/await in JavaScript for handling API calls?",
//       status: "Pending",
//       tag: "JavaScript",
//     },
//   ];
// <Page/>
//   const navItems = [
//     { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
//     { id: "doubts", label: "My Doubts", icon: HelpCircle },
//     { id: "chats", label: "Chats", icon: MessageSquare },
//     { id: "quizzes", label: "Quizzes", icon: Brain },
//     { id: "course", label: "Course", icon: BookOpen },
//     { id: "progress", label: "Progress", icon: TrendingUp },
//   ];

//   const handleNavClick = (navId: String, label: string) => {
//     setActiveNav(label);
//     setSidebarOpen(false);
//     console.log(`Navigating to: ${label}`);
//   };
//   const filteredDoubts = doubts.filter((doubt) => {
//     if (activeFilter === "All") return true;
//     if (activeFilter === "Java Script") return doubt.tag === "JavaScript";
//     return doubt.status.toLowerCase() === activeFilter.toLowerCase();
//   });

//   return (
//     <div className="flex min-h-screen bg-gray-100 relative">
//       {sidebarOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
//           onClick={() => setSidebarOpen(false)}
//         />
//       )}

//       <aside
//         className={`
//           fixed lg:static inset-y-0 left-0 z-50
//           w-64 sm:w-72 bg-white shadow-lg overflow-y-auto
//           transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
//           lg:translate-x-0 transition-transform duration-300 ease-in-out
//           `}
//       >
//         {/* Close Button Mobile */}
//         <div className="lg:hidden absolute top-4 right-4">
//           <button
//             onClick={() => setSidebarOpen(false)}
//             className="p-2 rounded-md text-gray-600 hover:bg-gray-100"
//           >
//             <X size={20} />
//           </button>
//         </div>

//         {/* Logo */}
//         <div className="p-4 sm:p-6 border-b border-gray-200">
//           <h1 className="text-xl sm:text-2xl font-bold text-teal-600">
//             SkillMentorX
//           </h1>
//         </div>

//         {/* Nav Items with icons as buttons */}
//         <nav className="p-4 sm:p-6 space-y-2">
//           {navItems.map((item) => {
//             const IconComponent = item.icon;
//             const isActive = activeNav === item.label;
//             return (
//               <button
//                 key={item.id}
//                 onClick={() => handleNavClick(item.id, item.label)}
//                 className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors w-full text-left ${
//                   isActive
//                     ? "bg-teal-600 text-white"
//                     : "text-gray-600 hover:bg-gray-100"
//                 }`}
//               >
//                 <IconComponent size={20} />
//                 <span className="font-medium">{item.label}</span>
//               </button>
//             );
//           })}
//         </nav>
//       </aside>

//       {/* Main */}
//       <main className="flex-1 bg-gradient-to-br from-teal-500 to-teal-700 p-4 sm:p-6 lg:p-8">
//         {/* Mobile Menu Button */}
//         <div className="lg:hidden mb-4">
//           <button
//             onClick={() => setSidebarOpen(true)}
//             className="p-2 rounded-md text-white hover:bg-white hover:bg-opacity-20"
//           >
//             <Menu size={24} />
//           </button>
//         </div>

//         <div className="max-w-7xl mx-auto">
//           {/* Heading */}
//           <header className="mb-6 sm:mb-8">
//             <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
//               My Doubts
//             </h1>
//             <p className="text-teal-100 text-sm sm:text-base">
//               Track and manage your questions
//             </p>
//           </header>

//           {/* Ask Doubt */}
//           <div className="mb-4 sm:mb-6">
//             <button className="bg-white text-teal-600 px-4 sm:px-6 py-2 rounded-full font-semibold text-sm sm:text-base hover:bg-gray-50 shadow-md">
//               Ask New Doubt
//             </button>
//           </div>

//           {/* Filters */}
//           <div className="flex flex-wrap gap-2 sm:gap-3 mb-6 sm:mb-8">
//             <button
//               onClick={() => setActiveFilter("All")}
//               className={`px-4 py-1.5 rounded-full font-medium ${
//                 activeFilter === "All"
//                   ? "bg-white text-teal-600"
//                   : "bg-teal-600 text-white border-2 border-white hover:bg-white hover:text-teal-600"
//               }`}
//             >
//               All
//             </button>
//             <button
//               onClick={() => setActiveFilter("Answered")}
//               className={`px-4 py-1.5 rounded-full font-medium ${
//                 activeFilter === "Answered"
//                   ? "bg-white text-teal-600"
//                   : "bg-teal-600 text-white border-2 border-white hover:bg-white hover:text-teal-600"
//               }`}
//             >
//               Answered
//             </button>
//             <button
//               onClick={() => setActiveFilter("Pending")}
//               className={`px-4 py-1.5 rounded-full font-medium ${
//                 activeFilter === "Pending"
//                   ? "bg-white text-teal-600"
//                   : "bg-teal-600 text-white border-2 border-white hover:bg-white hover:text-teal-600"
//               }`}
//             >
//               Pending
//             </button>
//             <button
//               onClick={() => setActiveFilter("Java Script")}
//               className={`px-4 py-1.5 rounded-full font-medium ${
//                 activeFilter === "Java Script"
//                   ? "bg-white text-teal-600"
//                   : "bg-teal-600 text-white border-2 border-white hover:bg-white hover:text-teal-600"
//               }`}
//             >
//               JavaScript
//             </button>
//           </div>

//           {/* Doubts */}
//           <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
//             {filteredDoubts.map((doubt) => (
//               <div
//                 key={doubt.id}
//                 className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition"
//               >
//                 <span
//                   className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
//                     doubt.status === "Answered"
//                       ? "bg-green-100 text-green-700"
//                       : "bg-yellow-100 text-yellow-700"
//                   }`}
//                 >
//                   {doubt.status}
//                 </span>
//                 <h3 className="text-gray-800 font-medium mt-3 mb-2 text-sm sm:text-base">
//                   {doubt.question}
//                 </h3>
//                 <span className="inline-block bg-teal-600 text-white px-2 py-1 rounded text-xs font-medium">
//                   {doubt.tag}
//                 </span>
//                 <button className="mt-4 w-full border-2 border-teal-600 text-teal-600 py-2 rounded font-medium text-sm hover:bg-teal-600 hover:text-white">
//                   View Answer
//                 </button>
//               </div>
//             ))}
//           </div>

//           {filteredDoubts.length === 0 && (
//             <div className="text-center py-12">
//               <div className="text-white text-lg mb-4">No doubts found</div>
//               <p className="text-teal-100">Try adjusting your filter</p>
//             </div>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// }

"use client";
import { useState } from "react";
import Page from "./page"; // navbar import cheythu

export default function MyDoubts() {
  const [activeFilter, setActiveFilter] = useState("All");

  const doubts = [
    { id: 1, question: "How do I implement async/await in JavaScript for handling API calls?", status: "Answered", tag: "JavaScript" },
    { id: 2, question: "How do I implement async/await in JavaScript for handling API calls?", status: "Pending", tag: "JavaScript" },
    { id: 3, question: "How do I implement async/await in JavaScript for handling API calls?", status: "Answered", tag: "JavaScript" },
    { id: 4, question: "How do I implement async/await in JavaScript for handling API calls?", status: "Pending", tag: "JavaScript" },
    { id: 5, question: "How do I implement async/await in JavaScript for handling API calls?", status: "Answered", tag: "JavaScript" },
    { id: 6, question: "How do I implement async/await in JavaScript for handling API calls?", status: "Pending", tag: "JavaScript" },
  ];

  const filteredDoubts = doubts.filter((doubt) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Java Script") return doubt.tag === "JavaScript";
    return doubt.status.toLowerCase() === activeFilter.toLowerCase();
  });

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Navbar from page.tsx */}
      <Page />

      {/* Main Content */}
      <main className="flex-1 bg-gradient-to-br from-teal-500 to-teal-700 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Heading */}
          <header className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
              My Doubts
            </h1>
            <p className="text-teal-100 text-sm sm:text-base">
              Track and manage your questions
            </p>
          </header>

          {/* Ask Doubt */}
          <div className="mb-4 sm:mb-6">
            <button className="bg-white text-teal-600 px-4 sm:px-6 py-2 rounded-full font-semibold text-sm sm:text-base hover:bg-gray-50 shadow-md">
              Ask New Doubt
            </button>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2 sm:gap-3 mb-6 sm:mb-8">
            <button
              onClick={() => setActiveFilter("All")}
              className={`px-4 py-1.5 rounded-full font-medium ${
                activeFilter === "All"
                  ? "bg-white text-teal-600"
                  : "bg-teal-600 text-white border-2 border-white hover:bg-white hover:text-teal-600"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setActiveFilter("Answered")}
              className={`px-4 py-1.5 rounded-full font-medium ${
                activeFilter === "Answered"
                  ? "bg-white text-teal-600"
                  : "bg-teal-600 text-white border-2 border-white hover:bg-white hover:text-teal-600"
              }`}
            >
              Answered
            </button>
            <button
              onClick={() => setActiveFilter("Pending")}
              className={`px-4 py-1.5 rounded-full font-medium ${
                activeFilter === "Pending"
                  ? "bg-white text-teal-600"
                  : "bg-teal-600 text-white border-2 border-white hover:bg-white hover:text-teal-600"
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => setActiveFilter("Java Script")}
              className={`px-4 py-1.5 rounded-full font-medium ${
                activeFilter === "Java Script"
                  ? "bg-white text-teal-600"
                  : "bg-teal-600 text-white border-2 border-white hover:bg-white hover:text-teal-600"
              }`}
            >
              JavaScript
            </button>
          </div>

          {/* Doubts */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
            {filteredDoubts.map((doubt) => (
              <div
                key={doubt.id}
                className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition"
              >
                <span
                  className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                    doubt.status === "Answered"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {doubt.status}
                </span>
                <h3 className="text-gray-800 font-medium mt-3 mb-2 text-sm sm:text-base">
                  {doubt.question}
                </h3>
                <span className="inline-block bg-teal-600 text-white px-2 py-1 rounded text-xs font-medium">
                  {doubt.tag}
                </span>
                <button className="mt-4 w-full border-2 border-teal-600 text-teal-600 py-2 rounded font-medium text-sm hover:bg-teal-600 hover:text-white">
                  View Answer
                </button>
              </div>
            ))}
          </div>

          {filteredDoubts.length === 0 && (
            <div className="text-center py-12">
              <div className="text-white text-lg mb-4">No doubts found</div>
              <p className="text-teal-100">Try adjusting your filter</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

