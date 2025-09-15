"use client";
import React, { useEffect } from "react";
import { GraduationCap, BookOpen, Layers } from "lucide-react";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { updateField } from "@/redux/Slices/profileSlice";
import { courseCategories } from "../shared/courseCategories";

const educationLevels = [
  "High School",
  "Bachelor's Degree",
  "Master's Degree",
  "PhD",
  "Professional Certificate",
  "Self-Taught",
];

type UpdateFieldKeys =
  | "role"
  | "name"
  | "email"
  | "location"
  | "phone"
  | "avatarPreview"
  | "educationLevel"
  | "selectedCategory"
  | "selectedStack";

const Step3Details: React.FC = () => {
  const profile = useAppSelector((state) => state.profile);
  const dispatch = useAppDispatch();

  const {
    educationLevel = "",
    selectedCategory = "",
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

  const availableStacks: string[] =
    selectedCategory && courseCategories[selectedCategory]
      ? courseCategories[selectedCategory].Stacks ||
      courseCategories[selectedCategory].Languages ||
      []
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
            htmlFor="selectedCategory"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            <BookOpen className="inline w-4 h-4 mr-2" />
            Course Category *
          </label>
          <select
            id="selectedCategory"
            value={selectedCategory}
            onChange={(e) => {
              handleInputChange("selectedCategory", e.target.value);
              handleInputChange("selectedStack", "");
              localStorage.removeItem("selectedStack");
            }}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl
                      focus:outline-none focus:ring-2 focus:ring-[#1887A1] focus:border-transparent
                      transition-all duration-200 text-gray-900 bg-white"
            required
          >
            <option value="">Select a category</option>
            {["Full Stack Web Development"].map((category) => (
              <option key={category} value={category}>
                {category}
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
              Choose a Stack or Language *
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
              <option value="">
                Select a stack or language for {selectedCategory}
              </option>
              {availableStacks.map((stack) => (
                <option key={stack} value={stack}>
                  {stack}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

    </div>
  );
};

export default Step3Details;