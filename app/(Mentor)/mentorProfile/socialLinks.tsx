"use client";
import { useFormContext } from "react-hook-form";

interface MentorFormData {
  linkedin: string;
  github: string;
  portfolio: string;
}

const SocialLinks = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<MentorFormData>();

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
        <span className="mr-2">🔗</span>
        Social Links
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            LinkedIn
          </label>
          <input
            {...register("linkedin", {
              pattern: {
                value: /^https?:\/\/(www\.)?linkedin\.com\//,
                message: "Invalid LinkedIn URL",
              },
            })}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 bg-white/50"
            type="url"
            placeholder="https://linkedin.com/in/yourprofile"
          />
          {errors.linkedin && (
            <p className="text-red-500 text-sm mt-1 flex items-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              {errors.linkedin.message}
            </p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            GitHub
          </label>
          <input
            {...register("github", {
              pattern: {
                value: /^https?:\/\/(www\.)?github\.com\//,
                message: "Invalid GitHub URL",
              },
            })}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 bg-white/50"
            type="url"
            placeholder="https://github.com/yourusername"
          />
          {errors.github && (
            <p className="text-red-500 text-sm mt-1 flex items-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              {errors.github.message}
            </p>
          )}
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Portfolio
          </label>
          <input
            {...register("portfolio", {
              pattern: { value: /^https?:\/\/.*/, message: "Invalid URL" },
            })}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 bg-white/50"
            type="url"
            placeholder="https://yourportfolio.com"
          />
          {errors.portfolio && (
            <p className="text-red-500 text-sm mt-1 flex items-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              {errors.portfolio.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SocialLinks;