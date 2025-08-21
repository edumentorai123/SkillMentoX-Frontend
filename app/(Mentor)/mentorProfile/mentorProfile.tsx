"use client";

import { useState, useEffect } from "react";
import { useForm, useFieldArray, useWatch } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";

interface CourseCategory {
  [key: string]: {
    Stacks?: string[];
    Languages?: string[];
  };
}

interface MentorFormData {
  fullName: string;
  headline: string;
  bio: string;
  currentRole: string;
  company: string;
  yearsOfExperience?: number;
  email: string;
  linkedin: string;
  github: string;
  portfolio: string;
  education: { degree: string; institution: string; year: string }[];
  certifications: { value: string }[];
  courses: { category: string; courseName: string }[];
  profilePicture?: FileList;
  idProof?: FileList;
  qualificationProof?: FileList;
}

interface MentorProfileResponse {
  success: boolean;
  data: Omit<MentorFormData, "certifications"> & { certifications: string[] };
}

const MentorForm = () => {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<MentorFormData>({
    defaultValues: {
      fullName: "",
      headline: "",
      bio: "",
      currentRole: "",
      company: "",
      yearsOfExperience: undefined,
      email: "",
      linkedin: "",
      github: "",
      portfolio: "",
      education: [{ degree: "", institution: "", year: "" }],
      certifications: [{ value: "" }],
      courses: [{ category: "", courseName: "" }],
    },
  });

  const {
    fields: educationFields,
    append: appendEducation,
    remove: removeEducation,
  } = useFieldArray<MentorFormData, "education">({
    control,
    name: "education",
  });

  const {
    fields: certificationFields,
    append: appendCertification,
    remove: removeCertification,
  } = useFieldArray<MentorFormData, "certifications">({
    control,
    name: "certifications",
  });

  const {
    fields: courseFields,
    append: appendCourse,
    remove: removeCourse,
  } = useFieldArray<MentorFormData, "courses">({
    control,
    name: "courses",
  });

  const [courseCategories, setCourseCategories] = useState<CourseCategory>({});
  const [courseNames, setCourseNames] = useState<{ [key: string]: string[] }>(
    {}
  );
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const categoryValues = useWatch({ control, name: "courses" });

  useEffect(() => {
    const fetchCourseCategories = async () => {
      setLoadingCategories(true);
      try {
        const res = await axios.get<{ success: boolean; data: CourseCategory }>(
          "http://localhost:9999/api/mentor/courseCategories"
        );
        setCourseCategories(res.data.data);

        const courseNamesMap: { [key: string]: string[] } = {};
        Object.keys(res.data.data).forEach((category) => {
          courseNamesMap[category] = Object.values(
            res.data.data[category]
          ).flat();
        });
        setCourseNames(courseNamesMap);
      } catch (err) {
        console.error("Error fetching course categories:", err);
        setMessage({
          type: "error",
          text: "Failed to fetch course categories",
        });
      } finally {
        setLoadingCategories(false);
      }
    };
    fetchCourseCategories();
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found");
          setMessage({
            type: "error",
            text: "Please log in to view your profile",
          });
          return;
        }
        const res = await axios.get<MentorProfileResponse>(
          "http://localhost:9999/api/mentor/profile",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const profileData: MentorFormData = {
          ...res.data.data,
          certifications: Array.isArray(res.data.data.certifications)
            ? res.data.data.certifications.map((c: string) => ({ value: c }))
            : [{ value: "" }],
          education: Array.isArray(res.data.data.education)
            ? res.data.data.education
            : [{ degree: "", institution: "", year: "" }],
          courses: Array.isArray(res.data.data.courses)
            ? res.data.data.courses
            : [{ category: "", courseName: "" }],
        };
        reset(profileData);
      } catch (err: any) {
        console.error("Error fetching profile:", err);
        if (err.response?.status === 404) {
          setMessage({
            type: "error",
            text: "Profile not found. Please create a profile.",
          });
        } else {
          setMessage({
            type: "error",
            text:
              err.response?.data?.message ||
              "An error occurred while fetching profile",
          });
        }
      }
    };
    fetchProfile();
  }, [reset]);

  const onSubmit = async (data: MentorFormData) => {
    try {
      const isValid = data.courses.every((course, index) => {
        const category = course.category;
        const courseName = course.courseName;
        if (category && courseName) {
          const availableCourses = courseNames[category] || [];
          if (!availableCourses.includes(courseName)) {
            setMessage({
              type: "error",
              text: `Course "${courseName}" is not valid for category "${category}"`,
            });
            return false;
          }
        }
        return true;
      });

      if (!isValid) {
        return; // Stop submission if validation fails
      }

      const formData = new FormData();
      formData.append("fullName", data.fullName);
      formData.append("headline", data.headline);
      formData.append("bio", data.bio || "");
      formData.append("currentRole", data.currentRole || "");
      formData.append("company", data.company || "");
      if (data.yearsOfExperience !== undefined)
        formData.append("yearsOfExperience", data.yearsOfExperience.toString());
      formData.append("email", data.email);
      formData.append("linkedin", data.linkedin || "");
      formData.append("github", data.github || "");
      formData.append("portfolio", data.portfolio || "");
      formData.append("education", JSON.stringify(data.education));
      formData.append(
        "certifications",
        JSON.stringify(data.certifications.map((c) => c.value))
      );
      formData.append("courses", JSON.stringify(data.courses));

      if (data.profilePicture?.[0])
        formData.append("profilePicture", data.profilePicture[0]);
      if (data.idProof?.[0]) formData.append("idProof", data.idProof[0]);
      if (data.qualificationProof?.[0])
        formData.append("qualificationProof", data.qualificationProof[0]);

      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:9999/api/mentor/updateProfile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setMessage({ type: "success", text: res.data.message });
      
      setTimeout(() => {
        router.push("/mentorHome");
      }, 1500);
    } catch (err: any) {
      setMessage({
        type: "error",
        text: err.response?.data?.message || "An error occurred",
      });
      setTimeout(() => setMessage(null), 1000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mb-4">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Mentor Profile
          </h1>
          <p className="text-lg text-gray-600">
            Build your professional profile to connect with mentees
          </p>
        </div>

        {/* Alert Messages */}
        {message && (
          <div className="mb-8">
            <div
              className={`relative px-6 py-4 rounded-xl border ${
                message.type === "success"
                  ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                  : "bg-red-50 border-red-200 text-red-800"
              }`}
            >
              <div className="flex items-center">
                <div
                  className={`w-5 h-5 mr-3 ${
                    message.type === "success"
                      ? "text-emerald-600"
                      : "text-red-600"
                  }`}
                >
                  {message.type === "success" ? (
                    <svg fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
                <span className="font-medium">{message.text}</span>
              </div>
            </div>
          </div>
        )}

        {/* Main Form Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Personal Information Section */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold text-gray-900">
                  Personal Information
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    {...register("fullName", {
                      required: "Full name is required",
                      minLength: { value: 3, message: "Minimum 3 characters" },
                      maxLength: {
                        value: 100,
                        message: "Maximum 100 characters",
                      },
                    })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 bg-white/50"
                    type="text"
                    placeholder="Enter your full name"
                  />
                  {errors.fullName && (
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
                      {errors.fullName.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Invalid email",
                      },
                    })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 bg-white/50"
                    type="email"
                    placeholder="your.email@example.com"
                  />
                  {errors.email && (
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
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Professional Headline *
                </label>
                <input
                  {...register("headline", {
                    required: "Headline is required",
                    maxLength: {
                      value: 150,
                      message: "Maximum 150 characters",
                    },
                  })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 bg-white/50"
                  type="text"
                  placeholder="e.g., Senior Full-Stack Developer | React Expert | Mentor"
                />
                {errors.headline && (
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
                    {errors.headline.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Professional Bio
                </label>
                <textarea
                  {...register("bio", {
                    maxLength: {
                      value: 1000,
                      message: "Maximum 1000 characters",
                    },
                  })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 bg-white/50 resize-none"
                  rows={4}
                  placeholder="Tell us about your professional journey, expertise, and what you're passionate about mentoring..."
                />
                {errors.bio && (
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
                    {errors.bio.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Role
                  </label>
                  <input
                    {...register("currentRole")}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 bg-white/50"
                    type="text"
                    placeholder="Senior Developer"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company
                  </label>
                  <input
                    {...register("company")}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 bg-white/50"
                    type="text"
                    placeholder="Tech Company Inc."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Years of Experience
                  </label>
                  <input
                    {...register("yearsOfExperience", {
                      min: { value: 0, message: "Must be 0 or more" },
                      max: { value: 50, message: "Maximum 50 years" },
                    })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 bg-white/50"
                    type="number"
                    placeholder="5"
                  />
                  {errors.yearsOfExperience && (
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
                      {errors.yearsOfExperience.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Social Links Section */}
            <div className="space-y-6 border-t border-gray-100 pt-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold text-gray-900">
                  Social Links
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    LinkedIn
                  </label>
                  <input
                    {...register("linkedin", {
                      pattern: {
                        value: /^https?:\/\/(www\.)?linkedin\.com\//,
                        message: "Invalid LinkedIn URL",
                      },
                    })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 bg-white/50"
                    type="url"
                    placeholder="https://linkedin.com/in/yourprofile"
                  />
                  {errors.linkedin && (
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
                      {errors.linkedin.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    GitHub
                  </label>
                  <input
                    {...register("github", {
                      pattern: {
                        value: /^https?:\/\/(www\.)?github\.com\//,
                        message: "Invalid GitHub URL",
                      },
                    })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 bg-white/50"
                    type="url"
                    placeholder="https://github.com/yourusername"
                  />
                  {errors.github && (
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
                      {errors.github.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Portfolio
                  </label>
                  <input
                    {...register("portfolio", {
                      pattern: {
                        value: /^https?:\/\/.*/,
                        message: "Invalid URL",
                      },
                    })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 bg-white/50"
                    type="url"
                    placeholder="https://yourportfolio.com"
                  />
                  {errors.portfolio && (
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
                      {errors.portfolio.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Education Section */}
            <div className="space-y-6 border-t border-gray-100 pt-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                      />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-900">
                    Education
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    appendEducation({ degree: "", institution: "", year: "" })
                  }
                  className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg hover:from-emerald-600 hover:to-teal-700 transition-all duration-200 text-sm font-medium"
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
                    className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-6"
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
                          className="w-full px-4 py-3 rounded-lg border border-emerald-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all duration-200 bg-white"
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
                          className="w-full px-4 py-3 rounded-lg border border-emerald-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all duration-200 bg-white"
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
                          className="w-full px-4 py-3 rounded-lg border border-emerald-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all duration-200 bg-white"
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

            {/* Certifications Section */}
            <div className="space-y-6 border-t border-gray-100 pt-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-orange-600 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                      />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-900">
                    Certifications
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => appendCertification({ value: "" })}
                  className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-lg hover:from-amber-600 hover:to-orange-700 transition-all duration-200 text-sm font-medium"
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
                    className="flex items-center space-x-4 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-4"
                  >
                    <div className="flex-1">
                      <input
                        {...register(`certifications.${index}.value`, {
                          required: "Certification is required",
                        })}
                        className="w-full px-4 py-3 rounded-lg border border-amber-200 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 transition-all duration-200 bg-white"
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

            {/* Courses Section */}
            <div className="space-y-6 border-t border-gray-100 pt-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-900">
                    Courses
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => appendCourse({ category: "", courseName: "" })}
                  className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg hover:from-purple-600 hover:to-pink-700 transition-all duration-200 text-sm font-medium"
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
                    className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-6"
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
                          className="w-full px-4 py-3 rounded-lg border border-purple-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all duration-200 bg-white disabled:bg-gray-50 disabled:text-gray-400"
                          disabled={
                            loadingCategories ||
                            !categoryValues[index]?.category
                          }
                        >
                          <option value="">Select Course</option>
                          {(
                            courseNames[categoryValues[index]?.category] || []
                          ).map((course) => (
                            <option key={course} value={course}>
                              {course}
                            </option>
                          ))}
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

            {/* File Uploads Section */}
            <div className="space-y-6 border-t border-gray-100 pt-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold text-gray-900">
                  Document Uploads
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                    />
                    <div className="border-2 border-dashed border-cyan-300 rounded-lg p-6 text-center hover:border-cyan-400 transition-colors">
                      <svg
                        className="mx-auto h-12 w-12 text-cyan-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <p className="mt-2 text-sm text-gray-600">
                        Click to upload image
                      </p>
                    </div>
                  </div>
                </div>

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
                    />
                    <div className="border-2 border-dashed border-cyan-300 rounded-lg p-6 text-center hover:border-cyan-400 transition-colors">
                      <svg
                        className="mx-auto h-12 w-12 text-cyan-400"
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
                        Click to upload file
                      </p>
                    </div>
                  </div>
                </div>

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
                    />
                    <div className="border-2 border-dashed border-cyan-300 rounded-lg p-6 text-center hover:border-cyan-400 transition-colors">
                      <svg
                        className="mx-auto h-12 w-12 text-cyan-400"
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
                        Click to upload file
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="border-t border-gray-100 pt-8">
              <button
                type="submit"
                className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-indigo-700 text-white text-lg font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-800 focus:outline-none focus:ring-4 focus:ring-blue-500/30 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                disabled={loadingCategories}
              >
                {loadingCategories ? (
                  <div className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Loading...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Save Profile
                  </div>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MentorForm;
