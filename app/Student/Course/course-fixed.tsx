"use client"

import React, { useState, useEffect } from 'react';
import {
    User,
    Play,
    ArrowLeft,
    CheckCircle,
    Clock,
    BookOpen
} from 'lucide-react';

interface Day {
    day: number;
    topic: string;
    completed: boolean;
}

interface Week {
    week: number;
    title: string;
    days: Day[];
}

interface Course {
    id: string;
    title: string;
    stack: string;
    icon: string;
    weeks: Week[];
}

const CourseDashboard = () => {
    const [currentView, setCurrentView] = useState<'dashboard' | 'course-detail'>('dashboard');
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedStack, setSelectedStack] = useState<string>('All');

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/courses`);
                if (!response.ok) throw new Error('Failed to fetch courses');
                const data = await response.json();
                setCourses(data);
                setLoading(false);
            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
                setError(errorMessage);
                setLoading(false);
            }
        };
        fetchCourses();
    }, []);

    const handleContinue = (course: Course) => {
        setSelectedCourse(course);
        setCurrentView('course-detail');
    };

    const handleBackToDashboard = () => {
        setCurrentView('dashboard');
        setSelectedCourse(null);
    };

    const getCompletedDays = (course: Course) => {
        let completed = 0;
        let total = 0;
        course.weeks.forEach((week: Week) => {
            week.days.forEach((day: Day) => {
                total++;
                if (day.completed) completed++;
            });
        });
        return { completed, total };
    };

    const stacks = [...new Set(courses.map((course: Course) => course.stack))];

    if (loading) {
        return <div className="min-h-screen bg-white flex items-center justify-center">Loading...</div>;
    }

    if (error) {
        return <div className="min-h-screen bg-white flex items-center justify-center text-red-500">{error}</div>;
    }

    if (currentView === 'course-detail' && selectedCourse) {
        const { completed, total } = getCompletedDays(selectedCourse);
        const progressPercent = Math.round((completed / total) * 100);

        return (
            <div className="min-h-screen bg-white">
                <div className="bg-gradient-to-r from-[#1887A1] to-[#0D4C5B] px-4 sm:px-6 lg:px-8 py-6">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex items-center gap-4 mb-4">
                            <button
                                onClick={handleBackToDashboard}
                                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 text-white transition-colors"
                            >
                                <ArrowLeft className="w-5 h-5" />
                            </button>
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-2xl">
                                    {selectedCourse.icon}
                                </div>
                                <div>
                                    <h1 className="text-xl sm:text-2xl font-semibold text-white">{selectedCourse.title}</h1>
                                    <p className="text-white/80 text-sm">{progressPercent}% Complete • {completed}/{total} Days</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white/20 backdrop-blur-sm rounded-full h-3 mb-2">
                            <div
                                className="bg-white rounded-full h-3 transition-all duration-500"
                                style={{ width: `${progressPercent}%` }}
                            ></div>
                        </div>
                    </div>
                </div>
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {selectedCourse.weeks.map((week: Week) => (
                        <div key={week.week} className="mb-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-gradient-to-r from-[#1887A1] to-[#0D4C5B] rounded-full flex items-center justify-center text-white font-bold">
                                    {week.week}
                                </div>
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-900">Week {week.week}</h2>
                                    <p className="text-gray-600">{week.title}</p>
                                </div>
                            </div>
                            <div className="grid gap-3">
                                {week.days.map((day: Day) => (
                                    <div
                                        key={day.day}
                                        className={`bg-white border-2 rounded-xl p-4 transition-all duration-300 hover:shadow-md ${day.completed
                                                ? 'border-emerald-200 bg-emerald-50/50'
                                                : 'border-gray-100 hover:border-[#1887A1]/30'
                                            }`}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm ${day.completed
                                                    ? 'bg-emerald-500 text-white'
                                                    : 'bg-gray-100 text-gray-600'
                                                }`}>
                                                {day.completed ? <CheckCircle className="w-5 h-5" /> : day.day}
                                            </div>
                                            <div className="flex-1">
                                                <h3 className={`font-medium ${day.completed ? 'text-emerald-700' : 'text-gray-900'
                                                    }`}>
                                                    Day {day.day}: {day.topic}
                                                </h3>
                                                <div className="flex items-center gap-4 mt-1">
                                                    <div className="flex items-center gap-1 text-xs text-gray-500">
                                                        <Clock className="w-3 h-3" />
                                                        <span>45 min</span>
                                                    </div>
                                                    <div className="flex items-center gap-1 text-xs text-gray-500">
                                                        <BookOpen className="w-3 h-3" />
                                                        <span>Lesson + Practice</span>
                                                    </div>
                                                </div>
                                            </div>
                                            {day.completed ? (
                                                <div className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-semibold">
                                                    Completed
                                                </div>
                                            ) : (
                                                <button className="bg-[#1887A1] hover:bg-[#0D4C5B] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
                                                    <Play className="w-3 h-3" />
                                                    Start
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            <div className="bg-gradient-to-r from-[#1887A1] to-[#0D4C5B] px-4 sm:px-6 lg:px-8 py-8">
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-4 text-white">
                            <h1 className="text-xl sm:text-2xl font-semibold mb-1">Welcome back, Faizy</h1>
                            <p className="text-white/80 text-sm sm:text-base">Ready to continue your learning journey?</p>
                        </div>
                        <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-3 text-white">
                            <div className="w-10 h-10 bg-[#1887A1] rounded-full flex items-center justify-center mr-3">
                                <User className="w-5 h-5" />
                            </div>
                            <span className="font-medium">Faizy</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Full Stack Courses</h2>
                    <div className="text-sm text-gray-500">
                        {courses.length} courses
                    </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-6">
                    <button
                        onClick={() => setSelectedStack('All')}
                        className={`px-4 py-2 rounded-lg ${selectedStack === 'All' ? 'bg-[#1887A1] text-white' : 'bg-gray-100 text-gray-700'} transition-colors`}
                    >
                        All
                    </button>
                    {stacks.map((stack: string) => (
                        <button
                            key={stack}
                            onClick={() => setSelectedStack(stack)}
                            className={`px-4 py-2 rounded-lg ${selectedStack === stack ? 'bg-[#1887A1] text-white' : 'bg-gray-100 text-gray-700'} transition-colors`}
                        >
                            {stack}
                        </button>
                    ))}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {courses
                        .filter((course: Course) => selectedStack === 'All' || course.stack === selectedStack)
                        .map((course: Course) => {
                            const { completed, total } = getCompletedDays(course);
                            const progressPercent = Math.round((completed / total) * 100);
                            return (
                                <div
                                    key={course.id}
                                    className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
                                >
                                    <div className="bg-gradient-to-br from-[#1887A1] to-[#0D4C5B] p-6 relative overflow-hidden">
                                        <div className="absolute inset-0 bg-black/5"></div>
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                                        <div className="relative z-10">
                                            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
                                                {course.icon}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-3 leading-tight">
                                            {course.title}
                                        </h3>
                                        <div className="flex items-center justify-between mb-4">
                                            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-700">
                                                {course.stack}
                                            </span>
                                            <span className="text-sm font-medium text-gray-600">
                                                {progressPercent}% Complete
                                            </span>
                                        </div>
                                        <div className="mb-4">
                                            <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                                                <span>{completed} of {total} days completed</span>
                                                <span>{course.weeks.length} weeks</span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div
                                                    className="bg-gradient-to-r from-[#1887A1] to-[#0D4C5B] h-2 rounded-full transition-all duration-500"
                                                    style={{ width: `${progressPercent}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => handleContinue(course)}
                                            className="w-full bg-[#1887A1] hover:bg-[#0D4C5B] text-white py-3 px-4 rounded-xl font-medium transition-all duration-300 flex items-center justify-center group-hover:shadow-lg transform hover:scale-[1.02]"
                                        >
                                            <Play className="w-4 h-4 mr-2" />
                                            {progressPercent === 0 ? 'Start Course' : 'Continue'}
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                </div>
            </div>
        </div>
    );
};

export default CourseDashboard;
