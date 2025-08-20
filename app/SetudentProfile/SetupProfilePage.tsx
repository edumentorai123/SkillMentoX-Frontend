'use client'

import React, { useEffect, useState } from 'react'
import { useAppSelector, useAppDispatch } from '@/redux/hooks'
import { setRole } from '@/redux/Slices/profileSlice'
import ProgressHeader from './ProgressHeader'
import Step2BasicInfo from './Step2BasicInfo'
import Step3Details from './Step3Details'
import Step4Review from './Step4Review'
import NavigationFooter from './NavigationFooter'
import 'aos/dist/aos.css'
import type { Aos } from 'aos'

declare global {
  interface Window {
    AOS?: Aos
  }
}

const SetupProfilePage: React.FC = () => {
  const profile = useAppSelector((state) => state.profile)
  const dispatch = useAppDispatch()
  const [isInitializing, setIsInitializing] = useState(true)

  useEffect(() => {
    const initializeComponent = async () => {
      // Initialize AOS
      if (typeof window !== 'undefined') {
        try {
          const AOSModule = await import('aos')
          AOSModule.default.init({
            duration: 800,
            once: true,
            offset: 40,
            easing: 'ease-out-cubic'
          })
          window.AOS = AOSModule.default
        } catch (error) {
          console.warn('Failed to load AOS:', error)
        }
      }

      // Set role from URL if not already set
      if (profile?.role === null) {
        const urlParams = new URLSearchParams(window.location.search)
        const roleFromUrl = urlParams.get('role') as 'student' | 'mentor' | null
        dispatch(setRole(roleFromUrl ?? 'student'))
      }

      // Mark initialization as complete
      setIsInitializing(false)
    }

    initializeComponent()
  }, [profile?.role, dispatch])

  // Step validation logic
  const getStepValidation = (): boolean => {
    if (!profile) return false
    
    switch (profile.currentStep) {
      case 2: 
        return !!(profile.name && profile.email && profile.location && profile.phone)
      
      case 3: 
        if (profile.role === 'student') {
          return !!(
            profile.educationLevel &&
            profile.selectedCourse &&
            profile.goals?.length > 0 &&
            profile.learningStyle
          )
        } else if (profile.role === 'mentor') {
          return !!(
            profile.title &&
            profile.experience &&
            profile.expertise?.length > 0 &&
            profile.availability
          )
        }
        return false
      
      case 4:
        return true
      
      default:
        return false
    }
  }

  // Handle final profile submission
  const handleProfileSubmit = () => {
    if (!profile) return
    
    console.log('=== PROFILE SUBMISSION ===')
    console.log('Full Profile Object:', profile)
    console.log('Role:', profile.role)
    console.log('Basic Info:', {
      name: profile.name,
      email: profile.email,
      location: profile.location,
      phone: profile.phone,
      avatar: profile.avatarPreview ? 'Has avatar' : 'No avatar'
    })
    
    if (profile.role === 'student') {
      console.log('Student Details:', {
        educationLevel: profile.educationLevel,
        selectedCourse: profile.selectedCourse,
        goals: profile.goals,
        learningStyle: profile.learningStyle
      })
    } else {
      console.log('Mentor Details:', {
        title: profile.title,
        experience: profile.experience,
        expertise: profile.expertise,
        availability: profile.availability
      })
    }
    
    console.log('========================')
    
    alert(`Profile submitted successfully!\n\nRole: ${profile.role}\nName: ${profile.name}\n\nCheck console for full details.`)
  }

  // Render current step content
  const renderStepContent = () => {
    if (!profile) return null
    
    switch (profile.currentStep) {
      case 2:
        return <Step2BasicInfo />
      case 3:
        return <Step3Details />
      case 4:
        return <Step4Review />
      default:
        return <Step2BasicInfo />
    }
  }

  // Show loading state during initialization or if profile is not available
  if (isInitializing || !profile || profile.role === null) {
    return (
      <div className="min-h-screen bg-white 
                    flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1887A1] mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-[#0D4C5B] mb-2">
            {isInitializing ? 'Setting up your profile...' : 'Loading profile...'}
          </h2>
          <p className="text-gray-600">
            Please wait while we prepare your personalized experience
          </p>
        </div>
      </div>
    )
  }

  const isStepValid = getStepValidation()

  return (
    <div className="min-h-screen bg-white 
                  flex items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-6">
        {/* Progress Header */}
        <ProgressHeader />

        {/* Step Content */}
        <div className="transition-all duration-500 ease-in-out">
          {renderStepContent()}
        </div>

        {/* Navigation Footer */}
        <NavigationFooter 
          isStepValid={isStepValid}
          onSubmit={handleProfileSubmit}
        />
      </div>
    </div>
  )
}

export default SetupProfilePage