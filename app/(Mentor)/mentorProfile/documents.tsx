// "use client";
// import { useFormContext } from "react-hook-form";
// import { useState, useEffect } from "react";
// import axios from "axios";

// interface MentorFormData {
//   profilePicture?: FileList;
//   idProof?: FileList;
//   qualificationProof?: FileList;
//   cv?: FileList;
// }

// interface MentorProfileResponse {
//   success: boolean;
//   data: {
//     documents: {
//       idProof?: string;
//       qualificationProof?: string;
//       cv?: string;
//       profilePicture?: string;
//     };
//     certifications: string[];
//     fullName?: string;
//     headline?: string;
//     bio?: string;
//     currentRole?: string;
//     company?: string;
//     yearsOfExperience?: number;
//     email?: string;
//     phoneNumber?: string;
//     gender?: string;
//     linkedin?: string;
//     github?: string;
//     portfolio?: string;
//     education?: { degree: string; institution: string; year: string }[];
//     courses?: { category: string; courseName: string }[];
//   };
// }

// interface ExistingDocuments {
//   idProof: string;
//   qualificationProof: string;
//   cv: string;
//   profilePicture: string;
// }

// const Documents = () => {
//   const { register } = useFormContext<MentorFormData>();
//   const [existingDocuments, setExistingDocuments] = useState<ExistingDocuments>({
//     idProof: "",
//     qualificationProof: "",
//     cv: "",
//     profilePicture: "",
//   });

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         if (!token) return;
//         const res = await axios.get<MentorProfileResponse>(
//           "http://localhost:9999/api/mentor/profile",
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//         console.log("Full API Response:", JSON.stringify(res.data, null, 2)); // API റെസ്‌പോൺസ് പരിശോധിക്കുക
//         if (res.data.data.documents) {
//           setExistingDocuments({
//             idProof: res.data.data.documents.idProof || "",
//             qualificationProof: res.data.data.documents.qualificationProof || "",
//             cv: res.data.data.documents.cv || "",
//             profilePicture: res.data.data.documents.profilePicture || "",
//           });
//         }
//       } catch (err) {
//         console.error("Error fetching profile:", err);
//       }
//     };
//     fetchProfile();
//   }, []);

//   const viewDocument = (url: string | any) => {
//     console.log("Received URL:", url); // ലഭിച്ച URL പരിശോധിക്കുക
//     if (!url || (Array.isArray(url) && url.length === 0)) {
//       alert("ഡോക്യുമെന്റ് URL ലഭ്യമല്ല അല്ലെങ്കിൽ അസാധുവാണ്.");
//       return;
//     }
//     let fullUrl = typeof url === "string" ? url : "";
//     if (fullUrl.includes("res.cloudinary.com") && !fullUrl.includes("raw/upload") && !fullUrl.includes("image/upload")) {
//       fullUrl = fullUrl.replace("upload/", "raw/upload/");
//     }
//     console.log("Opening URL:", fullUrl); // തുറക്കുന്ന URL പരിശോധിക്കുക
//     try {
//       const newWindow = window.open(fullUrl, "_blank");
//       if (!newWindow || newWindow.closed || typeof newWindow.closed === "undefined") {
//         alert("ഡോക്യുമെന്റ് തുറക്കാൻ കഴിഞ്ഞില്ല. URL അല്ലെങ്കിൽ ബ്രൗസർ സെറ്റിംഗ് പരിശോധിക്കുക. URL: " + fullUrl);
//       }
//     } catch (error) {
//       console.error("Error opening document:", error);
//       alert("ഡോക്യുമെന്റ് വീക്ഷിക്കാൻ പിശക് സംഭവിച്ചു. പിന്തുണയെ ബന്ധപ്പെടുക. URL: " + fullUrl);
//     }
//   };

