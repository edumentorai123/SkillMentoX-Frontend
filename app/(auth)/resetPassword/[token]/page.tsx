// pages/resetPassword/[token].tsx
"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";

interface FormData {
  password: string;
  confirmPassword: string;
}

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:9999/api/auth";

const ResetPassword: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const router = useRouter();
  const { token } = useParams(); // Extract token from URL

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const password = watch("password");

  const handleResetPassword: SubmitHandler<FormData> = async (data) => {
    try {
      const response = await axios.post<{ message: string; token: string }>(
        `${API_URL}/reset-password/${token}`,
        {
          password: data.password,
          confirmPassword: data.confirmPassword,
        }
      );
      localStorage.setItem("token", response.data.token); // Store token
      toast.success(response.data.message);
      setTimeout(() => router.push("/loginForm"), 2000); // Redirect to dashboard
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to reset password");
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
                  Reset Password
                </h1>
                <p className="text-gray-600">
                  Enter your new password to reset your account
                </p>
              </div>

              <form
                onSubmit={handleSubmit(handleResetPassword)}
                className="space-y-6"
              >
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="New Password"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                      pattern: {
                        value: /^(?=.*[A-Za-z])(?=.*\d)/,
                        message:
                          "Password must contain at least one letter and one number",
                      },
                    })}
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 hover:border-gray-400 hover:shadow-md focus:shadow-lg transform hover:scale-102"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-all duration-300 hover:scale-110"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    {...register("confirmPassword", {
                      required: "Please confirm your password",
                      validate: (value) =>
                        value === password || "Passwords do not match",
                    })}
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 hover:border-gray-400 hover:shadow-md focus:shadow-lg transform hover:scale-102"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-all duration-300 hover:scale-110"
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 px-6 rounded-full transition-all duration-500 transform hover:scale-105 shadow-lg hover:shadow-xl active:scale-95"
                >
                  Reset Password
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
                Secure Your Account
              </h2>
              <p className="text-purple-100 text-lg mb-8 leading-relaxed">
                Set a strong new password to continue your learning journey with
                LearnHub. Your security is our priority!
              </p>
              <div className="space-y-4">
                {[
                  "Strong password protection",
                  "Secure account recovery",
                  "Trusted platform",
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

export default ResetPassword;