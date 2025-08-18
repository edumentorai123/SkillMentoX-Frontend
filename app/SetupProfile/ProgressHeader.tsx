'use client'

import React from 'react'
import { useAppSelector } from '@/redux/hooks'
import { calcProfileStrength } from '@/redux/Slices/profileSlice'

const ProgressHeader: React.FC = () => {
  const profile = useAppSelector((state) => state.profile)
  const { currentStep } = profile
  
  const profileStrength = calcProfileStrength(profile)
  const stepProgress = ((currentStep - 1) / 3) * 100

  const stepLabels = {
    2: 'Basic Info',
    3: 'Details', 
    4: 'Review'
  }

  return (
    <div className="bg-white rounded-2xl p-6 mb-6 shadow-lg" data-aos="fade-down">
      {/* Step Counter */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-[#0D4C5B] mb-2">
          Setup Your Profile
        </h1>
        <p className="text-gray-600">
          Step {currentStep - 1} of 3 • {stepLabels[currentStep]}
        </p>
      </div>

      {/* Step Progress Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Progress</span>
          <span className="text-sm text-gray-500">{Math.round(stepProgress)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-[#1887A1] to-[#0D4C5B] h-2 rounded-full 
                     transition-all duration-500 ease-out"
            style={{ width: `${stepProgress}%` }}
          />
        </div>
      </div>

      {/* Profile Strength */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Profile Strength</span>
          <span className="text-sm font-semibold text-green-600">{profileStrength}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full 
                     transition-all duration-500 ease-out"
            style={{ width: `${profileStrength}%` }}
          />
        </div>
      </div>

      {/* Step Indicators */}
      <div className="flex items-center justify-center space-x-4 mt-6">
        {[2, 3, 4].map((step, index) => (
          <div key={step} className="flex items-center">
            {/* Step Circle */}
            <div className={`
              w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold
              transition-all duration-300
              ${step <= currentStep 
                ? 'bg-gradient-to-r from-[#1887A1] to-[#0D4C5B] text-white shadow-lg' 
                : 'bg-gray-200 text-gray-500'
              }
            `}>
              {index + 1}
            </div>

            {/* Step Label */}
            <span className={`
              ml-2 text-sm font-medium transition-colors duration-300
              ${step <= currentStep ? 'text-[#0D4C5B]' : 'text-gray-400'}
            `}>
              {stepLabels[step as keyof typeof stepLabels]}
            </span>

            {/* Connector Line */}
            {index < 2 && (
              <div className={`
                w-8 h-0.5 mx-3 transition-colors duration-300
                ${step < currentStep 
                  ? 'bg-gradient-to-r from-[#1887A1] to-[#0D4C5B]' 
                  : 'bg-gray-200'
                }
              `} />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProgressHeader