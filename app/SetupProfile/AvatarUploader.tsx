'use client'

import React, { useRef, ChangeEvent } from 'react'
import { Camera, X } from 'lucide-react'
import { useAppSelector, useAppDispatch } from '@/redux/hooks'
import { setAvatarPreview } from '@/redux/Slices/profileSlice'
import Image from 'next/image'

const AvatarUploader: React.FC = () => {
  const { name, avatarPreview } = useAppSelector((state) => state.profile)
  const dispatch = useAppDispatch()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const getInitials = (fullName: string): string => {
    if (!fullName.trim()) return 'U'
    const names = fullName.trim().split(' ')
    if (names.length === 1) return names[0].charAt(0).toUpperCase()
    return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase()
  }

  const getGradientColors = (fullName: string) => {
    const colors = [
      'from-blue-400 to-blue-600',
      'from-purple-400 to-purple-600', 
      'from-green-400 to-green-600',
      'from-pink-400 to-pink-600',
      'from-indigo-400 to-indigo-600',
      'from-yellow-400 to-yellow-600'
    ]
    const index = fullName.length % colors.length
    return colors[index]
  }

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (!file.type.match(/^image\/(jpeg|jpg|png)$/)) {
      alert('Please upload a JPG or PNG image')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB')
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      if (e.target?.result) {
        dispatch(setAvatarPreview(e.target.result as string))
      }
    }
    reader.readAsDataURL(file)
  }

  const handleRemoveAvatar = () => {
    dispatch(setAvatarPreview(null))
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative">

        <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-lg">
  {avatarPreview ? (
    <Image
      src={avatarPreview}
      alt="Profile avatar"
      width={112} 
      height={112}
      className="object-cover w-full h-full"
    />
  ) : (
    <div
      className={`w-full h-full bg-gradient-to-br ${getGradientColors(name)} 
              flex items-center justify-center text-white text-2xl font-bold`}
    >
      {getInitials(name)}
    </div>
  )}
</div>

        {/* Remove Button */}
        {avatarPreview && (
          <button
            onClick={handleRemoveAvatar}
            className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 
                      text-white rounded-full p-1 transition-colors duration-200
                      focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
            aria-label="Remove avatar"
          >
            <X size={16} />
          </button>
        )}

        {/* Upload Button */}
        <button
          onClick={handleUploadClick}
          className="absolute -bottom-2 -right-2 bg-gradient-to-r from-[#1887A1] to-[#0D4C5B]
                      hover:shadow-lg text-white rounded-full p-2 transition-all duration-200
                      focus:outline-none focus:ring-2 focus:ring-[#1887A1] focus:ring-offset-2"
          aria-label={avatarPreview ? 'Change avatar' : 'Upload avatar'}
        >
          <Camera size={16} />
        </button>
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png"
        onChange={handleFileUpload}
        className="hidden"
        aria-hidden="true"
      />

      {/* Upload Instructions */}
      <div className="text-center">
        <p className="text-sm text-gray-600 font-medium">
          {avatarPreview ? 'Click camera to change' : 'Upload your photo'}
        </p>
        <p className="text-xs text-gray-500 mt-1">
          JPG, PNG up to 5MB
        </p>
      </div>
    </div>
  )
}

export default AvatarUploader