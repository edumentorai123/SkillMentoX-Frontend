import React from "react";
import { Play, ArrowRight, Trophy, Clock } from "lucide-react";
import { Quiz } from "../types";

interface QuizCardProps {
  quiz: Quiz;
  onStart: (quiz: Quiz) => void;
  getDifficultyColor: (difficulty: string) => string;
}

const QuizCard: React.FC<QuizCardProps> = ({ quiz, onStart, getDifficultyColor }) => {
  return (
    <div className="group bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
      <div className="mb-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-[#1887A1] transition-colors mb-2">
              {quiz.title}
            </h3>
            <div className="flex items-center gap-2 mb-3">
              <span className="px-3 py-1 bg-gradient-to-r from-[#1887A1] to-[#0D4C5B] text-white text-xs rounded-full font-medium">
                {quiz.subject}
              </span>
              <span
                className={`px-3 py-1 text-xs font-medium rounded-full border ${getDifficultyColor(
                  quiz.difficulty
                )}`}
              >
                {quiz.difficulty}
              </span>
            </div>
          </div>
          <div className="w-10 h-10 bg-[#1887A1] bg-opacity-10 rounded-full flex items-center justify-center group-hover:bg-[#1887A1] group-hover:bg-opacity-20 transition-colors">
            <Play className="w-5 h-5 text-[#1887A1]" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-[#1887A1]" />
            <span>{quiz.questions.length} Questions</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#1887A1]" />
            <span>~{Math.ceil(quiz.questions.length * 1.2)} min</span>
          </div>
        </div>
      </div>

      <button
        onClick={() => onStart(quiz)}
        disabled={!quiz.questions || quiz.questions.length === 0}
        className="group w-full py-3 px-4 bg-gradient-to-r from-[#1887A1] to-[#0D4C5B] text-white rounded-xl font-medium hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        <span>{quiz.completed ? "Retake Quiz" : "Start Quiz"}</span>
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );
};

export default QuizCard;
