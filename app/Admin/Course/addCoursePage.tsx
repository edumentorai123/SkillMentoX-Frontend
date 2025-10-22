

"use client";
import React, { useState } from "react";
import {
  Search,
  Plus,
  X,
  Save,
  Eye,
  CheckCircle,
  Trash2,
  Upload,
  Image as ImageIcon,
  FileVideo,
} from "lucide-react";

const AddCoursePage = () => {
  const [chooseStack, setChooseStack] = useState({
    name: "",
  });

  const [courseData, setCourseData] = useState({
    title: "",
    subtitle: "", // Added string field
    description: "",
    category: "",
    level: "",
    duration: "",
    isFree: false, // Added boolean field
    prerequisites: [],
    learningObjectives: [],
    courseImage: null,
    courseVideo: null,
    materials: [],
    stacks: [],
  });

  const [newPrerequisite, setNewPrerequisite] = useState("");
  const [newObjective, setNewObjective] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [errors, setErrors] = useState({});

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

  const handleInputChange = (field: string, value: any) => {
    setCourseData((prev) => ({
      ...prev,
      [field]: value,
    }));
    // Clear error for the field when user starts typing
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleChooseInput = (field: string, value: string) => {
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

  const removeStack = (index: number) => {
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

  const removePrerequisite = (index: number) => {
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

  const removeObjective = (index: number) => {
    setCourseData((prev) => ({
      ...prev,
      learningObjectives: prev.learningObjectives.filter((_, i) => i !== index),
    }));
  };

  const handleDrag = (e: React.DragEvent, type: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(type);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent, type: string) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (type === "courseImage" && file.type.startsWith("image/")) {
        setCourseData((prev) => ({ ...prev, courseImage: file }));
      } else if (type === "courseVideo" && file.type.startsWith("video/")) {
        setCourseData((prev) => ({ ...prev, courseVideo: file }));
      } else if (type === "materials") {
        setCourseData((prev) => ({
          ...prev,
          materials: [...prev.materials, file],
        }));
      }
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
    const file = e.target.files?.[0];
    if (file) {
      if (type === "courseImage" && !file.type.startsWith("image/")) {
        setErrors((prev) => ({
          ...prev,
          courseImage: "Please upload a valid image file",
        }));
        return;
      } else if (type === "courseVideo" && !file.type.startsWith("video/")) {
        setErrors((prev) => ({
          ...prev,
          courseVideo: "Please upload a valid video file",
        }));
        return;
      }
      setCourseData((prev) => ({
        ...prev,
        [type]: type === "materials" ? [...prev.materials, file] : file,
      }));
      setErrors((prev) => ({ ...prev, [type]: "" }));
    }
  };

  const removeFile = (type: string, index: number | null = null) => {
    if (type === "materials" && index !== null) {
      setCourseData((prev) => ({
        ...prev,
        materials: prev.materials.filter((_, i) => i !== index),
      }));
    } else {
      setCourseData((prev) => ({ ...prev, [type]: null }));
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!courseData.title.trim()) newErrors.title = "Course title is required";
    if (!courseData.category) newErrors.category = "Category is required";
    if (!courseData.level) newErrors.level = "Level is required";
    if (!courseData.duration) newErrors.duration = "Duration is required";
    if (!courseData.description.trim())
      newErrors.description = "Description is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveCourse = () => {
    if (!validateForm()) {
      console.log("Validation failed:", errors);
      return;
    }
    console.log("Course data:", courseData);
    console.log("Stack data:", chooseStack);
    console.log("Course saved successfully!");
  };

  const resetForm = () => {
    setCourseData({
      title: "",
      subtitle: "",
      description: "",
      category: "",
      level: "",
      duration: "",
      isFree: false,
      prerequisites: [],
      learningObjectives: [],
      courseImage: null,
      courseVideo: null,
      materials: [],
      stacks: [],
    });
    setChooseStack({ name: "" });
    setNewPrerequisite("");
    setNewObjective("");
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
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
                aria-hidden="true"
              />
              <input
                type="text"
                placeholder="Search users, Mentors or reports"
                className="w-80 pl-10 pr-4 py-2 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-white/20"
                aria-label="Search users, mentors, or reports"
              />
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="max-w-7xl mx-auto">
            {/* Course Form */}
            <div className="bg-white border border-gray-200 rounded-xl">
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
                    <label
                      htmlFor="title"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Course Title *
                    </label>
                    <input
                      id="title"
                      type="text"
                      value={courseData.title}
                      onChange={(e) => handleInputChange("title", e.target.value)}
                      placeholder="Enter course title"
                      className={`w-full px-4 py-3 border ${
                        errors.title ? "border-red-500" : "border-gray-300"
                      } rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent`}
                      aria-required="true"
                    />
                    {errors.title && (
                      <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="subtitle"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Course Subtitle
                    </label>
                    <input
                      id="subtitle"
                      type="text"
                      value={courseData.subtitle}
                      onChange={(e) =>
                        handleInputChange("subtitle", e.target.value)
                      }
                      placeholder="Enter course subtitle"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="category"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Category *
                    </label>
                    <select
                      id="category"
                      value={courseData.category}
                      onChange={(e) =>
                        handleInputChange("category", e.target.value)
                      }
                      className={`w-full px-4 py-3 border ${
                        errors.category ? "border-red-500" : "border-gray-300"
                      } rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent`}
                      aria-required="true"
                    >
                      <option value="">Select category</option>
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                    {errors.category && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.category}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="stack"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Choose a Stack or Language
                    </label>
                    <div className="flex gap-2">
                      <input
                        id="stack"
                        type="text"
                        value={chooseStack.name}
                        onChange={(e) =>
                          handleChooseInput("name", e.target.value)
                        }
                        placeholder="Enter stack or language"
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        onKeyPress={(e) => e.key === "Enter" && addStack()}
                        aria-label="Add stack or language"
                      />
                      <button
                        onClick={addStack}
                        className="px-4 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                        aria-label="Add stack"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
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
                            aria-label={`Remove ${stack}`}
                          >
                            <X size={14} />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="level"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Level *
                    </label>
                    <select
                      id="level"
                      value={courseData.level}
                      onChange={(e) => handleInputChange("level", e.target.value)}
                      className={`w-full px-4 py-3 border ${
                        errors.level ? "border-red-500" : "border-gray-300"
                      } rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent`}
                      aria-required="true"
                    >
                      <option value="">Select level</option>
                      {levels.map((level) => (
                        <option key={level} value={level}>
                          {level}
                        </option>
                      ))}
                    </select>
                    {errors.level && (
                      <p className="text-red-500 text-sm mt-1">{errors.level}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="duration"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Duration *
                    </label>
                    <select
                      id="duration"
                      value={courseData.duration}
                      onChange={(e) =>
                        handleInputChange("duration", e.target.value)
                      }
                      className={`w-full px-4 py-3 border ${
                        errors.duration ? "border-red-500" : "border-gray-300"
                      } rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent`}
                      aria-required="true"
                    >
                      <option value="">Select duration</option>
                      {durations.map((duration) => (
                        <option key={duration} value={duration}>
                          {duration}
                        </option>
                      ))}
                    </select>
                    {errors.duration && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.duration}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="isFree"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Is Course Free?
                    </label>
                    <input
                      id="isFree"
                      type="checkbox"
                      checked={courseData.isFree}
                      onChange={(e) =>
                        handleInputChange("isFree", e.target.checked)
                      }
                      className="h-5 w-5 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-600">
                      Check if this course is free
                    </span>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Course Description *
                  </label>
                  <textarea
                    id="description"
                    value={courseData.description}
                    onChange={(e) =>
                      handleInputChange("description", e.target.value)
                    }
                    placeholder="Provide a detailed description of the course"
                    rows={4}
                    className={`w-full px-4 py-3 border ${
                      errors.description ? "border-red-500" : "border-gray-300"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent`}
                    aria-required="true"
                  />
                  {errors.description && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.description}
                    </p>
                  )}
                </div>

                {/* Prerequisites */}
                <div>
                  <label
                    htmlFor="prerequisite"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Prerequisites
                  </label>
                  <div className="flex gap-2 mb-2">
                    <input
                      id="prerequisite"
                      type="text"
                      value={newPrerequisite}
                      onChange={(e) => setNewPrerequisite(e.target.value)}
                      placeholder="Add prerequisite"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      onKeyPress={(e) => e.key === "Enter" && addPrerequisite()}
                      aria-label="Add prerequisite"
                    />
                    <button
                      onClick={addPrerequisite}
                      className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                      aria-label="Add prerequisite"
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
                          aria-label={`Remove ${prereq}`}
                        >
                          <X size={14} />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Learning Objectives */}
                <div>
                  <label
                    htmlFor="objective"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Learning Objectives
                  </label>
                  <div className="flex gap-2 mb-2">
                    <input
                      id="objective"
                      type="text"
                      value={newObjective}
                      onChange={(e) => setNewObjective(e.target.value)}
                      placeholder="Add learning objective"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      onKeyPress={(e) => e.key === "Enter" && addObjective()}
                      aria-label="Add learning objective"
                    />
                    <button
                      onClick={addObjective}
                      className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                      aria-label="Add learning objective"
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
                          aria-label={`Remove ${objective}`}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* File Uploads */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="courseImage"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Course Image
                    </label>
                    <div
                      onDragEnter={(e) => handleDrag(e, "courseImage")}
                      onDragOver={(e) => handleDrag(e, "courseImage")}
                      onDragLeave={(e) => handleDrag(e, "courseImage")}
                      onDrop={(e) => handleDrop(e, "courseImage")}
                      className={`border-2 border-dashed ${
                        dragActive === "courseImage"
                          ? "border-teal-500 bg-teal-50"
                          : "border-gray-300"
                      } rounded-lg p-4 text-center`}
                    >
                      <Upload className="mx-auto text-gray-400" size={24} />
                      <p className="text-sm text-gray-600 mt-2">
                        Drag and drop an image or click to upload
                      </p>
                      <input
                        id="courseImage"
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e, "courseImage")}
                        className="hidden"
                      />
                      <label
                        htmlFor="courseImage"
                        className="mt-2 inline-block px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 cursor-pointer"
                      >
                        Select Image
                      </label>
                    </div>
                    {courseData.courseImage && (
                      <div className="mt-2 flex items-center gap-2">
                        <ImageIcon size={16} className="text-gray-600" />
                        <span className="text-sm text-gray-700">
                          {courseData.courseImage.name}
                        </span>
                        <button
                          onClick={() => removeFile("courseImage")}
                          className="text-red-500 hover:text-red-700"
                          aria-label="Remove course image"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    )}
                    {errors.courseImage && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.courseImage}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="courseVideo"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Course Video
                    </label>
                    <div
                      onDragEnter={(e) => handleDrag(e, "courseVideo")}
                      onDragOver={(e) => handleDrag(e, "courseVideo")}
                      onDragLeave={(e) => handleDrag(e, "courseVideo")}
                      onDrop={(e) => handleDrop(e, "courseVideo")}
                      className={`border-2 border-dashed ${
                        dragActive === "courseVideo"
                          ? "border-teal-500 bg-teal-50"
                          : "border-gray-300"
                      } rounded-lg p-4 text-center`}
                    >
                      <FileVideo className="mx-auto text-gray-400" size={24} />
                      <p className="text-sm text-gray-600 mt-2">
                        Drag and drop a video or click to upload
                      </p>
                      <input
                        id="courseVideo"
                        type="file"
                        accept="video/*"
                        onChange={(e) => handleFileUpload(e, "courseVideo")}
                        className="hidden"
                      />
                      <label
                        htmlFor="courseVideo"
                        className="mt-2 inline-block px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 cursor-pointer"
                      >
                        Select Video
                      </label>
                    </div>
                    {courseData.courseVideo && (
                      <div className="mt-2 flex items-center gap-2">
                        <FileVideo size={16} className="text-gray-600" />
                        <span className="text-sm text-gray-700">
                          {courseData.courseVideo.name}
                        </span>
                        <button
                          onClick={() => removeFile("courseVideo")}
                          className="text-red-500 hover:text-red-700"
                          aria-label="Remove course video"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    )}
                    {errors.courseVideo && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.courseVideo}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="materials"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Course Materials
                    </label>
                    <div
                      onDragEnter={(e) => handleDrag(e, "materials")}
                      onDragOver={(e) => handleDrag(e, "materials")}
                      onDragLeave={(e) => handleDrag(e, "materials")}
                      onDrop={(e) => handleDrop(e, "materials")}
                      className={`border-2 border-dashed ${
                        dragActive === "materials"
                          ? "border-teal-500 bg-teal-50"
                          : "border-gray-300"
                      } rounded-lg p-4 text-center`}
                    >
                      <Upload className="mx-auto text-gray-400" size={24} />
                      <p className="text-sm text-gray-600 mt-2">
                        Drag and drop materials or click to upload
                      </p>
                      <input
                        id="materials"
                        type="file"
                        multiple
                        onChange={(e) => handleFileUpload(e, "materials")}
                        className="hidden"
                      />
                      <label
                        htmlFor="materials"
                        className="mt-2 inline-block px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 cursor-pointer"
                      >
                        Select Files
                      </label>
                    </div>
                    {courseData.materials.length > 0 && (
                      <div className="mt-2 space-y-2">
                        {courseData.materials.map((file, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-2"
                          >
                            <Upload size={16} className="text-gray-600" />
                            <span className="text-sm text-gray-700">
                              {file.name}
                            </span>
                            <button
                              onClick={() => removeFile("materials", index)}
                              className="text-red-500 hover:text-red-700"
                              aria-label={`Remove ${file.name}`}
                            >
                              <X size={14} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="px-6 py-4 bg-gray-50 rounded-b-xl flex items-center justify-between">
                <div className="flex items-center text-sm text-gray-500">
                  <CheckCircle size={16} className="mr-2" />
                  Fields marked with * are required
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={resetForm}
                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center space-x-2"
                    aria-label="Reset form"
                  >
                    <X size={16} />
                    <span>Reset Form</span>
                  </button>
                  <button
                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center space-x-2"
                    aria-label="Preview course"
                  >
                    <Eye size={16} />
                    <span>Preview</span>
                  </button>
                  <button
                    className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center space-x-2"
                    aria-label="Save as draft"
                  >
                    <Save size={16} />
                    <span>Save as Draft</span>
                  </button>
                  <button
                    onClick={handleSaveCourse}
                    className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors flex items-center space-x-2"
                    aria-label="Publish course"
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
