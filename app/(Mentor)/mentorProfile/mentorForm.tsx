"use client";
import { useState, useEffect } from "react";
import { useForm, useFieldArray, FormProvider } from "react-hook-form";
import { useRouter } from "next/navigation";
import axios from "axios";
import PersonalInfo from "./personalInfo";
import SocialLinks from "./socialLinks";
import Education from "./education";
import Certifications from "./certifications";
import Courses from "./courses";
import Documents from "./documents";

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
  phoneNumber: string;
  gender: string;
  linkedin: string;
  github: string;
  portfolio: string;
  education: { degree: string; institution: string; year: string }[];
  certifications: { value: string }[];
  courses: { category: string; courseName: string }[];
  profilePicture?: FileList;
  idProof?: FileList;
  qualificationProof?: FileList;
  cv?: FileList;
}

interface MentorProfileResponse {
  success: boolean;
  data: Omit<MentorFormData, "certifications"> & {
    certifications: string[];
    documents: {
      idProof?: string;
      qualificationProof?: string;
      cv?: string;
    };
  };
}

const MentorForm = () => {
  const router = useRouter();
  const methods = useForm<MentorFormData>({
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
  const { register, control, handleSubmit, reset, trigger } = methods;

  const {
    fields: educationFields,
    append: appendEducation,
    remove: removeEducation,
  } = useFieldArray<MentorFormData, "education">({ control, name: "education" });

  const {
    fields: certificationFields,
    append: appendCertification,
    remove: removeCertification,
  } = useFieldArray<MentorFormData, "certifications">({ control, name: "certifications" });

  const {
    fields: courseFields,
    append: appendCourse,
    remove: removeCourse,
  } = useFieldArray<MentorFormData, "courses">({ control, name: "courses" });

  const [courseCategories, setCourseCategories] = useState<CourseCategory>({});
  const [courseNames, setCourseNames] = useState<{ [key: string]: string[] }>({});
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [existingDocuments, setExistingDocuments] = useState({
    idProof: "",
    qualificationProof: "",
    cv: "",
    profilePicture: "",
  });
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { id: 0, name: "Personal Info", icon: "👤" },
    { id: 1, name: "Social Links", icon: "🔗" },
    { id: 2, name: "Education", icon: "🎓" },
    { id: 3, name: "Certifications", icon: "📜" },
    { id: 4, name: "Courses", icon: "📚" },
    { id: 5, name: "Documents", icon: "📁" },
  ];

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
          courseNamesMap[category] = Object.values(res.data.data[category]).flat();
        });
        setCourseNames(courseNamesMap);
      } catch (err) {
        console.error("Error fetching course categories:", err);
        setMessage({ type: "error", text: "Failed to fetch course categories" });
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
          setMessage({ type: "error", text: "Please log in to view your profile" });
          return;
        }
        const res = await axios.get<MentorProfileResponse>(
          "http://localhost:9999/api/mentor/profile",
          { headers: { Authorization: `Bearer ${token}` } }
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
            qualificationProof: res.data.data.documents.qualificationProof || "",
            cv: res.data.data.documents.cv || "",
            profilePicture:
              typeof res.data.data.profilePicture === "string"
                ? res.data.data.profilePicture
                : res.data.data.profilePicture?.[0]?.name || "",
          });
        }
        reset(profileData);
      } catch (err: any) {
        console.error("Error fetching profile:", err);
        if (err.response?.status === 404) {
          setMessage({ type: "error", text: "Profile not found. Please create a profile." });
        } else {
          setMessage({
            type: "error",
            text: err.response?.data?.message || "An error occurred while fetching profile",
          });
        }
      }
    };
    fetchProfile();
  }, [reset]);

  const validateCurrentTab = async () => {
    let fieldsToValidate = [];
    switch (activeTab) {
      case 0:
        fieldsToValidate = ["fullName", "email", "headline"];
        break;
      case 1:
        fieldsToValidate = ["linkedin", "github", "portfolio"];
        break;
      case 2:
        fieldsToValidate = ["education"];
        break;
      case 3:
        fieldsToValidate = ["certifications"];
        break;
      case 4:
        fieldsToValidate = ["courses"];
        break;
      case 5:
        return true;
      default:
        return true;
    }
    const result = await trigger(fieldsToValidate as any);
    return result;
  };

  const handleNext = async () => {
    const isValid = await validateCurrentTab();
    if (isValid && activeTab < tabs.length - 1) setActiveTab(activeTab + 1);
  };

  const handlePrevious = () => {
    if (activeTab > 0) setActiveTab(activeTab - 1);
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
      if (!isValid) return;

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
      formData.append("certifications", JSON.stringify(data.certifications.map((c) => c.value)));
      formData.append("courses", JSON.stringify(data.courses));
      if (data.profilePicture?.[0]) formData.append("profilePicture", data.profilePicture[0]);
      if (data.idProof?.[0]) formData.append("idProof", data.idProof[0]);
      if (data.qualificationProof?.[0]) formData.append("qualificationProof", data.qualificationProof[0]);
      if (data.cv?.[0]) formData.append("cv", data.cv[0]);

      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:9999/api/mentor/updateProfile",
        formData,
        { headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" } }
      );
      setMessage({ type: "success", text: res.data.message });
      setTimeout(() => router.push("/mentorHome"), 1500);
    } catch (err: any) {
      setMessage({ type: "error", text: err.response?.data?.message || "An error occurred" });
      setTimeout(() => setMessage(null), 1000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Mentor Profile</h1>
          <p className="text-lg text-gray-600">Build your professional profile to connect with mentees</p>
        </div>
        {message && (
          <div className="mb-6">
            <div
              className={`relative px-6 py-4 rounded-xl border ${
                message.type === "success" ? "bg-emerald-50 border-emerald-200 text-emerald-800" : "bg-red-50 border-red-200 text-red-800"
              }`}
            >
              <div className="flex items-center">
                <div
                  className={`w-5 h-5 mr-3 ${message.type === "success" ? "text-emerald-600" : "text-red-600"}`}
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
        <div className="mb-8">
          <div className="flex overflow-x-auto pb-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-shrink-0 px-4 py-2 mr-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeTab === tab.id ? "bg-blue-100 text-blue-700 shadow-sm" : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.name}
              </button>
            ))}
          </div>
        </div>
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              {activeTab === 0 && <PersonalInfo />}
              {activeTab === 1 && <SocialLinks />}
              {activeTab === 2 && <Education />}
              {activeTab === 3 && <Certifications />}
              {activeTab === 4 && <Courses />}
              {activeTab === 5 && <Documents />}
              <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
                <button
                  type="button"
                  onClick={handlePrevious}
                  className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                    activeTab === 0 ? "invisible" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                  disabled={activeTab === 0}
                >
                  Previous
                </button>
                {activeTab < tabs.length - 1 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white text-sm font-medium rounded-xl hover:from-blue-700 hover:to-indigo-800 focus:outline-none focus:ring-4 focus:ring-blue-500/30 transition-all duration-200"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-700 text-white text-sm font-medium rounded-xl hover:from-green-700 hover:to-emerald-800 focus:outline-none focus:ring-4 focus:ring-green-500/30 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={loadingCategories}
                  >
                    {loadingCategories ? (
                      <div className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Loading...
                      </div>
                    ) : (
                      "Save Profile"
                    )}
                  </button>
                )}
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
};

export default MentorForm;