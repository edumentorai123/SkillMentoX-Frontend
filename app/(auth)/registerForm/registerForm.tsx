"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Eye, EyeOff, User, BookOpen, Mail, CheckCircle } from "lucide-react";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
}

interface OTPResponse {
  message: string;
  userId: string;
  role?: string;
}

interface VerifyOTPResponse {
  message: string;
  token: string;
  user: {
    id: string;
    email: string;
    firstName: string;
    role: string;
  };
}

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:9999/api/auth";

const RegisterForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showOTPField, setShowOTPField] = useState<boolean>(false);
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>("");

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<FormData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      role: "",
    },
  });

  const email = watch("email");
  const role = watch("role");

  const handleSignUp: SubmitHandler<FormData> = async () => {
    if (!isVerified) {
      toast.error("Please verify your email first");
      return;
    }
    toast.success("Registration completed successfully!");
    router.push("/loginForm");
  };

  const handleVerifyEmail = async () => {
    if (!email || !role) {
      toast.error("Please fill in email and select a role");
      return;
    }

    try {
      const response = await axios.post<OTPResponse>(`${API_URL}/register`, {
        email,
        firstName: watch("firstName"),
        lastName: watch("lastName"),
        password: watch("password"),
        role,
      });

      setUserId(response.data.userId);
      setShowOTPField(true);
      toast.success("Verification code sent to your email!");
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Failed to send verification code"
      );
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleVerifyOTP = async () => {
    const otpCode = otp.join("");
    if (otpCode.length !== 6) {
      toast.error("Please enter a 6-digit OTP");
      return;
    }

    try {
      const response = await axios.post<VerifyOTPResponse>(
        `${API_URL}/verify-otp`,
        { userId, otp: otpCode }
      );
      setIsVerified(true);
      localStorage.setItem("token", response.data.token); // Store token
      toast.success("Email verified successfully!");
      setTimeout(() => router.push("/loginForm"), 1000); // Redirect to dashboard
    } catch (error: any) {
      toast.error(error.response?.data?.message || "OTP verification failed");
    }
  };

  const handleResendOTP = async () => {
    if (!userId || !email) {
      toast.error("Please verify your email first");
      return;
    }

    try {
      const response = await axios.post<OTPResponse>(`${API_URL}/resend-otp`, {
        userId,
        email,
      });
      setUserId(response.data.userId);
      setOtp(["", "", "", "", "", ""]);
      toast.success("New OTP sent to your email!");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to resend OTP");
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
                  Create Account!
                </h1>
                <p className="text-gray-600">
                  Join us and start your learning journey
                </p>
              </div>

              <form onSubmit={handleSubmit(handleSignUp)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      placeholder="First Name"
                      {...register("firstName", {
                        required: "First name is required",
                      })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 hover:border-gray-400 hover:shadow-md focus:shadow-lg transform hover:scale-102"
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.firstName.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Last Name"
                      {...register("lastName", {
                        required: "Last name is required",
                      })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 hover:border-gray-400 hover:shadow-md focus:shadow-lg transform hover:scale-102"
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.lastName.message}
                      </p>
                    )}
                  </div>
                </div>

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
                      className="w-full px-4 py-3 pr-24 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 hover:border-gray-400 hover:shadow-md focus:shadow-lg transform hover:scale-102"
                    />
                    {!isVerified ? (
                      <button
                        type="button"
                        onClick={handleVerifyEmail}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg text-sm transition-all duration-300 hover:scale-105"
                      >
                        Verify
                      </button>
                    ) : (
                      <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center text-green-600">
                        <CheckCircle size={20} />
                        <span className="text-sm ml-1">Verified</span>
                      </div>
                    )}
                  </div>
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.email.message}
                    </p>
                  )}

                  {showOTPField && !isVerified && (
                    <div className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-200">
                      <div className="text-center mb-4">
                        <div className="flex items-center justify-center mb-2">
                          <Mail className="w-5 h-5 text-blue-600 mr-2" />
                          <p className="text-blue-800 font-medium">
                            Enter Verification Code
                          </p>
                        </div>
                        <p className="text-blue-600 text-sm">
                          We've sent a 6-digit code to {email}
                        </p>
                      </div>

                      <div className="flex justify-center space-x-2 mb-4">
                        {otp.map((digit, index) => (
                          <input
                            key={index}
                            id={`otp-${index}`}
                            type="text"
                            maxLength={1}
                            value={digit}
                            onChange={(e) =>
                              handleOtpChange(index, e.target.value)
                            }
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            className="w-10 h-10 text-center text-lg font-bold border-2 border-blue-300 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                          />
                        ))}
                      </div>

                      <div className="flex space-x-2">
                        <button
                          type="button"
                          onClick={handleVerifyOTP}
                          disabled={otp.join("").length < 6}
                          className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 text-sm"
                        >
                          Verify Code
                        </button>
                        <button
                          type="button"
                          onClick={handleResendOTP}
                          className="text-blue-600 hover:text-blue-700 font-medium text-sm px-3 py-2 rounded-lg hover:bg-blue-100 transition-all duration-300"
                        >
                          Resend
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters",
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

                <div>
                  <p className="text-gray-700 font-medium mb-3">
                    Choose your role:
                  </p>
                  <div className="space-y-3">
                    <label className="flex items-center space-x-3 cursor-pointer group">
                      <input
                        type="radio"
                        value="student"
                        {...register("role", {
                          required: "Please select a role",
                        })}
                        className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <div className="flex items-center space-x-3 group-hover:text-blue-600 transition-colors">
                        <div className="bg-blue-100 p-2 rounded-lg group-hover:bg-blue-200 transition-colors">
                          <BookOpen className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <span className="font-medium text-gray-900 group-hover:text-blue-600">
                            Student
                          </span>
                          <p className="text-sm text-gray-600">
                            Learn from expert mentors
                          </p>
                        </div>
                      </div>
                    </label>

                    <label className="flex items-center space-x-3 cursor-pointer group">
                      <input
                        type="radio"
                        value="mentor"
                        {...register("role", {
                          required: "Please select a role",
                        })}
                        className="w-4 h-4 text-green-600 focus:ring-green-500 border-gray-300"
                      />
                      <div className="flex items-center space-x-3 group-hover:text-green-600 transition-colors">
                        <div className="bg-green-100 p-2 rounded-lg group-hover:bg-green-200 transition-colors">
                          <User className="w-4 h-4 text-green-600" />
                        </div>
                        <div>
                          <span className="font-medium text-gray-900 group-hover:text-green-600">
                            Mentor
                          </span>
                          <p className="text-sm text-gray-600">
                            Share your expertise
                          </p>
                        </div>
                      </div>
                    </label>
                  </div>
                  {errors.role && (
                    <p className="text-red-500 text-sm mt-2">
                      {errors.role.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={!isVerified}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-full transition-all duration-500 transform hover:scale-105 shadow-lg hover:shadow-xl active:scale-95"
                >
                  {!isVerified ? "Verify Email First" : "Complete Registration"}
                </button>
              </form>

              <p className="text-center text-sm text-gray-600 transition-all duration-800 delay-1000 transform mt-5">
                Already have an account?{" "}
                <Link
                  href="/loginForm"
                  className="text-teal-600 hover:text-teal-700 font-medium transition-all duration-300 hover:scale-105 hover:underline"
                >
                  Login here
                </Link>
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-teal-500 to-blue-600 p-8 lg:p-12 flex flex-col justify-center relative overflow-hidden">
            <div className="absolute top-8 right-8 w-24 h-24 bg-teal-300 rounded-full opacity-30 transition-all duration-1000 ease-in-out transform hover:scale-110"></div>
            <div className="absolute top-16 right-16 w-16 h-16 bg-blue-300 rounded-lg opacity-40 transition-all duration-1000 ease-in-out transform hover:scale-110 rotate-45"></div>
            <div className="absolute bottom-8 left-8 w-32 h-32 bg-cyan-300 rounded-full opacity-20 transition-all duration-1000 ease-in-out transform hover:scale-110"></div>

            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-white mb-6">
                Welcome to LearnHub
              </h2>
              <p className="text-blue-100 text-lg mb-8 leading-relaxed">
                Connect with expert mentors and unlock your learning potential.
                Join thousands of students transforming their future.
              </p>

              <div className="space-y-4">
                {[
                  "Expert mentors from top companies",
                  "Personalized learning paths",
                  "24/7 community support",
                ].map((text, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-teal-300 rounded-full transition-all duration-500 transform hover:scale-150"></div>
                    <span className="text-blue-100 transition-all duration-500">
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

export default RegisterForm;