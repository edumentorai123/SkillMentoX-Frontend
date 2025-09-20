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
import axios, { AxiosError } from "axios";
import { setRole, createProfileApi } from "@/redux/Slices/profileSlice";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

declare global {
  interface Window {
    AOS?: Aos;
  }
}

// Define interface for userData
interface UserData {
  id?: string;
  userId?: string;
  email: string;
  name?: string;
  role?: string;
  _id?: string;
  isSubscribed?: boolean;
}

const SetupProfilePage: React.FC = () => {
  const profile = useAppSelector((state) => state.profile);
  const dispatch = useAppDispatch();
  const [isInitializing, setIsInitializing] = useState(true);
  const router = useRouter();

  const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL as string;

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

      // Check if profile already exists
      const storedUser = localStorage.getItem("user");
      const userId = storedUser ? JSON.parse(storedUser).id : null;
      const token = localStorage.getItem("token");

      if (userId && token) {
        try {
          const response = await axios.get(
            `${API_URL}/api/students/getprofile/${userId}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          if (response.data.data) {
            // Update localStorage with existing profile
            localStorage.setItem("user", JSON.stringify(response.data.data));
            const authData = JSON.parse(localStorage.getItem("auth") || "{}");
            localStorage.setItem(
              "auth",
              JSON.stringify({
                ...authData,
                hasProfile: true,
                isPremium: response.data.data.isSubscribed || authData.isPremium,
              })
            );
            // Navigate based on subscription status
            if (response.data.data.isSubscribed) {
              router.push("/Student");
            } else {
              router.push("/subscription");
            }
          }
        } catch (error) {
          console.error("Profile check error:", error);
        }
      }

      setIsInitializing(false);
    };

    initializeComponent();
  }, [profile?.role, dispatch, router, API_URL]); // Added API_URL to dependency array

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

  const updateLocalStorage = (userData: UserData, token: string) => {
    localStorage.clear();
    localStorage.setItem("token", token);
    localStorage.setItem(
      "auth",
      JSON.stringify({
        token,
        user: {
          id: userData.id || userData.userId,
          email: userData.email,
          firstName: userData.name ? userData.name.split(" ")[0] : "",
          lastName: userData.name ? userData.name.split(" ").slice(1).join(" ") : "",
          role: userData.role || "student",
        },
        hasProfile: !!userData._id,
        isPremium: userData.isSubscribed || false,
      })
    );
  };

  const handleProfileSubmit = async () => {
    if (!profile) return;

    try {
      const storedUser = localStorage.getItem("user");
      const userId = storedUser ? JSON.parse(storedUser).id : null;
      const token = localStorage.getItem("token");

      if (!userId || !token) {
        toast.error("User not logged in. Please login again.", {
          position: "top-right",
          autoClose: 3000,
        });
        router.push("/loginForm");
        return;
      }

      const payload = {
        ...profile,
        userId,
      };

      // Use createProfileApi thunk
      const response = await dispatch(createProfileApi(payload)).unwrap();

      console.log("Profile saved to DB:", response);

      // Update localStorage
      updateLocalStorage(response.data, token);

      toast.success(`Profile submitted successfully!\nName: ${profile.name}`, {
        position: "top-right",
        autoClose: 3000,
      });

      // Check subscription status
      const subscriptionResponse = await axios.get(
        `${API_URL}/api/subscription/status/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (subscriptionResponse.data.data.isSubscribed) {
        const authData = JSON.parse(localStorage.getItem("auth") || "{}");
        localStorage.setItem(
          "auth",
          JSON.stringify({
            ...authData,
            isPremium: true,
          })
        );
        router.push("/Student");
      } else {
        router.push("/subscription");
      }
    } catch (error: unknown) {
      const errorMessage =
        error instanceof AxiosError
          ? error.response?.data?.message || error.message
          : "An unexpected error occurred";
      console.error("Failed to submit profile:", errorMessage);
      toast.error("Failed to submit profile. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
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
        <ToastContainer />
      </div>
    </div>
  );
};

export default SetupProfilePage;