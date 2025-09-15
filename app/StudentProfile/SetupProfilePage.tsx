"use client";
import React, { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import ProgressHeader from "./ProgressHeader";
import Step2BasicInfo from "./Step2BasicInfo";
import Step3Details from "./Step3Details";
import Step4Review from "./Step4Review";
import NavigationFooter from "./NavigationFooter";
import "aos/dist/aos.css";
import type { Aos } from "aos";
import axios from "axios";
import { setRole } from "@/redux/Slices/profileSlice";
import { useRouter } from "next/navigation";

declare global {
  interface Window {
    AOS?: Aos;
  }
}

const SetupProfilePage: React.FC = () => {
  const profile = useAppSelector((state) => state.profile);
  const dispatch = useAppDispatch();
  const [isInitializing, setIsInitializing] = useState(true);
  const router = useRouter()

  useEffect(() => {
    const initializeComponent = async () => {

      if (typeof window !== "undefined") {
        try {
          const AOSModule = await import("aos");
          AOSModule.default.init({
            duration: 800,
            once: true,
            offset: 40,
            easing: "ease-out-cubic",
          });
          window.AOS = AOSModule.default;
        } catch (error) {
          console.warn("Failed to load AOS:", error);
        }
      }

      if (profile?.role === null) {
        dispatch(setRole("student"));
      }

      setIsInitializing(false);
    };

    initializeComponent();
  }, [profile?.role, dispatch]);

  const getStepValidation = (): boolean => {
    if (!profile) return false;

    switch (profile.currentStep) {
      case 2:
        return !!(
          profile.name &&
          profile.email &&
          profile.location &&
          profile.phone
        );

      case 3:
        return !!(
          profile.educationLevel &&
          profile.selectedCategory &&
          profile.selectedStack
        );

      case 4:
        return true;

      default:
        return false;
    }
  };

  const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL as string;

  const handleProfileSubmit = async () => {
    if (!profile) return;

    try {
      const response = await axios.post(
        `${API_URL}/api/students/createprofile`,
        profile
      );
      console.log("Profile saved to DB:", response.data);
      alert(`Profile submitted successfully!\nName: ${profile.name}`);

      router.push("/subscription");
    } catch (error) {
      console.error("Failed to submit profile:", error);
      alert("Failed to submit profile. Please try again.");
    }
  };


  const renderStepContent = () => {
    if (!profile) return null;

    switch (profile.currentStep) {
      case 2:
        return <Step2BasicInfo />;
      case 3:
        return <Step3Details />;
      case 4:
        return <Step4Review />;
      default:
        return <Step2BasicInfo />;
    }
  };

  if (isInitializing || !profile || profile.role === null) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1887A1] mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-[#0D4C5B] mb-2">
            {isInitializing
              ? "Setting up your profile..."
              : "Loading profile..."}
          </h2>
          <p className="text-gray-600">
            Please wait while we prepare your personalized experience
          </p>
        </div>
      </div>
    );
  }

  const isStepValid = getStepValidation();

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-6">
        <ProgressHeader />

        <div className="transition-all duration-500 ease-in-out">
          {renderStepContent()}
        </div>

        <NavigationFooter
          isStepValid={isStepValid}
          onSubmit={handleProfileSubmit}
        />
      </div>
    </div>
  );
};

export default SetupProfilePage;
