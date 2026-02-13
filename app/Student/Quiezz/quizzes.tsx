"use client";
import React, { useState, useEffect } from "react";
import axiosClient from "../../lib/axiosClient";
import { useAppSelector } from "@/redux/hooks";
import { Quiz } from "./types";
import QuizNavigation from "./components/QuizNavigation";
import QuizDashboard from "./components/QuizDashboard";
import QuizList from "./components/QuizList";
import QuizTaking from "./components/QuizTaking";

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

  // Get user token from Redux store
  const { token } = useAppSelector((state) => state.auth);

  // Fetch quizzes from backend
  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        setLoading(true);
        const response = await axiosClient.get("/api/quizzes");

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
  }, [token]);

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

  const renderContent = () => {
    switch (currentPage) {
      case "dashboard":
        return (
          <QuizDashboard 
            quizzes={quizzes}
            setCurrentPage={setCurrentPage}
            startQuiz={startQuiz}
            setActiveTab={setActiveTab}
            getDifficultyColor={getDifficultyColor}
          />
        );
      case "quiz-taking":
        return (
          <QuizTaking 
            currentQuiz={currentQuiz}
            currentQuestionIndex={currentQuestionIndex}
            selectedAnswer={selectedAnswer}
            score={score}
            quizCompleted={quizCompleted}
            handleAnswerSelect={handleAnswerSelect}
            handleNextQuestion={handleNextQuestion}
            resetQuiz={resetQuiz}
            startQuiz={startQuiz}
          />
        );
      case "quizzes":
        return (
          <QuizList 
            quizzes={quizzes}
            loading={loading}
            error={error}
            selectedSubject={selectedSubject}
            setSelectedSubject={setSelectedSubject}
            sortBy={sortBy}
            setSortBy={setSortBy}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            startQuiz={startQuiz}
            getDifficultyColor={getDifficultyColor}
          />
        );
      default:
        return (
          <QuizDashboard 
            quizzes={quizzes}
            setCurrentPage={setCurrentPage}
            startQuiz={startQuiz}
            setActiveTab={setActiveTab}
            getDifficultyColor={getDifficultyColor}
          />
        );
    }
  };

  if (currentPage === "quiz-taking") {
    // Render quiz taking without navigation
    return (
      <QuizTaking 
        currentQuiz={currentQuiz}
        currentQuestionIndex={currentQuestionIndex}
        selectedAnswer={selectedAnswer}
        score={score}
        quizCompleted={quizCompleted}
        handleAnswerSelect={handleAnswerSelect}
        handleNextQuestion={handleNextQuestion}
        resetQuiz={resetQuiz}
        startQuiz={startQuiz}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <QuizNavigation 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </main>
    </div>
  );
}