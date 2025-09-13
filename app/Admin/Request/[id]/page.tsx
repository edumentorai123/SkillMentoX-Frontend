// "use client";

// import React, { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import axios from "axios";

// interface Education {
//   degree: string;
//   institution: string;
//   year: string;
// }

// interface Course {
//   category: string;
//   courseName: string;
// }

// interface Documents {
//   idProof: string[];
//   qualificationProof: string[];
//   cv: string[];
// }

// interface Mentor {
//   _id: string;
//   fullName: string;
//   email: string;
//   headline?: string;
//   bio?: string;
//   currentRole?: string;
//   company?: string;
//   yearsOfExperience?: number;
//   education?: Education[];
//   certifications?: string[];
//   courses?: Course[];
//   linkedin?: string;
//   github?: string;
//   portfolio?: string;
//   gender?: string;
//   phoneNumber?: string;
//   documents?: Documents;
//   verificationStatus: string;
// }

// const MentorDetailsPage = () => {
//   const { id } = useParams();
//   const [mentor, setMentor] = useState<Mentor | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (!token || !id) return;

//     const fetchMentor = async () => {
//       try {
//         const { data } = await axios.get(
//           `http://localhost:9999/api/admin/mentor/${id}`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );
//         setMentor(data.data);
//       } catch (error: any) {
//         console.error("Error fetching mentor details:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMentor();
//   }, [id]);

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-white flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1887A1] mx-auto mb-4"></div>
//           <p className="text-[#0D4C5B] font-medium">Loading mentor details...</p>
//         </div>
//       </div>
//     );
//   }

//   if (!mentor) {
//     return (
//       <div className="min-h-screen bg-white flex items-center justify-center">
//         <div className="text-center">
//           <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
//             <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
//             </svg>
//           </div>
//           <p className="text-red-600 font-medium">Mentor not found</p>
//         </div>
//       </div>
//     );
//   }

//   const getVerificationBadgeColor = (status: string) => {
//     switch (status.toLowerCase()) {
//       case "approved":
//         return "bg-emerald-500 text-white";
//       case "rejected":
//         return "bg-red-500 text-white";
//       case "pending":
//         return "bg-amber-500 text-white";
//       default:
//         return "bg-gray-500 text-white";
//     }
//   };

//   return (
//     <div className="min-h-screen bg-white">
//       {/* Header Section */}
//       <div className="bg-gradient-to-r from-[#0D4C5B] to-[#1887A1] text-white">
//         <div className="max-w-6xl mx-auto px-6 py-12">
//           <div className="flex items-start justify-between flex-wrap gap-4">
//             <div className="flex-1">
//               <h1 className="text-4xl font-bold mb-3">{mentor.fullName}</h1>
//               <p className="text-xl text-white/90 mb-4">{mentor.headline || "Professional Mentor"}</p>
//               <div className="flex flex-wrap gap-4 text-sm">
//                 {mentor.currentRole && (
//                   <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full">
//                     <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
//                       <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
//                     </svg>
//                     <span>{mentor.currentRole}</span>
//                   </div>
//                 )}
//                 {mentor.company && (
//                   <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full">
//                     <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
//                       <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
//                     </svg>
//                     <span>{mentor.company}</span>
//                   </div>
//                 )}
//                 {mentor.yearsOfExperience && (
//                   <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full">
//                     <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
//                       <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
//                     </svg>
//                     <span>{mentor.yearsOfExperience} years experience</span>
//                   </div>
//                 )}
//               </div>
//             </div>
//             <div className="flex flex-col items-end gap-3">
//               <div className={`px-4 py-2 rounded-full font-semibold text-sm ${getVerificationBadgeColor(mentor.verificationStatus)}`}>
//                 {mentor.verificationStatus.charAt(0).toUpperCase() + mentor.verificationStatus.slice(1)}
//               </div>
//               {(mentor.linkedin || mentor.github || mentor.portfolio) && (
//                 <div className="flex gap-3">
//                   {mentor.linkedin && (
//                     <a href={mentor.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
//                       <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
//                         <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
//                       </svg>
//                     </a>
//                   )}
//                   {mentor.github && (
//                     <a href={mentor.github} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
//                       <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
//                         <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
//                       </svg>
//                     </a>
//                   )}
//                   {mentor.portfolio && (
//                     <a href={mentor.portfolio} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
//                       <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
//                         <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
//                       </svg>
//                     </a>
//                   )}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Content Section */}
//       <div className="max-w-6xl mx-auto px-6 py-8">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

