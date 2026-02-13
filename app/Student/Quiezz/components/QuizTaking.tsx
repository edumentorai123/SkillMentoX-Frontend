import React from "react";
import { ArrowLeft, ArrowRight, Trophy, Star, Target, CheckCircle, Brain, X } from "lucide-react";
import { Quiz } from "../types";

interface QuizTakingProps {
  currentQuiz: Quiz | null;
  currentQuestionIndex: number;
  selectedAnswer: number | null;
  score: number;
  quizCompleted: boolean;
  handleAnswerSelect: (index: number) => void;
  handleNextQuestion: () => void;
  resetQuiz: () => void;
  startQuiz: (quiz: Quiz) => void;
}

const QuizTaking: React.FC<QuizTakingProps> = ({
  currentQuiz,
  currentQuestionIndex,
  selectedAnswer,
  score,
  quizCompleted,
  handleAnswerSelect,
  handleNextQuestion,
  resetQuiz,
  startQuiz
}) => {
  if (!currentQuiz) return null;

  if (quizCompleted) {
    const percentage = Math.round((score / currentQuiz.questions.length) * 100);
    const isExcellent = percentage >= 90;
    const isGood = percentage >= 70;
    const isPassed = percentage >= 60;

    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1887A1] to-[#0D4C5B] flex items-center justify-center p-4">
        <div className="max-w-lg w-full bg-white rounded-3xl p-8 text-center shadow-2xl">
          <div
            className={`w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center ${
              isExcellent
                ? "bg-green-100"
                : isGood
                ? "bg-blue-100"
                : isPassed
                ? "bg-yellow-100"
                : "bg-red-100"
            }`}
          >
            {isExcellent ? (
              <Trophy className="w-12 h-12 text-green-500" />
            ) : isGood ? (
              <Star className="w-12 h-12 text-blue-500" />
            ) : isPassed ? (
              <Target className="w-12 h-12 text-yellow-500" />
            ) : (
              <CheckCircle className="w-12 h-12 text-red-500" />
            )}
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            {isExcellent
              ? "Outstanding!"
              : isGood
              ? "Well Done!"
              : isPassed
              ? "Good Job!"
              : "Keep Learning!"}
          </h2>

          <p className="text-lg text-gray-600 mb-6">
            You scored{" "}
            <span className="font-bold text-[#1887A1]">{score}</span> out of{" "}
            <span className="font-bold">{currentQuiz.questions.length}</span>{" "}
            questions correctly
          </p>

          <div className="mb-8">
            <div className="text-5xl font-bold text-[#1887A1] mb-4">
              {percentage}%
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
              <div
                className={`h-4 rounded-full transition-all duration-1000 ${
                  isExcellent
                    ? "bg-green-500"
                    : isGood
                    ? "bg-blue-500"
                    : isPassed
                    ? "bg-yellow-500"
                    : "bg-red-500"
                }`}
                style={{ width: `${percentage}%` }}
              />
            </div>
            <p className="text-sm text-gray-500">
              {isExcellent
                ? "Perfect score! You're a master!"
                : isGood
                ? "Great job! You know your stuff!"
                : isPassed
                ? "Good effort! Room for improvement."
                : "Don't give up! Practice makes perfect."}
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => startQuiz(currentQuiz)}
              className="flex-1 py-3 px-4 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
            >
              Retake Quiz
            </button>
            <button
              onClick={resetQuiz}
              className="flex-1 py-3 px-4 bg-gradient-to-r from-[#1887A1] to-[#0D4C5B] text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-200"
            >
              Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = currentQuiz.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / currentQuiz.questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1887A1] to-[#0D4C5B]">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-white mb-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">{currentQuiz.title}</h2>
              <p className="text-white text-opacity-80">{currentQuiz.subject}</p>
            </div>
            <div className="mt-4 sm:mt-0 text-right">
              <div className="text-3xl font-bold">
                {currentQuestionIndex + 1}/{currentQuiz.questions.length}
              </div>
              <p className="text-sm text-white text-opacity-80">Questions</p>
            </div>
          </div>

          <div className="w-full bg-white bg-opacity-20 rounded-full h-3">
            <div
              className="bg-white h-3 rounded-full transition-all duration-500 shadow-lg"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-white text-opacity-80 text-sm mt-2">
            {Math.round(progress)}% Complete
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-2xl">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 leading-relaxed">
            {currentQuestion.question}
          </h3>

          <div className="space-y-4 mb-10">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`w-full p-6 text-left border-2 rounded-2xl transition-all duration-200 ${
                  selectedAnswer === index
                    ? "border-[#1887A1] bg-[#1887A1] bg-opacity-10 text-[#1887A1] shadow-lg transform scale-[1.02]"
                    : "border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700 hover:shadow-md"
                }`}
              >
                <div className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold mr-4 ${
                      selectedAnswer === index
                        ? "bg-[#1887A1] text-white"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {String.fromCharCode(65 + index)}
                  </div>
                  <span className="font-medium text-lg">{option}</span>
                </div>
              </button>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <button
              onClick={resetQuiz}
              className="px-6 py-3 text-gray-500 hover:text-gray-700 transition-colors font-medium"
            >
              Exit Quiz
            </button>

            <button
              onClick={handleNextQuestion}
              disabled={selectedAnswer === null}
              className="px-8 py-4 bg-gradient-to-r from-[#1887A1] to-[#0D4C5B] text-white rounded-xl font-semibold hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
            >
              {currentQuestionIndex === currentQuiz.questions.length - 1
                ? "Finish Quiz"
                : "Next Question"}
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizTaking;
