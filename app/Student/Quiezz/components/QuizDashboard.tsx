import React from "react";
import { ArrowRight, BookOpen, CheckCircle, Clock, TrendingUp, Play, Award } from "lucide-react";
import { Quiz } from "../types";
import QuizCard from "./QuizCard";

interface QuizDashboardProps {
  quizzes: Quiz[];
  setCurrentPage: (page: string) => void;
  startQuiz: (quiz: Quiz) => void;
  setActiveTab: (tab: string) => void;
  getDifficultyColor: (difficulty: string) => string;
}

const QuizDashboard: React.FC<QuizDashboardProps> = ({ 
  quizzes, 
  setCurrentPage, 
  startQuiz, 
  setActiveTab,
  getDifficultyColor
}) => {
  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-[#1887A1] to-[#0D4C5B] rounded-2xl p-8 text-white relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-4xl font-bold mb-4">Welcome to QuizMaster</h1>
          <p className="text-xl text-white text-opacity-90 mb-6">
            Enhance your programming skills with interactive quizzes and track your progress
          </p>
          <button
            onClick={() => setCurrentPage("quizzes")}
            className="bg-white text-[#1887A1] px-6 py-3 rounded-xl cursor-pointer shadow-lg font-semibold hover:shadow-lg transition-all duration-200 flex items-center gap-2"
          >
            Start Learning
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white bg-opacity-10 rounded-full transform translate-x-32 -translate-y-32" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white bg-opacity-5 rounded-full transform -translate-x-24 translate-y-24" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Total Quizzes</p>
              <p className="text-3xl font-bold text-gray-900">{quizzes.length}</p>
            </div>
            <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center">
              <BookOpen className="w-7 h-7 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Completed</p>
              <p className="text-3xl font-bold text-gray-900">
                {quizzes.filter((q) => q.completed).length}
              </p>
            </div>
            <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center">
              <CheckCircle className="w-7 h-7 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">In Progress</p>
              <p className="text-3xl font-bold text-gray-900">
                {quizzes.filter((q) => !q.completed).length}
              </p>
            </div>
            <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center">
              <Clock className="w-7 h-7 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Completion Rate</p>
              <p className="text-3xl font-bold text-gray-900">
                {quizzes.length > 0
                  ? Math.round(
                      (quizzes.filter((q) => q.completed).length / quizzes.length) * 100
                    )
                  : 0}%
              </p>
            </div>
            <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center">
              <TrendingUp className="w-7 h-7 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Featured Quizzes</h2>
          <button
            onClick={() => setCurrentPage("quizzes")}
            className="text-[#1887A1] font-medium hover:underline flex items-center gap-2"
          >
            View All
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quizzes.slice(0, 3).map((quiz) => (
            <QuizCard 
              key={quiz._id} 
              quiz={quiz} 
              onStart={startQuiz}
              getDifficultyColor={getDifficultyColor}
            />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Learning Progress</h3>
          <div className="space-y-4">
            {Array.from(new Set(quizzes.map(q => q.subject))).map((subject) => {
              const subjectQuizzes = quizzes.filter((q) => q.subject === subject);
              const completed = subjectQuizzes.filter((q) => q.completed).length;
              const total = subjectQuizzes.length;
              const percentage = total > 0 ? (completed / total) * 100 : 0;

              return (
                <div key={subject} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-700">{subject}</span>
                    <span className="text-sm text-gray-500">
                      {completed}/{total}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-[#1887A1] to-[#0D4C5B] h-2 rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h3>
          <div className="space-y-4">
            <button
              onClick={() => setCurrentPage("quizzes")}
              className="w-full p-4 bg-gradient-to-r from-[#1887A1] to-[#0D4C5B] text-white rounded-xl font-medium hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
            >
              <Play className="w-5 h-5" />
              Start a New Quiz
            </button>
            <button
              onClick={() => {
                setCurrentPage("quizzes");
                setActiveTab("completed");
              }}
              className="w-full p-4 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
            >
              <Award className="w-5 h-5" />
              View Completed Quizzes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizDashboard;
