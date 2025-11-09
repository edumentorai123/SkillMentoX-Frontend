"use client";

import React, { useEffect, useState, useRef } from "react";
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
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [isInitializing, setIsInitializing] = useState(true);
  const profileCheckExecuted = useRef(false);
  const router = useRouter();

  const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL as string;

  // Set default role on mount
  useEffect(() => {
    if (profile?.role === null) {
      dispatch(setRole("student"));
    }
  }, [dispatch, profile?.role]);

  // Initialize AOS
  useEffect(() => {
    const initializeAOS = async () => {
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
    };
    initializeAOS();
  }, []);

  useEffect(() => {
    const initializeComponent = async () => {
      const userId = auth.user?.id;
      const token = localStorage.getItem("token") || localStorage.getItem("accessToken") || localStorage.getItem("authToken");

      if (!userId || !token) {
        console.log("Missing userId or token, redirecting to login");
        router.push("/loginForm");
        setIsInitializing(false);
        return;
      }

      if (profileCheckExecuted.current) {
        console.log("Profile check already executed, skipping");
        setIsInitializing(false);
        return;
      }

      profileCheckExecuted.current = true;

      try {
        console.log("Checking if profile exists for userId:", userId);
        const response = await axios.get(
          `${API_URL}/api/students/getprofile/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.data.data) {
          console.log("Profile found, updating localStorage");
          const userData = response.data.data;
          localStorage.setItem("user", JSON.stringify(userData));
          const authData = JSON.parse(localStorage.getItem("auth") || "{}");
          localStorage.setItem(
            "auth",
            JSON.stringify({
              ...authData,
              hasProfile: true,
              isPremium: userData.isSubscribed || authData.isPremium || false,
            })
          );

          // Redirect based on subscription status
          if (userData.isSubscribed) {
            console.log("User is subscribed, redirecting to /Student");
            router.push("/Student");
          } else {
            console.log("User is not subscribed, redirecting to /subscription");
            router.push("/subscription");
          }
        }
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          console.log("Unauthorized, redirecting to login");
          localStorage.removeItem("token");
          localStorage.removeItem("auth");
          localStorage.removeItem("user");
          router.push("/loginForm");
        } else if (axios.isAxiosError(error) && error.response?.status === 404) {
          console.log("Profile not found - user needs to create profile");
        } else {
          console.error("Profile check error:", error);
          toast.error("Error checking profile. Please try again.", {
            position: "top-right",
            autoClose: 3000,
          });
        }
      } finally {
        setIsInitializing(false);
      }
    };

    initializeComponent();
  }, [auth.user?.id, dispatch, router, API_URL]);

  // Cleanup effect
  useEffect(() => {
    return () => {
      profileCheckExecuted.current = false;
    };
  }, []);

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
    // Avoid clearing all localStorage to preserve other keys
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
    localStorage.setItem("user", JSON.stringify({
      id: userData.id || userData.userId,
      email: userData.email,
      name: userData.name,
      role: userData.role || "student",
      isSubscribed: userData.isSubscribed || false,
    }));
  };

  const handleProfileSubmit = async () => {
    if (!profile) return;

    try {
      const userId = auth.user?.id;
      const token = localStorage.getItem("token") || localStorage.getItem("accessToken") || localStorage.getItem("authToken");

      if (!userId || !token) {
        toast.error("User not logged in. Please login again.", {
          position: "top-right",
          autoClose: 3000,
        });
        router.push("/loginForm");
        return;
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { currentStep, status, ...payload } = profile;

      console.log("Submitting profile with payload:", payload);

      const response = await dispatch(createProfileApi(payload)).unwrap();

      console.log("Profile creation response:", response);

      updateLocalStorage(response.data, token);

      dispatch({ type: "auth/setHasProfile", payload: true });

      // Verify profile creation before redirecting
      try {
        const verifyResponse = await axios.get(
          `${API_URL}/api/students/getprofile/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (verifyResponse.data.data) {
          console.log("Profile verified, redirecting to /subscription");
          toast.success(`Profile submitted successfully!\nName: ${profile.name}`, {
            position: "top-right",
            autoClose: 3000,
          });
          router.push("/subscription");
        } else {
          throw new Error("Profile verification failed");
        }
      } catch (verifyError) {
        if (axios.isAxiosError(verifyError) && verifyError.response?.status === 401) {
          console.log("Unauthorized during verification, redirecting to login");
          localStorage.removeItem("token");
          localStorage.removeItem("auth");
          localStorage.removeItem("user");
          router.push("/loginForm");
        } else {
          console.error("Failed to verify profile after submission:", verifyError);
          toast.error("Profile created but verification failed. Please try again.", {
            position: "top-right",
            autoClose: 3000,
          });
        }
      }
    } catch (error: unknown) {
      console.error("Full error object:", error);
      let errorMessage = "An unexpected error occurred";
      if (error instanceof AxiosError) {
        errorMessage = error.response?.data?.message || error.response?.data?.error || error.message;
      } else if (typeof error === 'string') {
        errorMessage = error;
      } else if (error && typeof error === 'object' && 'message' in error) {
        errorMessage = (error as { message: string }).message;
      }
      console.error("Failed to submit profile:", errorMessage);
      toast.error(`Failed to submit profile: ${errorMessage}`, {
        position: "top-right",
        autoClose: 5000,
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