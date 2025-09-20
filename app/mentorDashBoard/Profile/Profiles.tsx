"use client";
import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar";
import axiosClient from "@/app/lib/axiosClient";

export default function ProfileSection() {
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    specialization: "",
    bio: "",
    currentRole: "",
    company: "",
    yearsOfExperience: 0,
    education: [],
    certifications: [],
    courses: [],
    linkedin: "",
    github: "",
    portfolio: "",
    gender: "",
    phoneNumber: "",
    documents: {},
   
  });

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchMentorData = async () => {
      try {
        setLoading(true);

        const storedMentor = localStorage.getItem("auth");
        if (!storedMentor) {
          setError("No mentor data found. Please login again.");
          setLoading(false);
          return;
        }

        let mentorObj;
        try {
          mentorObj = JSON.parse(storedMentor);
        } catch (parseError) {
          setError("Invalid mentor data format. Please login again.");
          setLoading(false);
          return;
        }

        const mentorId = mentorObj?.user?.id;
        if (!mentorId) {
          setError("Invalid mentor data. Please login again.");
          setLoading(false);
          return;
        }

        const response = await axiosClient.get(`/api/mentor/profile`);
        if (!response.data.data) {
          throw new Error("No mentor data returned from API.");
        }

        const mentorData = response.data.data;
        setFormData({
          firstName: mentorData.fullName || "",
          email: mentorData.email || "",
          specialization: mentorData.headline || "",
          bio: mentorData.bio || "",
          currentRole: mentorData.currentRole || "",
          company: mentorData.company || "",
          yearsOfExperience: mentorData.yearsOfExperience || 0,
          education: mentorData.education || [],
          certifications: mentorData.certifications || [],
          courses: mentorData.courses || [],
          linkedin: mentorData.linkedin || "",
          github: mentorData.github || "",
          portfolio: mentorData.portfolio || "",
          gender: mentorData.gender || "",
          phoneNumber: mentorData.phoneNumber || "",
          documents: mentorData.documents || {}
         
        });
        setError(null);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to fetch mentor details.");
        console.error("Error fetching mentor data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMentorData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const payload = {
        fullName: formData.firstName,
        email: formData.email,
        headline: formData.specialization,
        bio: formData.bio,
        currentRole: formData.currentRole,
        company: formData.company,
        yearsOfExperience: formData.yearsOfExperience,
        education: formData.education,
        certifications: formData.certifications,
        courses: formData.courses,
        linkedin: formData.linkedin,
        github: formData.github,
        portfolio: formData.portfolio,
        gender: formData.gender,
        phoneNumber: formData.phoneNumber,
      };

      const response = await axiosClient.post("/api/mentor/updateProfile", payload);
      if (response.data.success) {
        setSuccessMessage("Profile updated successfully.");
      } else {
        setError("Failed to update profile.");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to update profile.");
      console.error("Error updating profile:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <div className="h-screen bg-gray-50 flex overflow-hidden">
      {/* Sidebar - Fixed and Sticky */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:block flex-shrink-0 sticky top-0 h-full overflow-y-auto">
        <Sidebar
          sidebarCollapsed={sidebarCollapsed}
          setSidebarCollapsed={setSidebarCollapsed}
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />
      </aside>

      {/* Main Content - Scrollable */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-6 md:p-10 space-y-6">
          {successMessage && (
            <div className="mb-4 p-4 bg-green-100 text-green-800 rounded">{successMessage}</div>
          )}

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Profile Information</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* First Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your first name"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your email"
                />
              </div>

              {/* Specialization */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Specialization</label>
                <input
                  type="text"
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your specialization"
                />
              </div>

              {/* Bio */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Write a short bio"
                ></textarea>
              </div>

              {/* Current Role */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Current Role</label>
                <input
                  type="text"
                  name="currentRole"
                  value={formData.currentRole}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your current role"
                />
              </div>

              {/* Company */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your company"
                />
              </div>

              {/* Years of Experience */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Years of Experience</label>
                <input
                  type="number"
                  name="yearsOfExperience"
                  value={formData.yearsOfExperience}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter years of experience"
                />
              </div>

              {/* LinkedIn */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn</label>
                <input
                  type="text"
                  name="linkedin"
                  value={formData.linkedin}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your LinkedIn URL"
                />
              </div>

              {/* GitHub */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">GitHub</label>
                <input
                  type="text"
                  name="github"
                  value={formData.github}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your GitHub URL"
                />
              </div>

              {/* Portfolio */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Portfolio</label>
                <input
                  type="text"
                  name="portfolio"
                  value={formData.portfolio}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your portfolio URL"
                />
              </div>

              {/* Gender */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                <input
                  type="text"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your gender"
                />
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your phone number"
                />
              </div>

              {/* Save Button */}
              <div className="flex space-x-3">
                <button
                  type="submit"
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>

          {/* Skills & Expertise */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Skills & Expertise</h3>
            <div className="flex flex-wrap gap-2">
              {formData.specialization ? (
                formData.specialization.split(",").map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                  >
                    {skill.trim()}
                  </span>
                ))
              ) : (
                <p className="text-gray-500">No skills added yet.</p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
