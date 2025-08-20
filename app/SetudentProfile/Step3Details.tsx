'use client'

import React, { useEffect } from 'react'
import { GraduationCap, Target, BookOpen, User, Award, Clock } from 'lucide-react'
import { useAppSelector, useAppDispatch } from '@/redux/hooks'
import { updateField, toggleArrayItem } from '@/redux/Slices/profileSlice'
import type { ProfileState } from '@/redux/Slices/profileSlice'

// Mock data - will be replaced with PDF parsed data later
const courses = [
  'Web Development',
  'Data Science',
  'Mobile App Development',
  'UI/UX Design',
  'Digital Marketing',
  'Machine Learning',
  'Cybersecurity',
  'Cloud Computing',
  'DevOps',
  'Blockchain Development'
]

const educationLevels = [
  'High School',
  'Bachelor\'s Degree',
  'Master\'s Degree',
  'PhD',
  'Professional Certificate',
  'Self-Taught'
]

const learningStyles = [
  'Visual (prefer diagrams and charts)',
  'Auditory (prefer lectures and discussions)',
  'Kinesthetic (prefer hands-on practice)',
  'Reading/Writing (prefer text-based learning)'
]

const studentGoals = [
  'Career Change',
  'Skill Enhancement',
  'Academic Support',
  'Personal Growth',
  'Certification',
  'Portfolio Building',
  'Interview Preparation',
  'Freelancing'
]


const mentorExpertise = [
  'Frontend Development',
  'Backend Development',
  'Full Stack Development',
  'Data Analysis',
  'Machine Learning',
  'Mobile Development',
  'UI/UX Design',
  'Product Management',
  'DevOps',
  'Cybersecurity',
  'Digital Marketing',
  'Entrepreneurship'
]


type UpdateFieldKeys = keyof Omit<ProfileState, 'currentStep' | 'goals' | 'expertise'>

