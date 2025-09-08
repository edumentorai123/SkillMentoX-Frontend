import React from "react";

interface NavigationProps {
  currentPage: number;
  totalPages: number;
  onPrevious: () => void;
  onNext: () => void;
  loadingCategories: boolean;
}

const Navigation: React.FC<NavigationProps> = ({
  currentPage,
  totalPages,
  onPrevious,
  onNext,
  loadingCategories,
  
}) => {
  return (
    <div className="flex justify-between mt-8">
      <button
        type="button"
        onClick={onPrevious}
        disabled={currentPage === 0}
        className={`py-3 px-6 text-lg font-semibold rounded-xl transition-all duration-200 ${
          currentPage === 0
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-[#0D4C5B] text-white hover:bg-[#1887A1]"
        }`}
      >
        Previous
      </button>
      {currentPage < totalPages - 1 ? (
        <button
          type="button"
          onClick={onNext}
          className="py-3 px-6 bg-[#1887A1] text-white text-lg font-semibold rounded-xl hover:bg-[#0D4C5B] focus:outline-none focus:ring-4 focus:ring-[#1887A1]/30 transition-all duration-200"
        >
          Next
        </button>
      ) : (
        <button
          type="submit"
          className="py-3 px-6 bg-[#1887A1] text-white text-lg font-semibold rounded-xl hover:bg-[#0D4C5B] focus:outline-none focus:ring-4 focus:ring-[#1887A1]/30 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          disabled={loadingCategories}
        >
          {loadingCategories ? (
            <div className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Loading...
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Save Profile
            </div>
          )}
        </button>
      )}
    </div>
  );
};

export default Navigation;