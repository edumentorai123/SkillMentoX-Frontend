import React, { useState } from "react";
import { Home, BookOpen, Award, Menu, X, Brain } from "lucide-react";

interface QuizNavigationProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const QuizNavigation: React.FC<QuizNavigationProps> = ({ 
  currentPage, 
  setCurrentPage, 
  activeTab, 
  setActiveTab 
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#1887A1] to-[#0D4C5B] rounded-xl flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">QuizMaster</h1>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => setCurrentPage("dashboard")}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                currentPage === "dashboard"
                  ? "text-[#1887A1] bg-blue-50"
                  : "text-gray-600 hover:text-[#1887A1]"
              }`}
            >
              <Home className="w-4 h-4" />
              <span className="font-medium">Dashboard</span>
            </button>
            <button
              onClick={() => setCurrentPage("quizzes")}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                currentPage === "quizzes"
                  ? "text-[#1887A1] bg-blue-50"
                  : "text-gray-600 hover:text-[#1887A1]"
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span className="font-medium">Quizzes</span>
            </button>
            <button
              onClick={() => {
                setCurrentPage("quizzes");
                setActiveTab("completed");
              }}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                currentPage === "quizzes" && activeTab === "completed"
                  ? "text-[#1887A1] bg-blue-50"
                  : "text-gray-600 hover:text-[#1887A1]"
              }`}
            >
              <Award className="w-4 h-4" />
              <span className="font-medium">Completed</span>
            </button>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-100 py-4">
            <div className="space-y-2">
              <button
                onClick={() => {
                  setCurrentPage("dashboard");
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  currentPage === "dashboard"
                    ? "text-[#1887A1] bg-blue-50"
                    : "text-gray-600"
                }`}
              >
                <Home className="w-5 h-5" />
                <span className="font-medium">Dashboard</span>
              </button>
              <button
                onClick={() => {
                  setCurrentPage("quizzes");
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  currentPage === "quizzes"
                    ? "text-[#1887A1] bg-blue-50"
                    : "text-gray-600"
                }`}
              >
                <BookOpen className="w-5 h-5" />
                <span className="font-medium">Quizzes</span>
              </button>
              <button
                onClick={() => {
                  setCurrentPage("quizzes");
                  setActiveTab("completed");
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  currentPage === "quizzes" && activeTab === "completed"
                    ? "text-[#1887A1] bg-blue-50"
                    : "text-gray-600"
                }`}
              >
                <Award className="w-5 h-5" />
                <span className="font-medium">Completed</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default QuizNavigation;
