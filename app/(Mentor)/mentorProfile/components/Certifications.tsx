import React from "react";
import { useFieldArray } from "react-hook-form";
import { CertificationsProps } from "../types";

const Certifications: React.FC<CertificationsProps> = ({ 
  register, 
  control, 
  errors, 
  certificationFields, 
  appendCertification, 
  removeCertification 
}) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => appendCertification({ value: "" })}
          className="inline-flex items-center px-4 py-2 bg-[#1887A1] text-white rounded-lg hover:bg-[#0D4C5B] transition-all duration-200 text-sm font-medium"
        >
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          Add Certification
        </button>
      </div>

      <div className="space-y-3">
        {certificationFields.map((field, index) => (
          <div
            key={field.id}
            className="flex items-center space-x-4 bg-[#F5F6F5] border border-[#1887A1]/20 rounded-xl p-4"
          >
            <div className="flex-1">
              <input
                {...register(`certifications.${index}.value`, {
                  required: "Certification is required",
                })}
                className="w-full px-4 py-3 rounded-lg border border-[#1887A1]/50 focus:border-[#1887A1] focus:ring-4 focus:ring-[#1887A1]/10 transition-all duration-200 bg-white"
                type="text"
                placeholder="AWS Certified Solutions Architect"
              />
              {errors.certifications?.[index]?.value && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {errors.certifications[index].value.message}
                </p>
              )}
            </div>
            {certificationFields.length > 1 && (
              <button
                type="button"
                onClick={() => removeCertification(index)}
                className="flex-shrink-0 p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200"
              >
                <svg
                  className="w-5 h-5"
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
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Certifications;