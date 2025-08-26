"use client";
import React, { useEffect } from "react";
import { GraduationCap, BookOpen, Layers } from "lucide-react";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { updateField } from "@/redux/Slices/profileSlice";
import type { ProfileState } from "@/redux/Slices/profileSlice";

const courses = [
  "Web Development",
  "Data Science",
  "Mobile App Development",
  "UI/UX Design",
  "Digital Marketing",
  "Machine Learning",
  "Cybersecurity",
  "Cloud Computing",
  "DevOps",
  "Blockchain Development",
];

const educationLevels = [
  "High School",
  "Bachelor's Degree",
  "Master's Degree",
  "PhD",
  "Professional Certificate",
  "Self-Taught",
];

// 🔥 Course → Stacks Mapping
const courseStacks: Record<string, string[]> = {
  "Web Development": [
    "MERN",
    "MEAN",
    "Next.js",
    "Django",
    "Flask",
    "Spring Boot",
  ],
  "Data Science": ["Python", "R", "TensorFlow", "PyTorch", "Scikit-learn"],
  "Mobile App Development": ["React Native", "Flutter", "Swift", "Kotlin"],
  "UI/UX Design": ["Figma", "Adobe XD", "Sketch", "InVision"],
  "Digital Marketing": [
    "SEO",
    "Google Ads",
    "Facebook Ads",
    "Content Strategy",
  ],
  "Machine Learning": ["TensorFlow", "PyTorch", "Keras", "Scikit-learn"],
  Cybersecurity: ["Ethical Hacking", "Network Security", "Cryptography"],
  "Cloud Computing": ["AWS", "Azure", "Google Cloud", "Docker", "Kubernetes"],
  DevOps: ["CI/CD", "Jenkins", "Docker", "Kubernetes"],
  "Blockchain Development": ["Ethereum", "Solidity", "Hyperledger", "Web3.js"],
};

type UpdateFieldKeys = keyof Omit<ProfileState, "currentStep" | "goals">;

const Step3Details: React.FC = () => {
  const profile = useAppSelector((state) => state.profile);
  const dispatch = useAppDispatch();

  const {
    educationLevel = "",
    selectedCourse = "",
    selectedStack = "",
  } = profile || {};

  useEffect(() => {
    if (typeof window !== "undefined" && window.AOS) {
      window.AOS.refresh();
    }
  }, []);

  const handleInputChange = (field: UpdateFieldKeys, value: string) => {
    dispatch(updateField({ field, value }));
  };

  const availableStacks = selectedCourse
    ? courseStacks[selectedCourse] || []
    : [];

  return (
    <div className="bg-white rounded-2xl p-8 shadow-xl" data-aos="fade-left">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-[#0D4C5B] mb-2">
          Your Learning Journey
        </h2>
        <p className="text-gray-600">
          Tell us about your educational background and learning goals
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <label
            htmlFor="educationLevel"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            <GraduationCap className="inline w-4 h-4 mr-2" />
            Education Level *
          </label>
          <select
            id="educationLevel"
            value={educationLevel}
            onChange={(e) =>
              handleInputChange("educationLevel", e.target.value)
            }
            className="w-full px-4 py-3 border border-gray-300 rounded-xl
                     focus:outline-none focus:ring-2 focus:ring-[#1887A1] focus:border-transparent
                     transition-all duration-200 text-gray-900 bg-white"
            required
          >
            <option value="">Select your education level</option>
            {educationLevels.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </div>

        
        <div>
          <label
            htmlFor="selectedCourse"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            <BookOpen className="inline w-4 h-4 mr-2" />
            Course Interest *
          </label>
          <select
            id="selectedCourse"
            value={selectedCourse}
            onChange={(e) =>
              handleInputChange("selectedCourse", e.target.value)
            }
            className="w-full px-4 py-3 border border-gray-300 rounded-xl
                     focus:outline-none focus:ring-2 focus:ring-[#1887A1] focus:border-transparent
                     transition-all duration-200 text-gray-900 bg-white"
            required
          >
            <option value="">Select a course you&apos;re interested in</option>
            {courses.map((course) => (
              <option key={course} value={course}>
                {course}
              </option>
            ))}
          </select>
        </div>
 
        {availableStacks.length > 0 && (
          <div>
            <label
              htmlFor="selectedStack"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              <Layers className="inline w-4 h-4 mr-2" />
              Choose a Stack *
            </label>
            <select
              id="selectedStack"
              value={selectedStack}
              onChange={(e) =>
                handleInputChange("selectedStack", e.target.value)
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-xl
                       focus:outline-none focus:ring-2 focus:ring-[#1887A1] focus:border-transparent
                       transition-all duration-200 text-gray-900 bg-white"
              required
            >
              <option value="">Select a stack for {selectedCourse}</option>
              {availableStacks.map((stack) => (
                <option key={stack} value={stack}>
                  {stack}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      <div className="mt-8 p-4 bg-blue-50 rounded-xl border border-blue-200">
        <p className="text-sm text-blue-800">
          <span className="font-semibold">Note:</span> Fields marked with * are
          required to continue
        </p>
      </div>
    </div>
  );
};

export default Step3Details;
