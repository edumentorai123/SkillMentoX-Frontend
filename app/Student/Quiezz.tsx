"use client";
import React, { useState, useEffect } from "react";
import {
  ChevronDown,
  Trophy,
  Clock,
  BookOpen,
  BarChart3,
  MessageSquare,
  User,
  Home,
  CheckCircle,
} from "lucide-react";

interface Question {
  question: string;
  options: string[];
  correct: number;
}

interface Quiz {
  id: number;
  title: string;
  subject: string;
  difficulty: string;
  questions: number;
  completed: boolean;
  questions_data: Question[];
}

const initialQuizzes: Quiz[] = [
  {
    id: 1,
    title: "JavaScript Basics",
    subject: "JavaScript",
    difficulty: "Easy",
    questions: 15,
    completed: false,
    questions_data: [
      {
        question:
          "What is the correct way to declare a variable in JavaScript?",
        options: [
          "var x = 5;",
          "variable x = 5;",
          "v x = 5;",
          "declare x = 5;",
        ],
        correct: 0,
      },
      {
        question:
          "Which method is used to add an element to the end of an array?",
        options: ["push()", "pop()", "shift()", "unshift()"],
        correct: 0,
      },
      {
        question: "What does '===' operator do in JavaScript?",
        options: [
          "Assignment",
          "Comparison with type coercion",
          "Strict equality comparison",
          "Logical AND",
        ],
        correct: 2,
      },
    ],
  },
  {
    id: 2,
    title: "JavaScript Basics",
    subject: "JavaScript",
    difficulty: "Medium",
    questions: 25,
    completed: false,
    questions_data: [
      {
        question: "What is closure in JavaScript?",
        options: [
          "A way to close the browser",
          "A function with access to outer scope",
          "A CSS property",
          "A loop structure",
        ],
        correct: 1,
      },
      {
        question: "What is the difference between 'let' and 'var'?",
        options: [
          "No difference",
          "let has block scope, var has function scope",
          "var is newer",
          "let is faster",
        ],
        correct: 1,
      },
    ],
  },
  {
    id: 3,
    title: "JavaScript Basics",
    subject: "JavaScript",
    difficulty: "Medium",
    questions: 25,
    completed: true,
    questions_data: [],
  },
  {
    id: 4,
    title: "JavaScript Basics",
    subject: "JavaScript",
    difficulty: "Easy",
    questions: 15,
    completed: false,
    questions_data: [],
  },
  {
    id: 5,
    title: "JavaScript Basics",
    subject: "JavaScript",
    difficulty: "Hard",
    questions: 25,
    completed: false,
    questions_data: [],
  },
];

