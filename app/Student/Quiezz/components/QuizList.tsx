import React from "react";
import { ChevronDown, BookOpen } from "lucide-react";
import { Quiz } from "../types";
import QuizCard from "./QuizCard";

interface QuizListProps {
  quizzes: Quiz[];
  loading: boolean;
  error: string | null;
  selectedSubject: string;
  setSelectedSubject: (subject: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  startQuiz: (quiz: Quiz) => void;
  getDifficultyColor: (difficulty: string) => string;
}

const QuizList: React.FC<QuizListProps> = ({
  quizzes,
  loading,
  error,
  selectedSubject,
  setSelectedSubject,
  sortBy,
  setSortBy,
  activeTab,
  setActiveTab,
  startQuiz,
  getDifficultyColor
}) => {
  const filteredQuizzes = quizzes.filter((quiz) => {
    const subjectFilter =
      selectedSubject === "All Subjects" || quiz.subject === selectedSubject;
    const tabFilter = activeTab === "available" ? !quiz.completed : quiz.completed;
    return subjectFilter && tabFilter;
  });

  const sortedQuizzes = [...filteredQuizzes].sort((a, b) => {
    if (sortBy === "difficulty") {
      const difficultyOrder = { Easy: 1, Medium: 2, Hard: 3 };
      return (
        // @ts-ignore - dynamic key access
        difficultyOrder[a.difficulty as any] -
        // @ts-ignore
        difficultyOrder[b.difficulty as any]
      );
    }
    return a.title.localeCompare(b.title);
  });

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-[#1887A1] to-[#0D4C5B] rounded-2xl p-8 text-white">
        <h1 className="text-4xl font-bold mb-4">Explore Quizzes</h1>
        <p className="text-xl text-white text-opacity-90">
          Test your knowledge with our comprehensive collection of programming quizzes
        </p>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative">
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-xl px-4 py-3 pr-12 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#1887A1] focus:border-[#1887A1] min-w-[160px]"
              >
                <option>All Subjects</option>
                {Array.from(new Set(quizzes.map(q => q.subject))).map(subject => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-4 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>

            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-xl px-4 py-3 pr-12 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#1887A1] focus:border-[#1887A1] min-w-[160px]"
              >
                <option value="difficulty">Sort by Difficulty</option>
                <option value="name">Sort by Name</option>
              </select>
              <ChevronDown className="absolute right-3 top-4 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          <div className="flex gap-2 bg-gray-100 rounded-xl p-2">
            <button
              onClick={() => setActiveTab("available")}
              className={`py-2 px-4 rounded-lg font-medium transition-all duration-200 ${
                activeTab === "available"
                  ? "bg-white text-[#1887A1] shadow-sm"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              Available
            </button>
            <button
              onClick={() => setActiveTab("completed")}
              className={`py-2 px-4 rounded-lg font-medium transition-all duration-200 ${
                activeTab === "completed"
                  ? "bg-white text-[#1887A1] shadow-sm"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              Completed
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-16">
          <p className="text-2xl font-semibold text-gray-600">Loading quizzes...</p>
        </div>
      ) : error ? (
        <div className="text-center py-16">
          <p className="text-2xl font-semibold text-red-600">{error}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedQuizzes.map((quiz) => (
            <QuizCard 
              key={quiz._id} 
              quiz={quiz} 
              onStart={startQuiz}
              getDifficultyColor={getDifficultyColor}
            />
          ))}
        </div>
      )}

      {sortedQuizzes.length === 0 && !loading && !error && (
        <div className="text-center py-16">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <BookOpen className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-2xl font-semibold text-gray-600">No quizzes found</h3>
          <p className="text-gray-500 text-lg">Try adjusting your filters or check back later.</p>
        </div>
      )}
    </div>
  );
};

export default QuizList;
