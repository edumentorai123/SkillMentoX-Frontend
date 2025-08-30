
"use client";
import { useState, useEffect } from "react";
import { useForm, useFieldArray, useWatch } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { CourseCategory, MentorFormData, MentorProfileResponse } from "./types";
import PersonalInfo from "./components/PersonalInfo";
import SocialLinks from "./components/SocialLinks";
import Education from "./components/Education";
import Certifications from "./components/Certifications";
import Courses from "./components/Courses";
import Documents from "./components/Documents";
import Navigation from "./components/Navigation";

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
      phoneNumber: "",
      gender: "",
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
  const [existingDocuments, setExistingDocuments] = useState({
    idProof: "",
    qualificationProof: "",
    cv: "",
  });
  const [deleteFlags, setDeleteFlags] = useState({
    idProof: false,
    qualificationProof: false,
    cv: false,
  });
  const [currentPage, setCurrentPage] = useState(0);

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
          phoneNumber: res.data.data.phoneNumber || "",
          gender: res.data.data.gender || "",
        };

        if (res.data.data.documents) {
          setExistingDocuments({
            idProof: res.data.data.documents.idProof || "",
            qualificationProof:
              res.data.data.documents.qualificationProof || "",
            cv: res.data.data.documents.cv || "",
          });
        }

        // ✅ auto submit prevent fix
        reset(profileData, {
          keepDefaultValues: true,
          keepDirty: false,
          keepTouched: false,
        });
      } catch (err: any) {
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

  const handleDelete = (field: "cv" | "idProof" | "qualificationProof") => {
    setDeleteFlags({ ...deleteFlags, [field]: true });
    setExistingDocuments({ ...existingDocuments, [field]: "" });
  };

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
      formData.append("phoneNumber", data.phoneNumber || "");
      formData.append("gender", data.gender || "");
      formData.append("linkedin", data.linkedin || "");
      formData.append("github", data.github || "");
      formData.append("portfolio", data.portfolio || "");
      formData.append("education", JSON.stringify(data.education));
      formData.append(
        "certifications",
        JSON.stringify(data.certifications.map((c) => c.value))
      );
      formData.append("courses", JSON.stringify(data.courses));

      if (data.idProof?.[0]) formData.append("idProof", data.idProof[0]);
      if (data.qualificationProof?.[0])
        formData.append("qualificationProof", data.qualificationProof[0]);
      if (data.cv?.[0]) formData.append("cv", data.cv[0]);

      // Append delete flags
      if (deleteFlags.idProof) formData.append("deleteIdProof", "true");
      if (deleteFlags.qualificationProof)
        formData.append("deleteQualificationProof", "true");
      if (deleteFlags.cv) formData.append("deleteCv", "true");

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
      setTimeout(() => setMessage(null), 500);
    }
  };

  const handleNext = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const pages = [
    {
      title: "Personal Information",
      icon: (
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
      ),
      content: (
        <PersonalInfo register={register} errors={errors} control={control} />
      ),
    },
    {
      title: "Social Links",
      icon: (
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
      ),
      content: (
        <SocialLinks register={register} errors={errors} control={control} />
      ),
    },
    {
      title: "Education",
      icon: (
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
      ),
      content: (
        <Education
          register={register}
          control={control}
          errors={errors}
          educationFields={educationFields}
          appendEducation={appendEducation}
          removeEducation={removeEducation}
        />
      ),
    },
    {
      title: "Certifications",
      icon: (
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
      ),
      content: (
        <Certifications
          register={register}
          control={control}
          errors={errors}
          certificationFields={certificationFields}
          appendCertification={appendCertification}
          removeCertification={removeCertification}
        />
      ),
    },
    {
      title: "Courses",
      icon: (
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
      ),
      content: (
        <Courses
          register={register}
          control={control}
          errors={errors}
          courseCategories={courseCategories}
          courseNames={courseNames}
          loadingCategories={loadingCategories}
          categoryValues={categoryValues}
          courseFields={courseFields}
          appendCourse={appendCourse}
          removeCourse={removeCourse}
        />
      ),
    },
    {
      title: "Document Uploads",
      icon: (
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
      ),
      content: (
        <Documents
          register={register}
          existingDocuments={existingDocuments}
          deleteFlags={deleteFlags}
          handleDelete={handleDelete}
        />
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-[#FFFFFF] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#1887A1] rounded-full mb-4">
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
          <h1 className="text-4xl font-bold text-[#0D4C5B] mb-2">
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
                  ? "bg-[#4AB8C1]/10 border-[#1887A1]/50 text-[#1887A1]"
                  : "bg-red-50 border-red-200 text-red-800"
              }`}
            >
              <div className="flex items-center">
                <div
                  className={`w-5 h-5 mr-3 ${
                    message.type === "success"
                      ? "text-[#1887A1]"
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
        <div className="bg-white rounded-2xl shadow-xl border border-[#1887A1]/20 p-8">
          {currentPage === pages.length - 1 ? (
            // ✅ Only last step inside <form>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-8 h-8 bg-[#1887A1] rounded-lg flex items-center justify-center">
                  {pages[currentPage].icon}
                </div>
                <h2 className="text-2xl font-semibold text-[#0D4C5B]">
                  {pages[currentPage].title}
                </h2>
              </div>
              <div className="min-h-[400px]">{pages[currentPage].content}</div>

              {/* Submit enabled only here */}
              <Navigation
                currentPage={currentPage}
                totalPages={pages.length}
                onPrevious={handlePrevious}
                onNext={handleNext}
                loadingCategories={loadingCategories}
              />
            </form>
          ) : (
            // ✅ Other steps without form
            <div className="space-y-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-8 h-8 bg-[#1887A1] rounded-lg flex items-center justify-center">
                  {pages[currentPage].icon}
                </div>
                <h2 className="text-2xl font-semibold text-[#0D4C5B]">
                  {pages[currentPage].title}
                </h2>
              </div>
              <div className="min-h-[400px]">{pages[currentPage].content}</div>

              {/* Only navigation */}
              <Navigation
                currentPage={currentPage}
                totalPages={pages.length}
                onPrevious={handlePrevious}
                onNext={handleNext}
                loadingCategories={loadingCategories}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MentorForm;