export default function QuizMaster() {
  const [quizzes, setQuizzes] = useState<Quiz[]>(initialQuizzes);
  const [activeTab, setActiveTab] = useState("My Quizzes");
  const [selectedSubject, setSelectedSubject] = useState("All Subjects");
  const [sortBy, setSortBy] = useState("Sort by Difficulty");
  const [currentPage, setCurrentPage] = useState("quizzes");
  const [currentQuiz, setCurrentQuiz] = useState<Quiz | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const sidebarItems = [
    { name: "Dashboard", icon: Home, page: "dashboard" },
    { name: "My Doubts", icon: MessageSquare, page: "doubts" },
    { name: "Chats", icon: MessageSquare, page: "chats" },
    { name: "Quizzes", icon: BookOpen, page: "quizzes" },
    { name: "Course", icon: BookOpen, page: "course" },
    { name: "Progress", icon: BarChart3, page: "progress" },
  ];

  const getDifficultyColor = (difficulty: string) => {
    const colors = {
      easy: "bg-green-100 text-green-800 border-green-200",
      medium: "bg-orange-100 text-orange-800 border-orange-200",
      hard: "bg-red-100 text-red-800 border-red-200",
    };
    return (
      colors[difficulty.toLowerCase() as keyof typeof colors] ||
      "bg-gray-100 text-gray-800 border-gray-200"
    );
  };

  const filteredQuizzes = quizzes.filter((quiz) => {
    const subjectFilter =
      selectedSubject === "All Subjects" || quiz.subject === selectedSubject;
    const tabFilter =
      activeTab === "My Quizzes" ? !quiz.completed : quiz.completed;
    return subjectFilter && tabFilter;
  });

  const sortedQuizzes = [...filteredQuizzes].sort((a, b) => {
    if (sortBy === "Sort by Difficulty") {
      const difficultyOrder = { Easy: 1, Medium: 2, Hard: 3 };
      return (
        difficultyOrder[a.difficulty as keyof typeof difficultyOrder] -
        difficultyOrder[b.difficulty as keyof typeof difficultyOrder]
      );
    }
    return 0;
  });

  const startQuiz = (quiz: Quiz) => {
    if (quiz.questions_data && quiz.questions_data.length > 0) {
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

  const handleNextQuestion = () => {
    if (
      currentQuiz &&
      selectedAnswer !== null &&
      currentQuiz.questions_data[currentQuestionIndex]
    ) {
      if (
        selectedAnswer ===
        currentQuiz.questions_data[currentQuestionIndex].correct
      ) {
        setScore(score + 1);
      }

      if (currentQuestionIndex < currentQuiz.questions_data.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null);
      } else {
        setQuizCompleted(true);
        setQuizzes((prev) =>
          prev.map((q) =>
            q.id === currentQuiz.id ? { ...q, completed: true } : q
          )
        );
      }
    }
  };

  const resetQuiz = () => {
    setCurrentQuiz(null);
    setCurrentPage("quizzes");
    setQuizCompleted(false);
  };

  const renderQuizCard = (quiz: Quiz) => (
    <div
      key={quiz.id}
      className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {quiz.title}
        </h3>
        <div className="flex items-center gap-2 mb-3">
          <span className="px-3 py-1 bg-teal-600 text-white text-xs rounded-full font-medium">
            {quiz.subject}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span
            className={`px-3 py-1 text-xs font-medium rounded-full border ${getDifficultyColor(
              quiz.difficulty
            )}`}
          >
            {quiz.difficulty}
          </span>
          <div className="flex items-center gap-1 text-gray-600">
            <Trophy className="w-4 h-4" />
            <span className="text-sm">{quiz.questions} Questions</span>
          </div>
        </div>
      </div>
      <button
        onClick={() => startQuiz(quiz)}
        className="w-full py-2 px-4 bg-white border-2 border-teal-600 text-teal-600 rounded-lg font-medium hover:bg-teal-50 transition-colors"
      >
        Start Quiz
      </button>
    </div>
  );

  const renderQuizTaking = () => {
    if (!currentQuiz) return null;

    if (quizCompleted) {
      const percentage = Math.round(
        (score / currentQuiz.questions_data.length) * 100
      );
      return (
        <div className="max-w-2xl mx-auto bg-white rounded-xl border border-gray-200 p-8 text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Quiz Completed!
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            You scored {score} out of {currentQuiz.questions_data.length} (
            {percentage}%)
          </p>
          <button
            onClick={resetQuiz}
            className="px-6 py-3 bg-teal-600 text-white rounded-lg font-medium hover:bg-teal-700 transition-colors"
          >
            Back to Quizzes
          </button>
        </div>
      );
    }

    const currentQuestion = currentQuiz.questions_data[currentQuestionIndex];

    return (
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-xl border border-gray-200 p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              {currentQuiz.title}
            </h2>
            <span className="text-sm text-gray-500">
              {currentQuestionIndex + 1} of {currentQuiz.questions_data.length}
            </span>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
            <div
              className="bg-teal-600 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${
                  ((currentQuestionIndex + 1) /
                    currentQuiz.questions_data.length) *
                  100
                }%`,
              }}
            ></div>
          </div>

          <h3 className="text-lg font-medium text-gray-900 mb-6">
            {currentQuestion.question}
          </h3>

          <div className="space-y-3 mb-8">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`w-full p-4 text-left border-2 rounded-lg transition-colors ${
                  selectedAnswer === index
                    ? "border-teal-600 bg-teal-50 text-teal-900"
                    : "border-gray-200 hover:border-gray-300 text-gray-700"
                }`}
              >
                <span className="font-medium mr-3">
                  {String.fromCharCode(65 + index)}.
                </span>
                {option}
              </button>
            ))}
          </div>

          <div className="flex justify-between">
            <button
              onClick={resetQuiz}
              className="px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Exit Quiz
            </button>
            <button
              onClick={handleNextQuestion}
              disabled={selectedAnswer === null}
              className="px-6 py-3 bg-teal-600 text-white rounded-lg font-medium hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {currentQuestionIndex === currentQuiz.questions_data.length - 1
                ? "Finish Quiz"
                : "Next Question"}
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderQuizzes = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">QuizMaster</h1>
        <p className="text-teal-100">
          Master your knowledge with interactive quizzes
        </p>
      </div>

      <div className="flex gap-4">
        <div className="relative">
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-10 text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
          >
            <option>All Subjects</option>
            <option>JavaScript</option>
            <option>Python</option>
            <option>React</option>
          </select>
          <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>

        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-10 text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
          >
            <option>Sort by Difficulty</option>
            <option>Sort by Name</option>
            <option>Sort by Questions</option>
          </select>
          <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>
      </div>

      <div className="flex gap-1 bg-white bg-opacity-10 rounded-lg p-1">
        <button
          onClick={() => setActiveTab("My Quizzes")}
          className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
            activeTab === "My Quizzes"
              ? "bg-teal-700 text-white"
              : "text-teal-100 hover:text-white"
          }`}
        >
          My Quizzes
        </button>
        <button
          onClick={() => setActiveTab("Completed")}
          className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
            activeTab === "Completed"
              ? "bg-teal-700 text-white"
              : "text-teal-100 hover:text-white"
          }`}
        >
          Completed
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {sortedQuizzes.map(renderQuizCard)}
      </div>
    </div>
  );

  const renderDashboard = () => (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Quizzes</p>
              <p className="text-2xl font-bold text-gray-900">
                {quizzes.length}
              </p>
            </div>
            <BookOpen className="w-8 h-8 text-teal-600" />
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-gray-900">
                {quizzes.filter((q) => q.completed).length}
              </p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">In Progress</p>
              <p className="text-2xl font-bold text-gray-900">
                {quizzes.filter((q) => !q.completed).length}
              </p>
            </div>
            <Clock className="w-8 h-8 text-orange-600" />
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
      default:
        return renderQuizzes();
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="w-64 bg-white shadow-sm border-r border-gray-200">
        <div className="p-6">
          <h1 className="text-xl font-bold text-teal-600">SkillMentorX</h1>
        </div>

        <nav className="mt-6">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.name}
                onClick={() => setCurrentPage(item.page)}
                className={`w-full flex items-center px-6 py-3 text-left font-medium transition-colors ${
                  currentPage === item.page
                    ? "bg-teal-600 text-white"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                <Icon className="w-5 h-5 mr-3" />
                {item.name}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="flex-1 overflow-auto">
        <div
          className={`${
            currentPage === "quiz-taking"
              ? "bg-gray-50"
              : "bg-gradient-to-br from-teal-600 to-teal-700"
          } min-h-full`}
        >
          <div className="max-w-7xl mx-auto px-6 py-8">{renderContent()}</div>
        </div>
      </div>
    </div>
  );
}
