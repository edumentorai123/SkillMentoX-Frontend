"use client";
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function SignUpPage() {
  const [isSignUp, setIsSignUp] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);


  const handleModeChange = (newIsSignUp: boolean) => {
    if (newIsSignUp !== isSignUp) {
      setIsTransitioning(true);
      setTimeout(() => {
        setIsSignUp(newIsSignUp);
      }, 600);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 1200);
    }
  };

  

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-6xl mx-auto relative">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="bg-white rounded-full p-1 shadow-lg border border-gray-100">
            <div className="flex">
              <button
                onClick={() => handleModeChange(true)}
                className={`px-6 py-3 rounded-full font-semibold text-sm transition-all duration-700 transform ${isSignUp
                    ? "bg-teal-500 text-white shadow-md scale-105"
                    : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                  }`}
              >
                Sign up
              </button>
              <button
                onClick={() => handleModeChange(false)}
                className={`px-6 py-3 rounded-full font-semibold text-sm transition-all duration-700 transform ${!isSignUp
                    ? "bg-teal-500 text-white shadow-md scale-105"
                    : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                  }`}
              >
                Login
              </button>
            </div>
          </div>
        </div>


        <div className="grid lg:grid-cols-2 gap-0 bg-white rounded-3xl shadow-2xl overflow-hidden min-h-[600px] relative">

          <div
            className={`bg-white p-8 lg:p-12 flex flex-col justify-center transition-all duration-1000 ease-in-out transform ${isSignUp ? "lg:order-1" : "lg:order-2"
              } ${isTransitioning ? "opacity-30 scale-95" : "opacity-100 scale-100"
              }`}
          >
            <div className="max-w-md mx-auto w-full">

              <div className="mb-8 mt-8 lg:mt-0">
                <h1
                  className={`text-3xl font-bold text-gray-900 mb-2 transition-all duration-800 transform ${isTransitioning
                      ? "translate-y-8 opacity-0"
                      : "translate-y-0 opacity-100"
                    }`}
                >
                  {isSignUp ? "Create Account!" : "Welcome back!"}
                </h1>
                <p
                  className={`text-gray-600 transition-all duration-800 delay-200 transform ${isTransitioning
                      ? "translate-y-8 opacity-0"
                      : "translate-y-0 opacity-100"
                    }`}
                >
                  {isSignUp
                    ? "Join us and start your learning journey"
                    : "Sign in to continue your learning journey"}
                </p>
              </div>


              <div className="space-y-6">
                {isSignUp && (
                  <div
                    className={`grid grid-cols-1 md:grid-cols-2 gap-4 transition-all duration-800 delay-300 transform ${isTransitioning
                        ? "translate-y-12 opacity-0 scale-90"
                        : "translate-y-0 opacity-100 scale-100"
                      }`}
                  >
                    <div>
                      <input
                        type="text"
                        placeholder="First Name"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 hover:border-gray-400 hover:shadow-md focus:shadow-lg transform hover:scale-102"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="Last Name"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 hover:border-gray-400 hover:shadow-md focus:shadow-lg transform hover:scale-102"
                      />
                    </div>
                  </div>
                )}

                <div
                  className={`transition-all duration-800 delay-400 transform ${isTransitioning
                      ? "translate-y-12 opacity-0 scale-90"
                      : "translate-y-0 opacity-100 scale-100"
                    }`}
                >
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 hover:border-gray-400 hover:shadow-md focus:shadow-lg transform hover:scale-102"
                  />
                </div>

                <div
                  className={`relative transition-all duration-800 delay-500 transform ${isTransitioning
                      ? "translate-y-12 opacity-0 scale-90"
                      : "translate-y-0 opacity-100 scale-100"
                    }`}
                >
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 hover:border-gray-400 hover:shadow-md focus:shadow-lg transform hover:scale-102"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-all duration-300 hover:scale-110"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>

                <div
                  className={`flex items-center justify-between transition-all duration-800 delay-600 transform ${isTransitioning
                      ? "translate-y-12 opacity-0 scale-90"
                      : "translate-y-0 opacity-100 scale-100"
                    }`}
                >
                  <div className="flex items-center"></div>
                  {!isSignUp && (
                    <a
                      href="#"
                      className="text-sm text-teal-600 hover:text-teal-700 font-medium transition-all duration-300 hover:scale-105"
                    >
                      Forgot password?
                    </a>
                  )}
                </div>

                <button
                  type="button"
                  className={`w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 px-6 rounded-full transition-all duration-500 transform hover:scale-105 shadow-lg hover:shadow-xl active:scale-95 delay-500 ${isTransitioning
                      ? "translate-y-6 opacity-0 scale-95"
                      : "translate-y-0 opacity-100 scale-100"
                    }`}
                >
                  {isSignUp ? "Sign up" : "Log in"}
                </button>

                <div
                  className={`text-center transition-all duration-800 delay-800 transform ${isTransitioning
                      ? "translate-y-12 opacity-0 scale-90"
                      : "translate-y-0 opacity-100 scale-100"
                    }`}
                >
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-gray-500">
                        or continue with
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  className={`w-full bg-white hover:bg-gray-50 border border-gray-300 text-gray-700 font-bold py-3 px-6 rounded-full transition-all duration-500 transform hover:scale-105 shadow-sm hover:shadow-md flex items-center justify-center space-x-2 active:scale-95 delay-700 ${isTransitioning
                      ? "translate-y-6 opacity-0 scale-95"
                      : "translate-y-0 opacity-100 scale-100"
                    }`}
                >
                  <svg
                    className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  <span>Continue with Google</span>
                </button>

                {!isSignUp && (
                  <div
                    className={`text-center text-sm text-gray-600 transition-all duration-800 delay-1000 transform ${isTransitioning
                        ? "translate-y-12 opacity-0 scale-90"
                        : "translate-y-0 opacity-100 scale-100"
                      }`}
                  >
                    Don't have an account?{" "}
                    <button
                      onClick={() => handleModeChange(true)}
                      className="text-teal-600 hover:text-teal-700 font-medium transition-all duration-300 hover:scale-105 hover:underline"
                    >
                      Sign up here
                    </button>
                  </div>
                )}

                {isSignUp && (
                  <div
                    className={`text-center text-sm text-gray-600 transition-all duration-800 delay-1000 transform ${isTransitioning
                        ? "translate-y-12 opacity-0 scale-90"
                        : "translate-y-0 opacity-100 scale-100"
                      }`}
                  >
                    Already have an account?{" "}
                    <button
                      onClick={() => handleModeChange(false)}
                      className="text-teal-600 hover:text-teal-700 font-medium transition-all duration-300 hover:scale-105 hover:underline"
                    >
                      Login here
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>


          <div
            className={`bg-gradient-to-br ${isSignUp
                ? "from-teal-500 to-blue-600"
                : "from-purple-500 to-pink-600"
              } p-8 lg:p-12 flex flex-col justify-center relative overflow-hidden transition-all duration-1000 ease-in-out transform ${isSignUp ? "lg:order-2" : "lg:order-1"
              } ${isTransitioning ? "opacity-50 scale-95" : "opacity-100 scale-100"
              }`}
          >

            <div
              className={`absolute top-8 ${isSignUp ? "right-8" : "left-8"
                } w-24 h-24 ${isSignUp ? "bg-teal-300" : "bg-purple-300"
                } rounded-full opacity-30 transition-all duration-1000 ease-in-out transform hover:scale-110 ${isTransitioning ? "rotate-180 scale-50" : "rotate-0 scale-100"
                }`}
            ></div>
            <div
              className={`absolute top-16 ${isSignUp ? "right-16" : "left-16"
                } w-16 h-16 ${isSignUp ? "bg-blue-300" : "bg-pink-300"
                } rounded-lg opacity-40 transition-all duration-1000 ease-in-out transform hover:scale-110 ${isTransitioning
                  ? "rotate-[270deg] scale-50"
                  : "rotate-45 scale-100"
                }`}
            ></div>
            <div
              className={`absolute bottom-8 ${isSignUp ? "left-8" : "right-8"
                } w-32 h-32 ${isSignUp ? "bg-cyan-300" : "bg-indigo-300"
                } rounded-full opacity-20 transition-all duration-1000 ease-in-out transform hover:scale-110 ${isTransitioning ? "rotate-180 scale-50" : "rotate-0 scale-100"
                }`}
            ></div>

            <div className="relative z-10">
              <h2
                className={`text-3xl font-bold text-white mb-6 transition-all duration-800 delay-300 transform ${isTransitioning
                    ? "translate-x-12 opacity-0"
                    : "translate-x-0 opacity-100"
                  }`}
              >
                {isSignUp ? "Welcome to LearnHub" : "Welcome Back to LearnHub"}
              </h2>
              <p
                className={`${isSignUp ? "text-blue-100" : "text-purple-100"
                  } text-lg mb-8 leading-relaxed transition-all duration-800 delay-400 transform ${isTransitioning
                    ? "translate-x-12 opacity-0"
                    : "translate-x-0 opacity-100"
                  }`}
              >
                {isSignUp
                  ? "Connect with expert mentors and unlock your learning potential. Join thousands of students transforming their future."
                  : "Continue your learning journey with personalized courses and expert guidance. We're excited to have you back!"}
              </p>

              <div className="space-y-4">
                {[0, 1, 2].map((index) => (
                  <div
                    key={index}
                    className={`flex items-center space-x-3 transition-all duration-800 transform ${isTransitioning
                        ? "translate-x-12 opacity-0"
                        : "translate-x-0 opacity-100"
                      }`}
                    style={{ transitionDelay: `${500 + index * 150}ms` }}
                  >
                    <div
                      className={`w-2 h-2 ${isSignUp ? "bg-teal-300" : "bg-purple-300"
                        } rounded-full transition-all duration-500 transform hover:scale-150`}
                    ></div>
                    <span
                      className={`${isSignUp ? "text-blue-100" : "text-purple-100"
                        } transition-all duration-500`}
                    >
                      {isSignUp
                        ? index === 0
                          ? "Expert mentors from top companies"
                          : index === 1
                            ? "Personalized learning paths"
                            : "24/7 community support"
                        : index === 0
                          ? "Continue where you left off"
                          : index === 1
                            ? "Track your progress"
                            : "Access premium content"}
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
}
