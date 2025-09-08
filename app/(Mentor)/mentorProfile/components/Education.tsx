import React from "react";
import { useFieldArray } from "react-hook-form";
import { EducationProps } from "../types";

const Education: React.FC<EducationProps> = ({ 
  register, 
  control, 
  errors, 
  educationFields, 
  appendEducation, 
  removeEducation 
}) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => appendEducation({ degree: "", institution: "", year: "" })}
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
          Add Education
        </button>
      </div>

      <div className="space-y-4">
        {educationFields.map((field, index) => (
          <div
            key={field.id}
            className="bg-[#F5F6F5] border border-[#1887A1]/20 rounded-xl p-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Degree *
                </label>
                <input
                  {...register(`education.${index}.degree`, {
                    required: "Degree is required",
                  })}
                  className="w-full px-4 py-3 rounded-lg border border-[#1887A1]/50 focus:border-[#1887A1] focus:ring-4 focus:ring-[#1887A1]/10 transition-all duration-200 bg-white"
                  type="text"
                  placeholder="Bachelor of Science"
                />
                {errors.education?.[index]?.degree && (
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
                    {errors.education[index].degree.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Institution *
                </label>
                <input
                  {...register(`education.${index}.institution`, {
                    required: "Institution is required",
                  })}
                  className="w-full px-4 py-3 rounded-lg border border-[#1887A1]/50 focus:border-[#1887A1] focus:ring-4 focus:ring-[#1887A1]/10 transition-all duration-200 bg-white"
                  type="text"
                  placeholder="University Name"
                />
                {errors.education?.[index]?.institution && (
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
                    {errors.education[index].institution.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Year *
                </label>
                <input
                  {...register(`education.${index}.year`, {
                    required: "Year is required",
                  })}
                  className="w-full px-4 py-3 rounded-lg border border-[#1887A1]/50 focus:border-[#1887A1] focus:ring-4 focus:ring-[#1887A1]/10 transition-all duration-200 bg-white"
                  type="text"
                  placeholder="2020"
                />
                {errors.education?.[index]?.year && (
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
                    {errors.education[index].year.message}
                  </p>
                )}
              </div>
            </div>
            {educationFields.length > 1 && (
              <div className="mt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => removeEducation(index)}
                  className="inline-flex items-center px-3 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200 text-sm font-medium"
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
                  Remove
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Education;