//   return (
//     <div className="space-y-6">
//       <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
//         <span className="mr-2">📁</span>
//         Document Uploads
//       </h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div className="bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-200 rounded-xl p-6">
//           <label className="block text-sm font-medium text-gray-700 mb-3">
//             Profile Picture
//           </label>
//           <div className="relative">
//             <input
//               {...register("profilePicture")}
//               className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
//               type="file"
//               accept="image/*"
//             />
//             <div className="border-2 border-dashed border-cyan-200 rounded-lg p-6 text-center hover:border-cyan-300 transition-colors">
//               <svg className="mx-auto h-12 w-12 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
//                 />
//               </svg>
//               <p className="mt-2 text-sm text-gray-600">
//                 Click to upload image
//               </p>
//             </div>
//           </div>
//           {existingDocuments.profilePicture && (
//             <div className="mt-3">
//               <button
//                 type="button"
//                 onClick={() => viewDocument(existingDocuments.profilePicture)}
//                 className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
//               >
//                 <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
//                   />
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
//                   />
//                 </svg>
//                 View Current Profile Picture
//               </button>
//             </div>
//           )}
//         </div>
//         <div className="bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-200 rounded-xl p-6">
//           <label className="block text-sm font-medium text-gray-700 mb-3">
//             CV/Resume
//           </label>
//           <div className="relative">
//             <input
//               {...register("cv")}
//               className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
//               type="file"
//               accept=".pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
//             />
//             <div className="border-2 border-dashed border-cyan-200 rounded-lg p-6 text-center hover:border-cyan-300 transition-colors">
//               <svg className="mx-auto h-12 w-12 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
//                 />
//               </svg>
//               <p className="mt-2 text-sm text-gray-600">
//                 Click to upload CV/Resume (PDF/DOC)
//               </p>
//             </div>
//           </div>
//           {existingDocuments.cv && (
//             <div className="mt-3">
//               <button
//                 type="button"
//                 onClick={() => viewDocument(existingDocuments.cv)}
//                 className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
//               >
//                 <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
//                   />
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
//                   />
//                 </svg>
//                 View Current CV
//               </button>
//             </div>
//           )}
//         </div>
//         <div className="bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-200 rounded-xl p-6">
//           <label className="block text-sm font-medium text-gray-700 mb-3">
//             ID Proof
//           </label>
//           <div className="relative">
//             <input
//               {...register("idProof")}
//               className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
//               type="file"
//               accept="image/*,application/pdf"
//             />
//             <div className="border-2 border-dashed border-cyan-200 rounded-lg p-6 text-center hover:border-cyan-300 transition-colors">
//               <svg className="mx-auto h-12 w-12 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
//                 />
//               </svg>
//               <p className="mt-2 text-sm text-gray-600">
//                 Click to upload file
//               </p>
//             </div>
//           </div>
//           {existingDocuments.idProof && (
//             <div className="mt-3">
//               <button
//                 type="button"
//                 onClick={() => viewDocument(existingDocuments.idProof)}
//                 className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
//               >
//                 <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
//                   />
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
//                   />
//                 </svg>
//                 View Current ID Proof
//               </button>
//             </div>
//           )}
//         </div>
//         <div className="bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-200 rounded-xl p-6">
//           <label className="block text-sm font-medium text-gray-700 mb-3">
//             Qualification Proof
//           </label>
//           <div className="relative">
//             <input
//               {...register("qualificationProof")}
//               className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
//               type="file"
//               accept="image/*,application/pdf"
//             />
//             <div className="border-2 border-dashed border-cyan-200 rounded-lg p-6 text-center hover:border-cyan-300 transition-colors">
//               <svg className="mx-auto h-12 w-12 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
//                 />
//               </svg>
//               <p className="mt-2 text-sm text-gray-600">
//                 Click to upload file
//               </p>
//             </div>
//           </div>
//           {existingDocuments.qualificationProof && (
//             <div className="mt-3">
//               <button
//                 type="button"
//                 onClick={() => viewDocument(existingDocuments.qualificationProof)}
//                 className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
//               >
//                 <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
//                   />
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
//                   />
//                 </svg>
//                 View Current Qualification Proof
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Documents;

"use client";
import { useFormContext } from "react-hook-form";
import { useState, useEffect } from "react";
import axios from "axios";

interface MentorFormData {
  profilePicture?: FileList;
  idProof?: FileList;
  qualificationProof?: FileList;
  cv?: FileList;
}

interface MentorProfileResponse {
  success: boolean;
  data: {
    documents: {
      idProof?: string[];
      qualificationProof?: string[];
      cv?: string[];
      profilePicture?: string;
    };
    certifications: string[];
    fullName?: string;
    headline?: string;
    bio?: string;
    currentRole?: string;
    company?: string;
    yearsOfExperience?: number;
    email?: string;
    phoneNumber?: string;
    gender?: string;
    linkedin?: string;
    github?: string;
    portfolio?: string;
    education?: { degree: string; institution: string; year: string }[];
    courses?: { category: string; courseName: string }[];
  };
}

interface ExistingDocuments {
  idProof: string[];
  qualificationProof: string[];
  cv: string[];
  profilePicture: string;
}

