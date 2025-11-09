"use client";

import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios, { AxiosError } from "axios";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { setCredentials } from "@/redux/Slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";

interface FormData {
  email: string;
  password: string;
}

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: "student" | "mentor" | "admin" | null;
}

interface ErrorResponse {
  message?: string;
}

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:9999/api/auth";


const LoginForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const token = useSelector((state: RootState) => state.auth.token);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLogin: SubmitHandler<FormData> = async (data) => {
    try {
      const response = await axios.post<{
        message: string;
        token: string;
        user: User;
      }>(`${API_URL}/login`, { email: data.email, password: data.password });

      toast.success(response.data.message);

      dispatch(
        setCredentials({
          token: response.data.token,
          user: response.data.user,
        })
      );

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem(
        "userName",
        `${response.data.user.firstName} ${response.data.user.lastName}`
      );
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ErrorResponse>;
        toast.error(axiosError.response?.data?.message || "Login failed");
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };

  useEffect(() => {
    if (token && user && user.role) {
      const timer = setTimeout(() => {
        const role = user.role;
        if (role === "student") {
          router.push("/StudentHome");
        } else if (role === "mentor") {
          router.push("/mentorHome");
        } else if (role === "admin") {
          router.push("/Admin");
        } else {
          router.push("/registerForm");
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [user, token, router]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-sans">
      <ToastContainer />
      <div className="w-full max-w-6xl mx-auto relative">
        <div className="grid lg:grid-cols-2 gap-0 bg-white rounded-3xl shadow-2xl overflow-hidden min-h-[600px]">
          <div className="bg-white p-8 lg:p-12 flex flex-col justify-center">
            <div className="max-w-md mx-auto w-full">
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Welcome back!
                </h1>
                <p className="text-gray-600">
                  Sign in to continue your learning journey
                </p>
              </div>

              <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">
                <div>
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 hover:border-gray-400 hover:shadow-md focus:shadow-lg transform hover:scale-102"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
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

                <div className="flex items-center justify-between">
                  <div className="flex items-center"></div>
                  <Link
                    href="/forgotPassword"
                    className="text-sm text-teal-600 hover:text-teal-700 font-medium transition-all duration-300 hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 px-6 rounded-full transition-all duration-500 transform hover:scale-105 shadow-lg hover:shadow-xl active:scale-95"
                >
                  Log in
                </button>
              </form>
              <p className="text-center text-sm text-gray-600 mt-5">
                Don&apos;t have an account?{" "}
                <Link
                  href="/registerForm"
                  className="text-teal-600 hover:text-teal-700 font-medium transition-all duration-300 hover:underline"
                >
                  Sign Up here
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
                Welcome Back to SkillMentroX
              </h2>
              <p className="text-purple-100 text-lg mb-8 leading-relaxed">
                Continue your learning journey with personalized courses and
                expert guidance. We&apos;re excited to have you back!
              </p>

              <div className="space-y-4">
                {[
                  "Continue where you left off",
                  "Track your progress",
                  "Access premium content",
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

export default LoginForm;
