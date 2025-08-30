
"use client";
import React, { useState } from "react";
import {
  Search,
  Users,
  GraduationCap,
  FileText,
  BookOpen,
  LayoutDashboard,
  Upload,
  X,
  Plus,
  Save,
  Eye,
  Calendar,
  Clock,
  DollarSign,
  User,
  AlertCircle,
  CheckCircle,
  Image as ImageIcon,
  Video,
  FileVideo,
  FileImage,
  Trash2,
} from "lucide-react";

const AddCoursePage = () => {
  const [chooseStack, setChooseStack] = useState({
    name: "",
  });

  const [courseData, setCourseData] = useState({
    title: "",
    description: "",
    category: "",
    level: "",
    duration: "",
    prerequisites: [],
    learningObjectives: [],
    courseImage: null,
    courseVideo: null,
    materials: [],
    stacks: [], // Added to store multiple stacks
  });

  const [newPrerequisite, setNewPrerequisite] = useState("");
  const [newObjective, setNewObjective] = useState("");
  const [dragActive, setDragActive] = useState(false);

  const categories = [
    "Full Stack Web Development",
    "Backend Development",
    "Frontend Development",
    "Mobile Development",
    "Game Development",
    "Programming Languages & Frameworks",
  ];

  const levels = ["Beginner", "Intermediate", "Advanced", "Expert"];

  const durations = [
    "1 Week",
    "2 Weeks",
    "1 Month",
    "2 Months",
    "3 Months",
    "6 Months",
    "1 Year",
  ];

  const handleInputChange = (field, value) => {
    setCourseData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handlechooseinput = (field, value) => {
    setChooseStack((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const addStack = () => {
    if (chooseStack.name.trim()) {
      setCourseData((prev) => ({
        ...prev,
        stacks: [...prev.stacks, chooseStack.name.trim()],
      }));
      setChooseStack({ name: "" });
    }
  };

  const removeStack = (index) => {
    setCourseData((prev) => ({
      ...prev,
      stacks: prev.stacks.filter((_, i) => i !== index),
    }));
  };

  const addPrerequisite = () => {
    if (newPrerequisite.trim()) {
      setCourseData((prev) => ({
        ...prev,
        prerequisites: [...prev.prerequisites, newPrerequisite.trim()],
      }));
      setNewPrerequisite("");
    }
  };

  const removePrerequisite = (index) => {
    setCourseData((prev) => ({
      ...prev,
      prerequisites: prev.prerequisites.filter((_, i) => i !== index),
    }));
  };

  const addObjective = () => {
    if (newObjective.trim()) {
      setCourseData((prev) => ({
        ...prev,
        learningObjectives: [...prev.learningObjectives, newObjective.trim()],
      }));
      setNewObjective("");
    }
  };

  const removeObjective = (index) => {
    setCourseData((prev) => ({
      ...prev,
      learningObjectives: prev.learningObjectives.filter((_, i) => i !== index),
    }));
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith("image/")) {
        setCourseData((prev) => ({ ...prev, courseImage: file }));
      }
    }
  };

  const handleFileUpload = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      setCourseData((prev) => ({ ...prev, [type]: file }));
    }
  };

  const handleSaveCourse = () => {
    console.log("Course data:", courseData);
    console.log("Stack data:", chooseStack);
    alert("Course saved successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-500 to-teal-600 px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">
                Add New Course
              </h2>
              <p className="text-teal-100">
                Create and configure a new course for the platform
              </p>
            </div>
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search users, Mentors or reports"
                className="w-80 pl-10 pr-4 py-2 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-white/20"
              />
            </div>
          </div>
        </div>

        <div className="">
          <div className="max-w-7xl mx-auto">
            {/* Course Form */}
            <div className="bg-white border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">
                  Course Information
                </h3>
                <p className="text-gray-600 text-sm mt-1">
                  Fill in the details for your new course
                </p>
              </div>

              <div className="p-6 space-y-6">
                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Course Title *
                    </label>
                    <input
                      type="text"
                      value={courseData.title}
                      onChange={(e) =>
                        handleInputChange("title", e.target.value)
                      }
                      placeholder="Enter course title"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>  

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Choose a Stack or Language
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={chooseStack.name}
                        onChange={(e) =>
                          handlechooseinput("name", e.target.value)
                        }
                        placeholder="Enter stack or language"
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        onKeyPress={(e) => e.key === "Enter" && addStack()}
                      />
                      <button
                        onClick={addStack}
                        className="px-4 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    {/* Display added stacks */}
                    <div className="flex flex-wrap gap-2 mt-2">
                      {courseData.stacks.map((stack, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                        >
                          {stack}
                          <button
                            onClick={() => removeStack(index)}
                            className="hover:text-blue-600"
                          >
                            <X size={14} />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Level *
                    </label>
                    <select
                      value={courseData.level}
                      onChange={(e) =>
                        handleInputChange("level", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    >
                      <option value="">Select level</option>
                      {levels.map((level) => (
                        <option key={level} value={level}>
                          {level}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Duration *
                    </label>
                    <select
                      value={courseData.duration}
                      onChange={(e) =>
                        handleInputChange("duration", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    >
                      <option value="">Select duration</option>
                      {durations.map((duration) => (
                        <option key={duration} value={duration}>
                          {duration}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Course Description *
                  </label>
                  <textarea
                    value={courseData.description}
                    onChange={(e) =>
                      handleInputChange("description", e.target.value)
                    }
                    placeholder="Provide a detailed description of the course"
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>

                {/* Prerequisites */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Prerequisites
                  </label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={newPrerequisite}
                      onChange={(e) => setNewPrerequisite(e.target.value)}
                      placeholder="Add prerequisite"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      onKeyPress={(e) => e.key === "Enter" && addPrerequisite()}
                    />
                    <button
                      onClick={addPrerequisite}
                      className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {courseData.prerequisites.map((prereq, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-sm"
                      >
                        {prereq}
                        <button
                          onClick={() => removePrerequisite(index)}
                          className="hover:text-teal-600"
                        >
                          <X size={14} />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Learning Objectives */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Learning Objectives
                  </label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={newObjective}
                      onChange={(e) => setNewObjective(e.target.value)}
                      placeholder="Add learning objective"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      onKeyPress={(e) => e.key === "Enter" && addObjective()}
                    />
                    <button
                      onClick={addObjective}
                      className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <div className="space-y-2">
                    {courseData.learningObjectives.map((objective, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <span className="text-sm text-gray-700">
                          {objective}
                        </span>
                        <button
                          onClick={() => removeObjective(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* File Uploads */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Course Image */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Course Image
                    </label>
                    <div
                      className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                        dragActive
                          ? "border-teal-500 bg-teal-50"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                    >
                      {courseData.courseImage ? (
                        <div className="flex items-center justify-center space-x-2">
                          <FileImage className="text-teal-600" size={24} />
                          <span className="text-sm text-gray-700">
                            {courseData.courseImage.name}
                          </span>
                          <button
                            onClick={() =>
                              setCourseData((prev) => ({
                                ...prev,
                                courseImage: null,
                              }))
                            }
                            className="text-red-500 hover:text-red-700"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ) : (
                        <div>
                          <ImageIcon
                            className="mx-auto text-gray-400 mb-2"
                            size={32}
                          />
                          <p className="text-sm text-gray-600 mb-2">
                            Drag and drop an image here, or
                            <label className="text-teal-600 hover:text-teal-700 cursor-pointer ml-1">
                              browse
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) =>
                                  handleFileUpload(e, "courseImage")
                                }
                                className="hidden"
                              />
                            </label>
                          </p>
                          <p className="text-xs text-gray-500">
                            PNG, JPG up to 5MB
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Course Video */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Course Preview Video
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                      {courseData.courseVideo ? (
                        <div className="flex items-center justify-center space-x-2">
                          <FileVideo className="text-teal-600" size={24} />
                          <span className="text-sm text-gray-700">
                            {courseData.courseVideo.name}
                          </span>
                          <button
                            onClick={() =>
                              setCourseData((prev) => ({
                                ...prev,
                                courseVideo: null,
                              }))
                            }
                            className="text-red-500 hover:text-red-700"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ) : (
                        <div>
                          <Video
                            className="mx-auto text-gray-400 mb-2"
                            size={32}
                          />
                          <p className="text-sm text-gray-600 mb-2">
                            <label className="text-teal-600 hover:text-teal-700 cursor-pointer">
                              Upload video
                              <input
                                type="file"
                                accept="video/*"
                                onChange={(e) =>
                                  handleFileUpload(e, "courseVideo")
                                }
                                className="hidden"
                              />
                            </label>
                          </p>
                          <p className="text-xs text-gray-500">
                            MP4, MOV up to 100MB
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="px-6 py-4 bg-gray-50 rounded-b-xl flex items-center justify-between">
                <div className="flex items-center text-sm text-gray-500">
                  <AlertCircle size={16} className="mr-2" />
                  Fields marked with * are required
                </div>
                <div className="flex space-x-3">
                  <button className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center space-x-2">
                    <Eye size={16} />
                    <span>Preview</span>
                  </button>
                  <button className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center space-x-2">
                    <Save size={16} />
                    <span>Save as Draft</span>
                  </button>
                  <button
                    onClick={handleSaveCourse}
                    className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors flex items-center space-x-2"
                  >
                    <CheckCircle size={16} />
                    <span>Publish Course</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCoursePage;
