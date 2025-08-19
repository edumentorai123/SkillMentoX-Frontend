'use client'

import React from 'react'
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react'
import { useAppSelector, useAppDispatch } from '@/redux/hooks'
import { nextStep, prevStep } from '@/redux/Slices/profileSlice'

interface NavigationFooterProps {
  isStepValid: boolean
  onSubmit?: () => void
}

const NavigationFooter: React.FC<NavigationFooterProps> = ({ isStepValid, onSubmit }) => {
  const { currentStep } = useAppSelector((state) => state.profile)
  const dispatch = useAppDispatch()

  const handleBack = () => {
    dispatch(prevStep())
  }

  const handleNext = () => {
    if (currentStep === 4 && onSubmit) {
      onSubmit()
    } else {
      dispatch(nextStep())
    }
  }

  const isFirstStep = currentStep === 2
  const isLastStep = currentStep === 4

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg" data-aos="fade-up">
      <div className="flex items-center justify-between space-x-4">
        
        {/* Back Button */}
        <button
          onClick={handleBack}
          disabled={isFirstStep}
          className={`
            flex items-center justify-center space-x-2 px-6 py-3 rounded-xl
            min-h-[44px] font-semibold transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-offset-2
            ${isFirstStep 
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
              : 'bg-gray-200 hover:bg-gray-300 text-gray-700 focus:ring-gray-400'
            }
          `}
          aria-label="Go to previous step"
        >
          <ArrowLeft size={18} />
          <span>Back</span>
        </button>

        {/* Step Indicator */}
        <div className="flex items-center space-x-2">
          <div className="text-sm text-gray-500 font-medium">
            Step {currentStep - 1} of 3
          </div>
        </div>

        {/* Next/Submit Button */}
        <button
          onClick={handleNext}
          disabled={!isStepValid}
          className={`
            flex items-center justify-center space-x-2 px-6 py-3 rounded-xl
            min-h-[44px] font-semibold text-white transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-offset-2
            ${isStepValid
              ? 'bg-gradient-to-r from-[#1887A1] to-[#0D4C5B] hover:shadow-lg focus:ring-[#1887A1] transform hover:-translate-y-0.5'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }
          `}
          aria-label={isLastStep ? 'Submit profile' : 'Go to next step'}
        >
          <span>{isLastStep ? 'Submit' : 'Next'}</span>
          {isLastStep ? <CheckCircle size={18} /> : <ArrowRight size={18} />}
        </button>
      </div>

      {/* Progress Dots */}
      <div className="flex justify-center mt-4 space-x-2">
        {[2, 3, 4].map((step) => (
          <div
            key={step}
            className={`
              w-2 h-2 rounded-full transition-all duration-300
              ${step <= currentStep 
                ? 'bg-gradient-to-r from-[#1887A1] to-[#0D4C5B]' 
                : 'bg-gray-300'
              }
            `}
          />
        ))}
      </div>

      {/* Validation Message */}
      {!isStepValid && (
        <div className="mt-4 text-center">
          <p className="text-sm text-red-500 font-medium">
            Please complete all required fields to continue
          </p>
        </div>
      )}
    </div>
  )
}

export default NavigationFooter