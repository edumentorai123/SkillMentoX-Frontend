'use client'

import React, { useEffect } from 'react'
import { User, Mail, MapPin, Phone } from 'lucide-react'
import { useAppSelector, useAppDispatch } from '@/redux/hooks'
import { updateField } from '@/redux/Slices/profileSlice'
import AvatarUploader from './AvatarUploader'
import AOS from 'aos'
import 'aos/dist/aos.css'

const Step2BasicInfo: React.FC = () => {
  const { name, email, location, phone } = useAppSelector((state) => state.profile)
  const dispatch = useAppDispatch()

  useEffect(() => {
    AOS.refresh()
  }, [])

  const handleInputChange = <
    K extends 'name' | 'email' | 'location' | 'phone'
  >(
    field: K,
    value: string
  ) => {
    dispatch(updateField({ field, value }))
  }

  return (
    <div className="bg-white rounded-2xl p-8 shadow-xl" data-aos="fade-right">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-[#0D4C5B] mb-2">
          Let&apos;s Get Started!
        </h2>
        <p className="text-gray-600">
          Tell us a bit about yourself to personalize your learning experience
        </p>
      </div>

      {/* Avatar Uploader */}
      <div className="mb-8">
        <AvatarUploader />
      </div>

      {/* Form Fields */}
      <div className="space-y-6">
        {/* Full Name */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Full Name *
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="Enter your full name"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl
                       focus:outline-none focus:ring-2 focus:ring-[#1887A1] focus:border-transparent
                       transition-all duration-200 text-gray-900 placeholder-gray-500"
              required
              aria-describedby="name-helper"
            />
          </div>
          <p id="name-helper" className="mt-1 text-xs text-gray-500">
            This will be displayed on your profile
          </p>
        </div>

        {/* Email Address */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Email Address *
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="Enter your email address"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl
                       focus:outline-none focus:ring-2 focus:ring-[#1887A1] focus:border-transparent
                       transition-all duration-200 text-gray-900 placeholder-gray-500"
              required
              aria-describedby="email-helper"
            />
          </div>
          <p id="email-helper" className="mt-1 text-xs text-gray-500">
            We&apos;ll use this to send you important updates
          </p>
        </div>

        {/* Location */}
        <div>
          <label
            htmlFor="location"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Location *
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MapPin className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="location"
              type="text"
              value={location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              placeholder="City, State/Country"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl
                       focus:outline-none focus:ring-2 focus:ring-[#1887A1] focus:border-transparent
                       transition-all duration-200 text-gray-900 placeholder-gray-500"
              required
              aria-describedby="location-helper"
            />
          </div>
          <p id="location-helper" className="mt-1 text-xs text-gray-500">
            Helps us connect you with local opportunities
          </p>
        </div>

        {/* Phone Number */}
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Phone Number *
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Phone className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              placeholder="+1 (555) 123-4567"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl
                       focus:outline-none focus:ring-2 focus:ring-[#1887A1] focus:border-transparent
                       transition-all duration-200 text-gray-900 placeholder-gray-500"
              required
              aria-describedby="phone-helper"
            />
          </div>
          <p id="phone-helper" className="mt-1 text-xs text-gray-500">
            For important notifications and verification
          </p>
        </div>
      </div>

      {/* Required Fields Note */}
      <div className="mt-8 p-4 bg-blue-50 rounded-xl border border-blue-200">
        <p className="text-sm text-blue-800">
          <span className="font-semibold">Note:</span> Fields marked with * are
          required to continue
        </p>
      </div>
    </div>
  )
}

export default Step2BasicInfo
