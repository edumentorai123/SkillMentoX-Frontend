import React from "react";
import { Trophy, Award, Zap } from "lucide-react";

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

interface Badge {
    icon: React.ElementType;
    name: string;
    earned: boolean;
    color: string;
}

interface Streak {
    currentStreak: number;
    days: boolean[];
}

interface AchievementsCardProps {
    progress: Progress | null;
    badges: Badge[];
    streak: Streak | null;
    animateProgress: boolean;
    handleInitializeProgress: () => void;
}

const AchievementsCard: React.FC<AchievementsCardProps> = ({
    progress,
    badges,
    streak,
    animateProgress,
    handleInitializeProgress,
}) => {
    const daysOfWeek = ["M", "T", "W", "T", "F", "S", "S"];

    return (
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-1 animate-slide-up delay-400">
            <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-[#1887A1]" />
                Your Achievements
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-4">
                    {progress ? (
                        <>
                            <div className="flex justify-between items-center mb-3">
                                <span className="font-bold text-xl bg-gradient-to-r from-[#1887A1] to-[#0D4C5B] bg-clip-text text-transparent">
                                    {progress.xp} XP
                                </span>
                                <span className="text-gray-600 text-sm">{progress.xpToNextLevel} XP to Level {progress.level + 1}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner overflow-hidden">
                                <div
                                    className={`bg-gradient-to-r from-[#1887A1] to-[#0D4C5B] h-3 rounded-full shadow-lg transition-all duration-2000 ease-out ${animateProgress ? "animate-pulse" : ""}`}
                                    style={{ width: animateProgress ? `${(progress.xp / (progress.xp + progress.xpToNextLevel)) * 100}%` : "0%" }}
                                ></div>
                            </div>
                            <p className="text-xs text-gray-600 mt-2 text-center">Keep going! You&apos;re doing amazing!</p>
                        </>
                    ) : (
                        <div className="text-center">
                            <p className="text-gray-600 text-sm mb-2">No XP data available. Start earning XP!</p>
                            <button
                                onClick={handleInitializeProgress}
                                className="px-4 py-2 bg-gradient-to-r from-[#1887A1] to-[#0D4C5B] text-white text-sm font-semibold rounded-lg hover:scale-105 transition-all duration-300"
                            >
                                Start Tracking Progress
                            </button>
                        </div>
                    )}
                </div>
                <div className="lg:col-span-1 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-4">
                    <h4 className="font-semibold text-base text-gray-800 mb-3 flex items-center gap-2">
                        <Award className="w-4 h-4 text-orange-500" />
                        Badges Earned ({badges.filter((b) => b.earned).length}/{badges.length})
                    </h4>
                    {badges.length > 0 ? (
                        <div className="grid grid-cols-3 gap-2">
                            {badges.map((badge, index) => (
                                <div
                                    key={index}
                                    className={`relative group cursor-pointer ${badge.earned ? "animate-bounce" : ""}`}
                                    style={{ animationDelay: `${index * 200}ms` }}
                                >
                                    <div
                                        className={`w-12 h-12 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 flex items-center justify-center ${badge.earned ? `bg-gradient-to-br ${badge.color}` : "bg-gray-200 opacity-50"}`}
                                    >
                                        <badge.icon className={`w-6 h-6 ${badge.earned ? "text-white" : "text-gray-400"}`} />
                                    </div>
                                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-10">
                                        {badge.name}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-gray-600 text-sm">No badges earned yet. Keep learning!</p>
                    )}
                </div>
                <div className="lg:col-span-1 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4">
                    <h4 className="font-semibold text-base text-gray-800 mb-3 flex items-center gap-2">
                        <Zap className="w-4 h-4 text-green-500" />
                        Study Streak
                    </h4>
                    {streak && streak.days && Array.isArray(streak.days) ? (
                        <>
                            <div className="flex justify-center space-x-2 mb-3">
                                {daysOfWeek.map((day, index) => (
                                    <div
                                        key={index}
                                        className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold transition-all duration-300 ${streak.days[index] ? "bg-gradient-to-br from-[#1887A1] to-[#0D4C5B] text-white shadow-lg hover:shadow-xl transform hover:scale-110 animate-pulse" : "bg-gray-200 text-gray-500 hover:bg-gray-300"}`}
                                        style={{ animationDelay: `${index * 100}ms` }}
                                    >
                                        {day}
                                    </div>
                                ))}
                            </div>
                            <div className="text-center">
                                <p className="text-2xl font-bold text-[#1887A1] mb-1">{streak.currentStreak}</p>
                                <p className="text-xs text-gray-600">Days Streak 🔥</p>
                                <p className="text-xs text-green-600 font-semibold mt-2">Great consistency!</p>
                            </div>
                        </>
                    ) : (
                        <div className="text-center">
                            <p className="text-gray-600 text-sm mb-2">No streak data available. Start your streak today!</p>
                            <div className="flex justify-center space-x-2 mb-3">
                                {daysOfWeek.map((day, index) => (
                                    <div
                                        key={index}
                                        className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold transition-all duration-300 bg-gray-200 text-gray-500 hover:bg-gray-300"
                                        style={{ animationDelay: `${index * 100}ms` }}
                                    >
                                        {day}
                                    </div>
                                ))}
                            </div>
                            <div className="text-center">
                                <p className="text-2xl font-bold text-gray-400 mb-1">0</p>
                                <p className="text-xs text-gray-600">Days Streak 🔥</p>
                                <p className="text-xs text-gray-500 mt-2">Start studying to build your streak!</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AchievementsCard;