"use client";
import React, { useEffect } from "react";
import {
  Edit,
  User,
  Mail,
  MapPin,
  Phone,
  GraduationCap,
  BookOpen,
  Users,
} from "lucide-react";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { setStep } from "@/redux/Slices/profileSlice";
import Image from "next/image";
import ProgressHeader from "./ProgressHeader";

const Step4Review: React.FC = () => {
  const profile = useAppSelector((state) => state.profile);
  const dispatch = useAppDispatch();


  const {
    name = "",
    email = "",
    location = "",
    phone = "",
    avatarPreview = null,
    educationLevel = "",
    selectedCategory = "",
    selectedStack = "",
  } = profile || {};

  useEffect(() => {
    if (typeof window !== "undefined" && window.AOS) {
      window.AOS.refresh();
    }
  }, []);

  const handleEditBasicInfo = () => {
    dispatch(setStep(2));
  };

  const handleEditDetails = () => {
    dispatch(setStep(3));
  };

  const getInitials = (fullName: string): string => {
    if (!fullName.trim()) return "U";
    const names = fullName.trim().split(" ");
    if (names.length === 1) return names[0].charAt(0).toUpperCase();
    return (
      names[0].charAt(0) + names[names.length - 1].charAt(0)
    ).toUpperCase();
  };

  const getGradientColors = (fullName: string) => {
    const colors = [
      "from-blue-400 to-blue-600",
      "from-purple-400 to-purple-600",
      "from-green-400 to-green-600",
      "from-pink-400 to-pink-600",
      "from-indigo-400 to-indigo-600",
      "from-yellow-400 to-yellow-600",
    ];
    const index = fullName.length % colors.length;
    return colors[index];
  };


  if (!profile) {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-xl">
        <ProgressHeader />
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 bg-gray-200 rounded mb-8"></div>
          <div className="space-y-6">
            {[1, 2].map((i) => (
              <div key={i} className="bg-gray-50 rounded-xl p-6">
                <div className="h-6 bg-gray-200 rounded mb-4"></div>
                <div className="space-y-3">
                  {[1, 2, 3].map((j) => (
                    <div key={j} className="h-4 bg-gray-200 rounded"></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-8 shadow-xl" data-aos="zoom-in">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-[#0D4C5B] mb-2">
          Review Your Profile
        </h2>
        <p className="text-gray-600">
          Please review your information before submitting
        </p>
      </div>

      <div className="space-y-6">
        {/* Avatar Section */}
        <div className="flex justify-center mb-8">
          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg">
            {avatarPreview ? (
              <Image
                src={avatarPreview}
                alt="Profile avatar"
                width={96}
                height={96}
                className="w-full h-full object-cover"
              />
            ) : (
              <div
                className={`w-full h-full bg-gradient-to-br ${getGradientColors(
                  name
                )} 
                    flex items-center justify-center text-white text-xl font-bold`}
              >
                {getInitials(name)}
              </div>
            )}
          </div>
        </div>

        {/* Basic Information Card */}
        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-[#0D4C5B] flex items-center">
              <User className="w-5 h-5 mr-2" />
              Basic Information
            </h3>
            <button
              onClick={handleEditBasicInfo}
              className="flex items-center space-x-1 text-[#1887A1] hover:text-[#0D4C5B] 
                        font-medium transition-colors duration-200 focus:outline-none 
                        focus:ring-2 focus:ring-[#1887A1] focus:ring-offset-2 rounded-lg px-2 py-1"
            >
              <Edit size={16} className="cursor-pointer" />
              <span className="cursor-pointer">Edit</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3">
              <User className="w-4 h-4 text-gray-500" />
              <div>
                <p className="text-sm font-medium text-gray-700">Full Name</p>
                <p className="text-gray-900">{name || "Not provided"}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Mail className="w-4 h-4 text-gray-500" />
              <div>
                <p className="text-sm font-medium text-gray-700">Email</p>
                <p className="text-gray-900">{email || "Not provided"}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <MapPin className="w-4 h-4 text-gray-500" />
              <div>
                <p className="text-sm font-medium text-gray-700">Location</p>
                <p className="text-gray-900">{location || "Not provided"}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Phone className="w-4 h-4 text-gray-500" />
              <div>
                <p className="text-sm font-medium text-gray-700">Phone</p>
                <p className="text-gray-900">{phone || "Not provided"}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Student Learning Details */}
        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-[#0D4C5B] flex items-center">
              <GraduationCap className="w-5 h-5 mr-2" />
              Learning Details
            </h3>
            <button
              onClick={handleEditDetails}
              className="flex items-center space-x-1 text-[#1887A1] hover:text-[#0D4C5B] 
                        font-medium transition-colors duration-200 focus:outline-none 
                        focus:ring-2 focus:ring-[#1887A1] focus:ring-offset-2 rounded-lg px-2 py-1"
            >
              <Edit size={16} className="cursor-pointer" />
              <span className="cursor-pointer">Edit</span>
            </button>
          </div>

          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <GraduationCap className="w-4 h-4 text-gray-500 mt-1" />
              <div>
                <p className="text-sm font-medium text-gray-700">
                  Education Level
                </p>
                <p className="text-gray-900">
                  {educationLevel || "Not provided"}
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <BookOpen className="w-4 h-4 text-gray-500 mt-1" />
              <div>
                <p className="text-sm font-medium text-gray-700">
                  Course Interest
                </p>
                <p className="text-gray-900">
                  {selectedCategory || "Not provided"} - {selectedStack || ""}
                </p>

              </div>
            </div>
          </div>
        </div>

        {/* Confirmation Message */}
        <div className="mt-8 p-6 bg-green-50 rounded-xl border border-green-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <Users className="w-4 h-4 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-green-800">
                Ready to get started!
              </h4>
              <p className="text-sm text-green-700 mt-1">
                Once you submit, we&apos;ll match you with the perfect mentors for
                your learning journey.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step4Review;