//           {/* Left Column - Contact & Basic Info */}
//           <div className="lg:col-span-1 space-y-6">
//             {/* Contact Information Card */}
//             <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
//               <h3 className="text-lg font-semibold text-[#0D4C5B] mb-4 flex items-center gap-2">
//                 <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
//                   <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
//                 </svg>
//                 Contact Information
//               </h3>
//               <div className="space-y-3">
//                 <div className="flex items-start gap-3">
//                   <svg className="w-4 h-4 text-[#1887A1] mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
//                     <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
//                     <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
//                   </svg>
//                   <div>
//                     <p className="text-sm text-gray-600">Email</p>
//                     <p className="text-[#0D4C5B] font-medium">{mentor.email}</p>
//                   </div>
//                 </div>
//                 {mentor.phoneNumber && (
//                   <div className="flex items-start gap-3">
//                     <svg className="w-4 h-4 text-[#1887A1] mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
//                       <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
//                     </svg>
//                     <div>
//                       <p className="text-sm text-gray-600">Phone</p>
//                       <p className="text-[#0D4C5B] font-medium">{mentor.phoneNumber}</p>
//                     </div>
//                   </div>
//                 )}
//                 {mentor.gender && (
//                   <div className="flex items-start gap-3">
//                     <svg className="w-4 h-4 text-[#1887A1] mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
//                       <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
//                     </svg>
//                     <div>
//                       <p className="text-sm text-gray-600">Gender</p>
//                       <p className="text-[#0D4C5B] font-medium capitalize">{mentor.gender}</p>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Documents Card */}
//             {mentor.documents && (
//               <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
//                 <h3 className="text-lg font-semibold text-[#0D4C5B] mb-4 flex items-center gap-2">
//                   <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
//                     <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
//                   </svg>
//                   Documents
//                 </h3>
//                 <div className="space-y-3">
//                   <div>
//                     <p className="text-sm text-gray-600 mb-1">ID Proof</p>
//                     <p className="text-[#0D4C5B] text-sm">{mentor.documents.idProof?.length ? mentor.documents.idProof.join(", ") : "Not provided"}</p>
//                   </div>
//                   <div>
//                     <p className="text-sm text-gray-600 mb-1">Qualification Proof</p>
//                     <p className="text-[#0D4C5B] text-sm">{mentor.documents.qualificationProof?.length ? mentor.documents.qualificationProof.join(", ") : "Not provided"}</p>
//                   </div>
//                   <div>
//                     <p className="text-sm text-gray-600 mb-1">CV</p>
//                     <p className="text-[#0D4C5B] text-sm">{mentor.documents.cv?.length ? mentor.documents.cv.join(", ") : "Not provided"}</p>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Right Column - Main Content */}
//           <div className="lg:col-span-2 space-y-6">

//             {/* Bio Section */}
//             <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
//               <h3 className="text-lg font-semibold text-[#0D4C5B] mb-4 flex items-center gap-2">
//                 <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
//                   <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
//                 </svg>
//                 About
//               </h3>
//               <p className="text-gray-700 leading-relaxed">
//                 {mentor.bio || "No bio information available."}
//               </p>
//             </div>

//             {/* Education Section */}
//             {mentor.education && mentor.education.length > 0 && (
//               <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
//                 <h3 className="text-lg font-semibold text-[#0D4C5B] mb-4 flex items-center gap-2">
//                   <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
//                     <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
//                   </svg>
//                   Education
//                 </h3>
//                 <div className="space-y-4">
//                   {mentor.education.map((edu, idx) => (
//                     <div key={idx} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
//                       <div className="w-8 h-8 bg-[#1887A1] rounded-full flex items-center justify-center flex-shrink-0">
//                         <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
//                           <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3z" />
//                         </svg>
//                       </div>
//                       <div>
//                         <h4 className="font-semibold text-[#0D4C5B]">{edu.degree}</h4>
//                         <p className="text-gray-600">{edu.institution}</p>
//                         <p className="text-sm text-[#1887A1] font-medium">{edu.year}</p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Certifications Section */}
//             {mentor.certifications && mentor.certifications.length > 0 && (
//               <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
//                 <h3 className="text-lg font-semibold text-[#0D4C5B] mb-4 flex items-center gap-2">
//                   <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
//                     <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//                   </svg>
//                   Certifications
//                 </h3>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                   {mentor.certifications.map((cert, idx) => (
//                     <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
//                       <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
//                         <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
//                           <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//                         </svg>
//                       </div>
//                       <span className="text-[#0D4C5B] font-medium text-sm">{cert}</span>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Courses Section */}
//             {mentor.courses && mentor.courses.length > 0 && (
//               <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
//                 <h3 className="text-lg font-semibold text-[#0D4C5B] mb-4 flex items-center gap-2">
//                   <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
//                     <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                   </svg>
//                   Courses
//                 </h3>
//                 <div className="space-y-3">
//                   {mentor.courses.map((course, idx) => (
//                     <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
//                       <div>
//                         <h4 className="font-medium text-[#0D4C5B]">{course.courseName}</h4>
//                         <span className="inline-block mt-1 px-2 py-1 bg-[#1887A1] text-white text-xs rounded-full">
//                           {course.category}
//                         </span>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MentorDetailsPage;

