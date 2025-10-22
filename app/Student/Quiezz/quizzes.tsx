"use client";
import React, { useState, useEffect } from "react";
import axiosClient from "../../lib/axiosClient";
import {
  ChevronDown,
  Trophy,
  Clock,
  BookOpen,
  CheckCircle,
  Menu,
  X,
  Brain,
  Award,
  TrendingUp,
  Play,
  ArrowRight,
  Home,
  Star,
  Target,
} from "lucide-react";
import { useAppSelector } from "@/redux/hooks";

interface Question {
  question: string;
  options: string[];
  correct: number;
}

interface Quiz {
  _id: string;
  title: string;
  subject: string;
  difficulty: string;
  stack: string;
  questions: Question[];
  completed?: boolean;
  score?: number;
}

export default function QuizMaster() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("available");
  const [selectedSubject, setSelectedSubject] = useState("All Subjects");
  const [sortBy, setSortBy] = useState("difficulty");
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [currentQuiz, setCurrentQuiz] = useState<Quiz | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Get user token from Redux store (adjust based on your Redux state structure)
  const { token } = useAppSelector((state) => state.auth);

  // Fetch quizzes from backend
  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        setLoading(true);
        const response = await axiosClient.get("/api/quizzes", {
          params: {
            stack: selectedSubject !== "All Subjects" ? selectedSubject : undefined,
          },
        });

        if (response.data.success) {
          setQuizzes(response.data.data);
        } else {
          setError("Failed to fetch quizzes");
        }
      } catch (err) {
        console.error("Error fetching quizzes:", err);
        setError("Failed to fetch quizzes");
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, [selectedSubject, token]);

  const getDifficultyColor = (difficulty: string) => {
    const colors = {
      easy: "bg-green-50 text-green-700 border-green-200",
      medium: "bg-yellow-50 text-yellow-700 border-yellow-200",
      hard: "bg-red-50 text-red-700 border-red-200",
    };
    return (
      colors[difficulty.toLowerCase() as keyof typeof colors] ||
      "bg-gray-50 text-gray-700 border-gray-200"
    );
  };

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
        difficultyOrder[a.difficulty as keyof typeof difficultyOrder] -
        difficultyOrder[b.difficulty as keyof typeof difficultyOrder]
      );
    }
    return a.title.localeCompare(b.title);
  });

  const startQuiz = (quiz: Quiz) => {
    if (quiz.questions && quiz.questions.length > 0) {
      setCurrentQuiz(quiz);
      setCurrentQuestionIndex(0);
      setSelectedAnswer(null);
      setScore(0);
      setQuizCompleted(false);
      setCurrentPage("quiz-taking");
    }
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = async () => {
    if (
      currentQuiz &&
      selectedAnswer !== null &&
      currentQuiz.questions[currentQuestionIndex]
    ) {
      if (
        selectedAnswer === currentQuiz.questions[currentQuestionIndex].correct
      ) {
        setScore(score + 1);
      }

      if (currentQuestionIndex < currentQuiz.questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null);
      } else {
        try {
          const finalScore = score + (selectedAnswer === currentQuiz.questions[currentQuestionIndex].correct ? 1 : 0);
          const response = await axiosClient.post("/api/quizzes/complete", {
            quizId: currentQuiz._id,
            score: finalScore,
          });

          if (response.data.success) {
            setQuizzes((prev) =>
              prev.map((q) =>
                q._id === currentQuiz._id
                  ? { ...q, completed: true, score: finalScore }
                  : q
              )
            );
            setQuizCompleted(true);
          } else {
            setError("Failed to save quiz progress");
          }
        } catch (err) {
          console.error("Error completing quiz:", err);
          setError("Failed to save quiz progress");
        }
      }
    }
  };

  const resetQuiz = () => {
    setCurrentQuiz(null);
    setCurrentPage("dashboard");
    setQuizCompleted(false);
  };

  const renderNavigation = () => (
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

  const renderQuizCard = (quiz: Quiz) => (
    <div
      key={quiz._id}
      className="group bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
    >
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
        onClick={() => startQuiz(quiz)}
        disabled={!quiz.questions || quiz.questions.length === 0}
        className="group w-full py-3 px-4 bg-gradient-to-r from-[#1887A1] to-[#0D4C5B] text-white rounded-xl font-medium hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        <span>{quiz.completed ? "Retake Quiz" : "Start Quiz"}</span>
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );

  const renderQuizTaking = () => {
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

  const renderQuizzes = () => (
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
                <option>JavaScript</option>
                <option>React</option>
                <option>Python</option>
                <option>Django</option>
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
          {sortedQuizzes.map(renderQuizCard)}
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

  const renderDashboard = () => (
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
          {quizzes.slice(0, 3).map(renderQuizCard)}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Learning Progress</h3>
          <div className="space-y-4">
            {["JavaScript", "React", "Python", "Django"].map((subject) => {
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

  const renderContent = () => {
    switch (currentPage) {
      case "dashboard":
        return renderDashboard();
      case "quiz-taking":
        return renderQuizTaking();
      case "quizzes":
        return renderQuizzes();
      default:
        return renderDashboard();
    }
  };

  if (currentPage === "quiz-taking") {
    return renderQuizTaking();
  }

  return (
    <div className="min-h-screen bg-white">
      {renderNavigation()}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </main>
    </div>
  );
}