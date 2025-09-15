import React from "react";
import { CoursesProps } from "../types";

const Courses: React.FC<CoursesProps> = ({
  register,
  errors,
  courseCategories,
  courseNames = {},
  loadingCategories,
  categoryValues,
  courseFields,
  appendCourse,
  removeCourse,
}) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => appendCourse({ category: "", courseName: "" })}
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
          Add Course
        </button>
      </div>

      <div className="space-y-4">
        {courseFields.map((field, index) => (
          <div
            key={field.id}
            className="bg-[#F5F6F5] border border-[#1887A1]/20 rounded-xl p-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  {...register(`courses.${index}.category`, {
                    required: "Category is required",
                  })}
                  className="w-full px-4 py-3 rounded-lg border border-[#1887A1]/50 focus:border-[#1887A1] focus:ring-4 focus:ring-[#1887A1]/10 transition-all duration-200 bg-white"
                >
                  {Object.keys(courseCategories || {}).map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                {errors.courses?.[index]?.category && (
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
                    {errors.courses[index].category.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Course Name *
                </label>
                <select
                  {...register(`courses.${index}.courseName`, {
                    required: "Course Name is required",
                  })}
                  className="w-full px-4 py-3 rounded-lg border border-[#1887A1]/50 focus:border-[#1887A1] focus:ring-4 focus:ring-[#1887A1]/10 transition-all duration-200 bg-white disabled:bg-gray-50 disabled:text-gray-400"
                  disabled={loadingCategories || !categoryValues?.[index]?.category}
                >
                  <option value="">Select Course</option>
                  {(courseNames[categoryValues?.[index]?.category] || []).map(
                    (course) => (
                      <option key={course} value={course}>
                        {course}
                      </option>
                    )
                  )}
                </select>
                {errors.courses?.[index]?.courseName && (
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
                    {errors.courses[index].courseName.message}
                  </p>
                )}
              </div>
            </div>
            {courseFields.length > 1 && (
              <div className="mt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => removeCourse(index)}
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

export default Courses;