"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";

interface Education {
  degree: string;
  institution: string;
  year: string;
}

interface Course {
  category: string;
  courseName: string;
}

interface Documents {
  idProof: string[];
  qualificationProof: string[];
  cv: string[];
}

interface Mentor {
  _id: string;
  fullName: string;
  email: string;
  headline?: string;
  bio?: string;
  currentRole?: string;
  company?: string;
  yearsOfExperience?: number;
  education?: Education[];
  certifications?: string[];
  courses?: Course[];
  linkedin?: string;
  github?: string;
  portfolio?: string;
  gender?: string;
  phoneNumber?: string;
  documents?: Documents;
  verificationStatus: string;
}

const MentorDetailsPage = () => {
  const { id } = useParams();
  const [mentor, setMentor] = useState<Mentor | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token || !id) return;

    const fetchMentor = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:9999/api/admin/mentor/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setMentor(data.data);
      } catch (error: any) {
        console.error("Error fetching mentor details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMentor();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1887A1] mx-auto mb-4"></div>
          <p className="text-[#0D4C5B] font-medium">
            Loading mentor details...
          </p>
        </div>
      </div>
    );
  }

  if (!mentor) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <p className="text-red-600 font-medium">Mentor not found</p>
        </div>
      </div>
    );
  }

  const getVerificationBadgeColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "approved":
        return "bg-emerald-500 text-white";
      case "rejected":
        return "bg-red-500 text-white";
      case "pending":
        return "bg-amber-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-[#0D4C5B] to-[#1887A1] text-white">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-3">{mentor.fullName}</h1>
              <p className="text-xl text-white/90 mb-4">
                {mentor.headline || "Professional Mentor"}
              </p>
              <div className="flex flex-wrap gap-4 text-sm">
                {mentor.currentRole && (
                  <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>{mentor.currentRole}</span>
                  </div>
                )}
                {mentor.company && (
                  <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>{mentor.company}</span>
                  </div>
                )}
                {mentor.yearsOfExperience && (
                  <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>{mentor.yearsOfExperience} years experience</span>
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col items-end gap-3">
              <div
                className={`px-4 py-2 rounded-full font-semibold text-sm ${getVerificationBadgeColor(
                  mentor.verificationStatus
                )}`}
              >
                {mentor.verificationStatus.charAt(0).toUpperCase() +
                  mentor.verificationStatus.slice(1)}
              </div>
              {(mentor.linkedin || mentor.github || mentor.portfolio) && (
                <div className="flex gap-3">
                  {mentor.linkedin && (
                    <a
                      href={mentor.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </a>
                  )}
                  {mentor.github && (
                    <a
                      href={mentor.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                    </a>
                  )}
                  {mentor.portfolio && (
                    <a
                      href={mentor.portfolio}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Contact & Basic Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Contact Information Card */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-[#0D4C5B] mb-4 flex items-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z"
                    clipRule="evenodd"
                  />
                </svg>
                Contact Information
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <svg
                    className="w-4 h-4 text-[#1887A1] mt-1 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="text-[#0D4C5B] font-medium">{mentor.email}</p>
                  </div>
                </div>
                {mentor.phoneNumber && (
                  <div className="flex items-start gap-3">
                    <svg
                      className="w-4 h-4 text-[#1887A1] mt-1 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    <div>
                      <p className="text-sm text-gray-600">Phone</p>
                      <p className="text-[#0D4C5B] font-medium">
                        {mentor.phoneNumber}
                      </p>
                    </div>
                  </div>
                )}
                {mentor.gender && (
                  <div className="flex items-start gap-3">
                    <svg
                      className="w-4 h-4 text-[#1887A1] mt-1 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <div>
                      <p className="text-sm text-gray-600">Gender</p>
                      <p className="text-[#0D4C5B] font-medium capitalize">
                        {mentor.gender}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Documents Card */}
            {mentor.documents && (
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-[#0D4C5B] mb-4 flex items-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Documents
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-2">ID Proof</p>
                    {mentor.documents.idProof?.length ? (
                      mentor.documents.idProof.map((doc, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg mb-2"
                        >
                          <div className="flex items-center gap-2">
                            <svg
                              className="w-4 h-4 text-[#1887A1]"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="text-sm text-[#0D4C5B]">
                              ID Document {idx + 1}
                            </span>
                          </div>
                          <button
                            onClick={() => window.open(doc, "_blank")}
                            className="px-3 py-1 bg-[#1887A1] text-white text-sm rounded-lg hover:bg-[#0D4C5B] transition-colors"
                          >
                            View
                          </button>
                        </div>
                      ))
                    ) : (
                      <p className="text-[#0D4C5B] text-sm">Not provided</p>
                    )}
                  </div>

                  <div>
                    <p className="text-sm text-gray-600 mb-2">
                      Qualification Proof
                    </p>
                    {mentor.documents.qualificationProof?.length ? (
                      mentor.documents.qualificationProof.map((doc, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg mb-2"
                        >
                          <div className="flex items-center gap-2">
                            <svg
                              className="w-4 h-4 text-[#1887A1]"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3z" />
                            </svg>
                            <span className="text-sm text-[#0D4C5B]">
                              Qualification {idx + 1}
                            </span>
                          </div>
                          <button
                            onClick={() => window.open(doc, "_blank")}
                            className="px-3 py-1 bg-[#1887A1] text-white text-sm rounded-lg hover:bg-[#0D4C5B] transition-colors"
                          >
                            View
                          </button>
                        </div>
                      ))
                    ) : (
                      <p className="text-[#0D4C5B] text-sm">Not provided</p>
                    )}
                  </div>

                  <div>
                    <p className="text-sm text-gray-600 mb-2">CV</p>
                    {mentor.documents.cv?.length ? (
                      mentor.documents.cv.map((doc, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg mb-2"
                        >
                          <div className="flex items-center gap-2">
                            <svg
                              className="w-4 h-4 text-[#1887A1]"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"
                                clipRule="evenodd"
                              />
                              <path
                                fillRule="evenodd"
                                d="M4 5a2 2 0 012-2v1a2 2 0 002 2h2a2 2 0 002-2V3a2 2 0 012 2v6.5l-3.777-1.947a3 3 0 00-2.446 0L4 9.5V5z"
                                clipRule="evenodd"
                              />
                              <path d="M6 12a1 1 0 100-2 1 1 0 000 2z" />
                              <path d="M7.828 13.414a.5.5 0 00-.707.707l3 3a.5.5 0 00.707 0l3-3a.5.5 0 00-.707-.707L11 15.536V10.5a.5.5 0 00-1 0v5.036l-2.121-2.122z" />
                            </svg>
                            <span className="text-sm text-[#0D4C5B]">
                              CV {idx + 1}
                            </span>
                          </div>
                          <button
                            onClick={() => window.open(doc, "_blank")}
                            className="px-3 py-1 bg-[#1887A1] text-white text-sm rounded-lg hover:bg-[#0D4C5B] transition-colors"
                          >
                            View
                          </button>
                        </div>
                      ))
                    ) : (
                      <p className="text-[#0D4C5B] text-sm">Not provided</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Bio Section */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-[#0D4C5B] mb-4 flex items-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                    clipRule="evenodd"
                  />
                </svg>
                About
              </h3>
              <div className="max-h-48 overflow-y-auto pr-2">
                <p className="text-gray-700 leading-relaxed">
                  {mentor.bio || "No bio information available."}
                </p>
              </div>
            </div>

            {/* Education Section */}
            {mentor.education && mentor.education.length > 0 && (
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-[#0D4C5B] mb-4 flex items-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                  </svg>
                  Education
                </h3>
                <div className="space-y-4">
                  {mentor.education.map((edu, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="w-8 h-8 bg-[#1887A1] rounded-full flex items-center justify-center flex-shrink-0">
                        <svg
                          className="w-4 h-4 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-[#0D4C5B]">
                          {edu.degree}
                        </h4>
                        <p className="text-gray-600">{edu.institution}</p>
                        <p className="text-sm text-[#1887A1] font-medium">
                          {edu.year}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Certifications Section */}
            {mentor.certifications && mentor.certifications.length > 0 && (
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-[#0D4C5B] mb-4 flex items-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Certifications
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {mentor.certifications.map((cert, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg
                          className="w-3 h-3 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <span className="text-[#0D4C5B] font-medium text-sm">
                        {cert}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Courses Section */}
            {mentor.courses && mentor.courses.length > 0 && (
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-[#0D4C5B] mb-4 flex items-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Courses
                </h3>
                <div className="space-y-3">
                  {mentor.courses.map((course, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <h4 className="font-medium text-[#0D4C5B]">
                          {course.courseName}
                        </h4>
                        <span className="inline-block mt-1 px-2 py-1 bg-[#1887A1] text-white text-xs rounded-full">
                          {course.category}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorDetailsPage;
