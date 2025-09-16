import React from "react";
import { UseFormRegister } from "react-hook-form";
import { MentorFormData } from "../types";

// Create a specific interface for Documents props
interface DocumentsProps {
  register: UseFormRegister<MentorFormData>;
  existingDocuments?: {
    idProof: string;
    qualificationProof: string;
    cv: string;
  };
  deleteFlags?: {
    idProof: boolean;
    qualificationProof: boolean;
    cv: boolean;
  };
  handleDelete?: (field: "cv" | "idProof" | "qualificationProof") => void;
}

const Documents: React.FC<DocumentsProps> = ({
  register,
  existingDocuments = {
    idProof: "",
    qualificationProof: "",
    cv: "",
  },

  handleDelete,
}) => {
  const viewDocument = (url: string) => {
    if (url) {
      window.open(url, "_blank");
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* CV/Resume */}
        <div className="bg-[#F5F6F5] border border-[#1887A1]/20 rounded-xl p-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            CV/Resume
          </label>
          <div className="relative">
            <input
              {...register("cv")}
              type="file"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              accept=".pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              onKeyDown={(e) => {
                if (e.key === "Enter") e.preventDefault();
              }}
            />

            <div className="border-2 border-dashed border-[#1887A1] rounded-lg p-6 text-center hover:border-[#0D4C5B] transition-colors">
              <svg
                className="mx-auto h-12 w-12 text-[#1887A1]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <p className="mt-2 text-sm text-gray-600">
                Click to upload CV/Resume (PDF/DOC)
              </p>
            </div>
          </div>
          {existingDocuments?.cv && (
            <div className="mt-3 flex space-x-4">
              <button
                type="button"
                onClick={() => viewDocument(existingDocuments.cv)}
                className="text-[#1887A1] hover:text-[#0D4C5B] text-sm flex items-center"
              >
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
                View Current CV
              </button>
              <button
                type="button"
                onClick={() => handleDelete?.("cv")}
                className="text-red-600 hover:text-red-700 text-sm flex items-center"
              >
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                Delete Current CV
              </button>
            </div>
          )}
        </div>

        {/* ID Proof */}
        <div className="bg-[#F5F6F5] border border-[#1887A1]/20 rounded-xl p-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            ID Proof
          </label>
          <div className="relative">
            <input
              {...register("idProof")}
              type="file"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              accept="image/*,application/pdf"
              onKeyDown={(e) => {
                if (e.key === "Enter") e.preventDefault();
              }}
            />

            <div className="border-2 border-dashed border-[#1887A1] rounded-lg p-6 text-center hover:border-[#0D4C5B] transition-colors">
              <svg
                className="mx-auto h-12 w-12 text-[#1887A1]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <p className="mt-2 text-sm text-gray-600">Click to upload file</p>
            </div>
          </div>
          {existingDocuments?.idProof && (
            <div className="mt-3 flex space-x-4">
              <button
                type="button"
                onClick={() => viewDocument(existingDocuments.idProof)}
                className="text-[#1887A1] hover:text-[#0D4C5B] text-sm flex items-center"
              >
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
                View Current ID Proof
              </button>
              <button
                type="button"
                onClick={() => handleDelete?.("idProof")}
                className="text-red-600 hover:text-red-700 text-sm flex items-center"
              >
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                Delete Current ID Proof
              </button>
            </div>
          )}
        </div>

        {/* Qualification Proof */}
        <div className="bg-[#F5F6F5] border border-[#1887A1]/20 rounded-xl p-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Qualification Proof
          </label>
          <div className="relative">
            <input
              {...register("qualificationProof")}
              type="file"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              accept="image/*,application/pdf"
              onKeyDown={(e) => {
                if (e.key === "Enter") e.preventDefault();
              }}
            />

            <div className="border-2 border-dashed border-[#1887A1] rounded-lg p-6 text-center hover:border-[#0D4C5B] transition-colors">
              <svg
                className="mx-auto h-12 w-12 text-[#1887A1]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <p className="mt-2 text-sm text-gray-600">Click to upload file</p>
            </div>
          </div>
          {existingDocuments?.qualificationProof && (
            <div className="mt-3 flex space-x-4">
              <button
                type="button"
                onClick={() =>
                  viewDocument(existingDocuments.qualificationProof)
                }
                className="text-[#1887A1] hover:text-[#0D4C5B] text-sm flex items-center"
              >
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
                View Current Qualification Proof
              </button>
              <button
                type="button"
                onClick={() => handleDelete?.("qualificationProof")}
                className="text-red-600 hover:text-red-700 text-sm flex items-center"
              >
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                Delete Current Qualification Proof
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Documents;
