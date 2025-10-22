import React from "react";
import { TrendingUp } from "lucide-react";

interface Progress {
    completionPercentage: number;
    level: number;
    coursesCompleted: number;
    totalCourses: number;
    studyDaysThisWeek: number;
    hoursThisMonth: number;
    xp: number;
    xpToNextLevel: number;
}

interface ProgressCardProps {
    progress: Progress | null;
    animateProgress: boolean;
    handleInitializeProgress: () => void;
}

const ProgressCard: React.FC<ProgressCardProps> = ({ progress, animateProgress, handleInitializeProgress }) => {
    return (
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-1 animate-slide-up">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-[#1887A1]" />
                    Learning Progress
                </h3>
                <span className="text-xs bg-gradient-to-r from-[#1887A1] to-[#0D4C5B] text-white px-3 py-1 rounded-full font-semibold">
                    Level {progress?.level || 0}
                </span>
            </div>
            {progress ? (
                <>
                    <div className="flex items-center justify-center mb-6">
                        <div className="relative">
                            <svg className="w-28 h-28 sm:w-32 sm:h-32 transform -rotate-90" viewBox="0 0 120 120">
                                <circle cx="60" cy="60" r="50" stroke="#f1f5f9" strokeWidth="6" fill="none" />
                                <circle
                                    cx="60"
                                    cy="60"
                                    r="50"
                                    stroke="url(#progressGradient)"
                                    strokeWidth="6"
                                    fill="none"
                                    strokeDasharray={`${animateProgress ? progress.completionPercentage * 3.14 : 0} ${(100 - progress.completionPercentage) * 3.14}`}
                                    strokeLinecap="round"
                                    className="transition-all duration-2000 ease-out"
                                />
                                <defs>
                                    <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#1887A1" />
                                        <stop offset="50%" stopColor="#14B8A6" />
                                        <stop offset="100%" stopColor="#0D4C5B" />
                                    </linearGradient>
                                </defs>
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-center">
                                    <span className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[#1887A1] to-[#0D4C5B] bg-clip-text text-transparent">
                                        {progress.completionPercentage}%
                                    </span>
                                    <p className="text-xs text-gray-600 font-medium">Complete</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-center">
                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-3 hover:scale-105 transition-all duration-300">
                            <div className="text-xs text-gray-600 mb-1">Courses</div>
                            <div className="font-bold text-lg text-gray-800">{progress.coursesCompleted}/{progress.totalCourses}</div>
                            <div className="text-xs text-blue-600 font-semibold">Completed</div>
                        </div>
                        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-3 hover:scale-105 transition-all duration-300">
                            <div className="text-xs text-gray-600 mb-1">Study Days</div>
                            <div className="font-bold text-lg text-gray-800">{progress.studyDaysThisWeek}</div>
                            <div className="text-xs text-green-600 font-semibold">This Week</div>
                        </div>
                        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-3 hover:scale-105 transition-all duration-300">
                            <div className="text-xs text-gray-600 mb-1">Hours</div>
                            <div className="font-bold text-lg text-gray-800">{progress.hoursThisMonth}</div>
                            <div className="text-xs text-purple-600 font-semibold">This Month</div>
                        </div>
                    </div>
                </>
            ) : (
                <div className="text-center">
                    <p className="text-gray-600 text-sm mb-2">No progress data available. Start learning to track your progress!</p>
                    <button
                        onClick={handleInitializeProgress}
                        className="px-4 py-2 bg-gradient-to-r from-[#1887A1] to-[#0D4C5B] text-white text-sm font-semibold rounded-lg hover:scale-105 transition-all duration-300"
                    >
                        Start Tracking Progress
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProgressCard;