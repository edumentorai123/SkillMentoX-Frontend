// pages/forgotPassword.tsx
"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Mail } from "lucide-react";

interface FormData {
  email: string;
}

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:9999";

const ForgotPassword: React.FC = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      email: "",
    },
  });

  const handleForgotPassword: SubmitHandler<FormData> = async (data) => {
    try {
      const response = await axios.post<{ message: string }>(
        `${API_URL}/api/auth/forgot-password`,
        { email: data.email }
      );
      toast.success(response.data.message);
      setTimeout(() => router.push("/loginForm"), 2000); // Redirect to login after 2 seconds
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Failed to send reset link"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-sans">
      <ToastContainer />
      <div className="w-full max-w-6xl mx-auto relative">
        <div className="grid lg:grid-cols-2 gap-0 bg-white rounded-3xl shadow-2xl overflow-hidden min-h-[600px]">
          <div className="bg-white p-8 lg:p-12 flex flex-col justify-center">
            <div className="max-w-md mx-auto w-full">
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Forgot Password
                </h1>
                <p className="text-gray-600">
                  Enter your email to receive a password reset link
                </p>
              </div>

              <form
                onSubmit={handleSubmit(handleForgotPassword)}
                className="space-y-6"
              >
                <div>
                  <div className="relative">
                    <input
                      type="email"
                      placeholder="Email Address"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: "Invalid email address",
                        },
                      })}
                      className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 hover:border-gray-400 hover:shadow-md focus:shadow-lg transform hover:scale-102"
                    />
                    <Mail
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                      size={20}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 px-6 rounded-full transition-all duration-500 transform hover:scale-105 shadow-lg hover:shadow-xl active:scale-95"
                >
                  Send Reset Link
                </button>
              </form>

              <p className="text-center text-sm text-gray-600 mt-5">
                Back to{" "}
                <Link
                  href="/loginForm"
                  className="text-teal-600 hover:text-teal-700 font-medium transition-all duration-300 hover:underline"
                >
                  Login
                </Link>
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-8 lg:p-12 flex flex-col justify-center relative overflow-hidden">
            <div className="absolute top-8 left-8 w-24 h-24 bg-purple-300 rounded-full opacity-30 transition-all duration-1000 ease-in-out transform hover:scale-110"></div>
            <div className="absolute top-16 left-16 w-16 h-16 bg-pink-300 rounded-lg opacity-40 transition-all duration-1000 ease-in-out transform hover:scale-110 rotate-45"></div>
            <div className="absolute bottom-8 right-8 w-32 h-32 bg-indigo-300 rounded-full opacity-20 transition-all duration-1000 ease-in-out transform hover:scale-110"></div>

            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-white mb-6">
                Reset Your Password
              </h2>
              <p className="text-purple-100 text-lg mb-8 leading-relaxed">
                Get back to your learning journey with a secure new password.
                We're here to help you every step of the way!
              </p>
              <div className="space-y-4">
                {[
                  "Secure account recovery",
                  "Quick and easy process",
                  "24/7 support available",
                ].map((text, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-purple-300 rounded-full transition-all duration-500 transform hover:scale-150"></div>
                    <span className="text-purple-100 transition-all duration-500">
                      {text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;