const Step3Details: React.FC = () => {
  const profile = useAppSelector((state) => state.profile)
  const dispatch = useAppDispatch()

  // Safe destructuring with proper null checks
  const {
    role = null,
    educationLevel = '',
    selectedCourse = '',
    goals = [],
    learningStyle = '',
    title = '',
    experience = '',
    expertise = [],
    availability = ''
  } = profile || {}

  useEffect(() => {
    // Safely refresh AOS animations
    if (typeof window !== 'undefined' && window.AOS) {
      window.AOS.refresh()
    }
  }, [])

  // Use the specific type for field
  const handleInputChange = (field: UpdateFieldKeys, value: string) => {
    dispatch(updateField({ field, value }))
  }

  const handleToggleArrayItem = (field: 'goals' | 'expertise', value: string) => {
    dispatch(toggleArrayItem({ field, value }))
  }

  // Show loading state if profile is not ready or role is not set
  if (!profile || role === null) {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-xl">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 bg-gray-200 rounded mb-8"></div>
          <div className="space-y-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i}>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-12 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const renderStudentFields = () => (
    <div className="space-y-6">
      {/* Education Level */}
      <div>
        <label htmlFor="educationLevel" className="block text-sm font-semibold text-gray-700 mb-2">
          <GraduationCap className="inline w-4 h-4 mr-2" />
          Education Level *
        </label>
        <select
          id="educationLevel"
          value={educationLevel}
          onChange={(e) => handleInputChange('educationLevel', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl
                   focus:outline-none focus:ring-2 focus:ring-[#1887A1] focus:border-transparent
                   transition-all duration-200 text-gray-900 bg-white"
          required
        >
          <option value="">Select your education level</option>
          {educationLevels.map((level) => (
            <option key={level} value={level}>{level}</option>
          ))}
        </select>
      </div>

      {/* Course Selection */}
      <div>
        <label htmlFor="selectedCourse" className="block text-sm font-semibold text-gray-700 mb-2">
          <BookOpen className="inline w-4 h-4 mr-2" />
          Course Interest *
        </label>
        <select
          id="selectedCourse"
          value={selectedCourse}
          onChange={(e) => handleInputChange('selectedCourse', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl
                   focus:outline-none focus:ring-2 focus:ring-[#1887A1] focus:border-transparent
                   transition-all duration-200 text-gray-900 bg-white"
          required
        >
          <option value="">Select a course you&apos;re interested in</option>
          {courses.map((course) => (
            <option key={course} value={course}>{course}</option>
          ))}
        </select>
      </div>

      {/* Learning Goals */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          <Target className="inline w-4 h-4 mr-2" />
          Learning Goals * (Select all that apply)
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {studentGoals.map((goal) => (
            <button
              key={goal}
              type="button"
              onClick={() => handleToggleArrayItem('goals', goal)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200
                       border-2 focus:outline-none focus:ring-2 focus:ring-offset-1
                       ${goals.includes(goal)
                         ? 'border-[#1887A1] bg-gradient-to-r from-[#1887A1] to-[#0D4C5B] text-white focus:ring-[#1887A1]'
                         : 'border-gray-300 bg-white text-gray-700 hover:border-[#1887A1] focus:ring-[#1887A1]'
                       }`}
            >
              {goal}
            </button>
          ))}
        </div>
        <p className="mt-2 text-xs text-gray-500">
          Selected: {goals.length} goal{goals.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Learning Style */}
      <div>
        <label htmlFor="learningStyle" className="block text-sm font-semibold text-gray-700 mb-2">
          <User className="inline w-4 h-4 mr-2" />
          Preferred Learning Style *
        </label>
        <select
          id="learningStyle"
          value={learningStyle}
          onChange={(e) => handleInputChange('learningStyle', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl
                   focus:outline-none focus:ring-2 focus:ring-[#1887A1] focus:border-transparent
                   transition-all duration-200 text-gray-900 bg-white"
          required
        >
          <option value="">Select your learning style</option>
          {learningStyles.map((style) => (
            <option key={style} value={style}>{style}</option>
          ))}
        </select>
      </div>
    </div>
  )

  const renderMentorFields = () => (
    <div className="space-y-6">
      {/* Professional Title */}
      <div>
        <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
          <User className="inline w-4 h-4 mr-2" />
          Professional Title *
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => handleInputChange('title', e.target.value)}
          placeholder="e.g., Senior Software Engineer, UX Designer"
          className="w-full px-4 py-3 border border-gray-300 rounded-xl
                   focus:outline-none focus:ring-2 focus:ring-[#1887A1] focus:border-transparent
                   transition-all duration-200 text-gray-900 placeholder-gray-500"
          required
        />
      </div>

      {/* Years of Experience */}
      <div>
        <label htmlFor="experience" className="block text-sm font-semibold text-gray-700 mb-2">
          <Award className="inline w-4 h-4 mr-2" />
          Years of Experience *
        </label>
        <input
          id="experience"
          type="number"
          min="0"
          max="50"
          value={experience}
          onChange={(e) => handleInputChange('experience', e.target.value)}
          placeholder="Number of years in your field"
          className="w-full px-4 py-3 border border-gray-300 rounded-xl
                   focus:outline-none focus:ring-2 focus:ring-[#1887A1] focus:border-transparent
                   transition-all duration-200 text-gray-900 placeholder-gray-500"
          required
        />
      </div>

      {/* Areas of Expertise */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          <Target className="inline w-4 h-4 mr-2" />
          Areas of Expertise * (Select all that apply)
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {mentorExpertise.map((area) => (
            <button
              key={area}
              type="button"
              onClick={() => handleToggleArrayItem('expertise', area)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200
                       border-2 focus:outline-none focus:ring-2 focus:ring-offset-1
                       ${expertise.includes(area)
                         ? 'border-[#1887A1] bg-gradient-to-r from-[#1887A1] to-[#0D4C5B] text-white focus:ring-[#1887A1]'
                         : 'border-gray-300 bg-white text-gray-700 hover:border-[#1887A1] focus:ring-[#1887A1]'
                       }`}
            >
              {area}
            </button>
          ))}
        </div>
        <p className="mt-2 text-xs text-gray-500">
          Selected: {expertise.length} area{expertise.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Availability */}
      <div>
        <label htmlFor="availability" className="block text-sm font-semibold text-gray-700 mb-2">
          <Clock className="inline w-4 h-4 mr-2" />
          Availability *
        </label>
        <input
          id="availability"
          type="text"
          value={availability}
          onChange={(e) => handleInputChange('availability', e.target.value)}
          placeholder="e.g., Weekends, Evenings, 10-15 hours/week"
          className="w-full px-4 py-3 border border-gray-300 rounded-xl
                   focus:outline-none focus:ring-2 focus:ring-[#1887A1] focus:border-transparent
                   transition-all duration-200 text-gray-900 placeholder-gray-500"
          required
        />
        <p className="mt-1 text-xs text-gray-500">
          Describe when you&apos;re available to mentor students
        </p>
      </div>
    </div>
  )

  return (
    <div className="bg-white rounded-2xl p-8 shadow-xl" data-aos="fade-left">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-[#0D4C5B] mb-2">
          {role === 'student' ? 'Your Learning Journey' : 'Your Expertise'}
        </h2>
        <p className="text-gray-600">
          {role === 'student' 
            ? 'Tell us about your educational background and learning goals'
            : 'Share your professional experience and areas of expertise'
          }
        </p>
      </div>

      {/* Role-specific Fields */}
      {role === 'student' ? renderStudentFields() : renderMentorFields()}

      {/* Required Fields Note */}
      <div className="mt-8 p-4 bg-blue-50 rounded-xl border border-blue-200">
        <p className="text-sm text-blue-800">
          <span className="font-semibold">Note:</span> Fields marked with * are required to continue
        </p>
      </div>
    </div>
  )
}

export default Step3Details