const Documents = () => {
  const { register } = useFormContext<MentorFormData>();
  const [existingDocuments, setExistingDocuments] = useState<ExistingDocuments>({
    idProof: [],
    qualificationProof: [],
    cv: [],
    profilePicture: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const res = await axios.get<MentorProfileResponse>(
          "http://localhost:9999/api/mentor/profile",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (res.data.data.documents) {
          setExistingDocuments({
            idProof: res.data.data.documents.idProof || [],
            qualificationProof: res.data.data.documents.qualificationProof || [],
            cv: res.data.data.documents.cv || [],
            profilePicture: res.data.data.documents.profilePicture || "",
          });
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };
    fetchProfile();
  }, []);

  const viewDocument = (url: string) => {
    if (!url) {
      alert("ഡോക്യുമെന്റ് URL ലഭ്യമല്ല.");
      return;
    }
    let fullUrl = url;
    if (
      fullUrl.includes("res.cloudinary.com") &&
      !fullUrl.includes("raw/upload") &&
      !fullUrl.includes("image/upload")
    ) {
      fullUrl = fullUrl.replace("upload/", "raw/upload/");
    }
    try {
      window.open(fullUrl, "_blank");
    } catch (error) {
      console.error("Error opening document:", error);
      alert("ഡോക്യുമെന്റ് തുറക്കാൻ കഴിഞ്ഞില്ല.");
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
        <span className="mr-2">📁</span>
        Document Uploads
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Profile Picture (single) */}
        <div className="bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-200 rounded-xl p-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Profile Picture
          </label>
          <div className="relative">
            <input
              {...register("profilePicture")}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              type="file"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  const file = e.target.files[0];
                  const previewUrl = URL.createObjectURL(file);
                  setExistingDocuments((prev) => ({
                    ...prev,
                    profilePicture: previewUrl,
                  }));
                }
              }}
            />
            <div className="border-2 border-dashed border-cyan-200 rounded-lg p-6 text-center hover:border-cyan-300 transition-colors">
              <p className="mt-2 text-sm text-gray-600">Click to upload image</p>
            </div>
          </div>
          {existingDocuments.profilePicture && (
            <div className="mt-3">
              <img
                src={existingDocuments.profilePicture}
                alt="Profile Preview"
                className="h-24 w-24 rounded-full object-cover border"
              />
              <button
                type="button"
                onClick={() => viewDocument(existingDocuments.profilePicture)}
                className="text-blue-600 hover:text-blue-800 text-sm flex items-center mt-2"
              >
                View Current Profile Picture
              </button>
            </div>
          )}
        </div>

        {/* CV/Resume (multiple) */}
        <div className="bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-200 rounded-xl p-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            CV/Resume
          </label>
          <div className="relative">
            <input
              {...register("cv")}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              type="file"
              accept=".pdf,.doc,.docx"
              multiple
              onChange={(e) => {
                if (e.target.files) {
                  const files = Array.from(e.target.files).map((f) => f.name);
                  setExistingDocuments((prev) => ({
                    ...prev,
                    cv: [...prev.cv, ...files],
                  }));
                }
              }}
            />
            <div className="border-2 border-dashed border-cyan-200 rounded-lg p-6 text-center hover:border-cyan-300 transition-colors">
              <p className="mt-2 text-sm text-gray-600">Upload CVs (PDF/DOC)</p>
            </div>
          </div>
          {existingDocuments.cv.length > 0 && (
            <ul className="mt-3 text-sm text-gray-700 space-y-1">
              {existingDocuments.cv.map((file, idx) => (
                <li key={idx} className="flex justify-between items-center">
                  {file}
                  <button
                    type="button"
                    onClick={() => viewDocument(file)}
                    className="text-blue-600 hover:text-blue-800 ml-2"
                  >
                    View
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* ID Proof (multiple) */}
        <div className="bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-200 rounded-xl p-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            ID Proof
          </label>
          <div className="relative">
            <input
              {...register("idProof")}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              type="file"
              accept="image/*,application/pdf"
              multiple
              onChange={(e) => {
                if (e.target.files) {
                  const files = Array.from(e.target.files).map((f) => f.name);
                  setExistingDocuments((prev) => ({
                    ...prev,
                    idProof: [...prev.idProof, ...files],
                  }));
                }
              }}
            />
            <div className="border-2 border-dashed border-cyan-200 rounded-lg p-6 text-center hover:border-cyan-300 transition-colors">
              <p className="mt-2 text-sm text-gray-600">Upload ID Proofs</p>
            </div>
          </div>
          {existingDocuments.idProof.length > 0 && (
            <ul className="mt-3 text-sm text-gray-700 space-y-1">
              {existingDocuments.idProof.map((file, idx) => (
                <li key={idx} className="flex justify-between items-center">
                  {file}
                  <button
                    type="button"
                    onClick={() => viewDocument(file)}
                    className="text-blue-600 hover:text-blue-800 ml-2"
                  >
                    View
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Qualification Proof (multiple) */}
        <div className="bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-200 rounded-xl p-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Qualification Proof
          </label>
          <div className="relative">
            <input
              {...register("qualificationProof")}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              type="file"
              accept="image/*,application/pdf"
              multiple
              onChange={(e) => {
                if (e.target.files) {
                  const files = Array.from(e.target.files).map((f) => f.name);
                  setExistingDocuments((prev) => ({
                    ...prev,
                    qualificationProof: [...prev.qualificationProof, ...files],
                  }));
                }
              }}
            />
            <div className="border-2 border-dashed border-cyan-200 rounded-lg p-6 text-center hover:border-cyan-300 transition-colors">
              <p className="mt-2 text-sm text-gray-600">Upload Qualification Proofs</p>
            </div>
          </div>
          {existingDocuments.qualificationProof.length > 0 && (
            <ul className="mt-3 text-sm text-gray-700 space-y-1">
              {existingDocuments.qualificationProof.map((file, idx) => (
                <li key={idx} className="flex justify-between items-center">
                  {file}
                  <button
                    type="button"
                    onClick={() => viewDocument(file)}
                    className="text-blue-600 hover:text-blue-800 ml-2"
                  >
                    View
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Documents;
