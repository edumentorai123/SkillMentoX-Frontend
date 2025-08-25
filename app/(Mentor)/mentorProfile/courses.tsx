"use client";
import { useFormContext, useFieldArray, useWatch } from "react-hook-form";
import { useEffect, useState } from "react";
import axios from "axios";

interface CourseCategory {
  [key: string]: {
    Stacks?: string[];
    Languages?: string[];
  };
}

interface MentorFormData {
  courses: { category: string; courseName: string }[];
}

const Courses = () => {
  const { control, register, setValue, formState: { errors } } = useFormContext<MentorFormData>();
  const { fields, append, remove } = useFieldArray<MentorFormData, "courses">({
    control,
    name: "courses",
  });
  const categoryValues = useWatch({ control, name: "courses" });
  const [courseCategories, setCourseCategories] = useState<CourseCategory>({});
  const [courseNames, setCourseNames] = useState<{ [key: string]: string[] }>({});
  const [loadingCategories, setLoadingCategories] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoadingCategories(true);
      try {
        // Fetch mentor profile to load existing courses
        const profileRes = await axios.get<{ success: boolean; data: { courses: { category: string; courseName: string }[] } }>(
          "http://localhost:9999/api/mentor/profile",
          { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        );
        if (profileRes.data.success && profileRes.data.data.courses) {
          // Directly set the courses array using setValue
          setValue("courses", profileRes.data.data.courses);
        }

        // Fetch course categories
        const categoriesRes = await axios.get<{ success: boolean; data: CourseCategory }>(
          "http://localhost:9999/api/mentor/courseCategories"
        );
        setCourseCategories(categoriesRes.data.data);
        const courseNamesMap: { [key: string]: string[] } = {};
        Object.keys(categoriesRes.data.data).forEach((category) => {
          const categoryData = categoriesRes.data.data[category];
          courseNamesMap[category] = [
            ...(categoryData.Stacks || []),
            ...(categoryData.Languages || [])
          ].filter((name): name is string => name !== undefined && name !== null);
        });
        console.log("Course Names Map:", courseNamesMap); // Debug log
        setCourseNames(courseNamesMap);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoadingCategories(false);
      }
    };
    fetchData();
  }, [setValue]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900 flex items-center">
          <span className="mr-2">📚</span>
          Courses
        </h2>
        <button
          type="button"
          onClick={() => append({ category: "", courseName: "" })}
          className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg hover:from-purple-600 hover:to-pink-700 transition-all duration-200 text-sm font-medium"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Course
        </button>
      </div>
      <div className="space-y-4">
        {fields.map((field, index) => (
          <div key={field.id} className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  {...register(`courses.${index}.category`, { required: "Category is required" })}
                  className="w-full px-4 py-3 rounded-lg border border-purple-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all duration-200 bg-white"
                >
                  <option value="">Select Category</option>
                  {Object.keys(courseCategories).map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                {errors.courses?.[index]?.category && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
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
                  {...register(`courses.${index}.courseName`, { required: "Course Name is required" })}
                  className="w-full px-4 py-3 rounded-lg border border-purple-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all duration-200 bg-white disabled:bg-gray-50 disabled:text-gray-400"
                  disabled={loadingCategories || !categoryValues[index]?.category}
                >
                  <option value="">Select Course</option>
                  {(courseNames[categoryValues[index]?.category] || []).map((course) => (
                    <option key={course} value={course}>
                      {course}
                    </option>
                  ))}
                </select>
                {errors.courses?.[index]?.courseName && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
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
            {fields.length > 1 && (
              <div className="mt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="inline-flex items-center px-3 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200 text-sm font-medium"
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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