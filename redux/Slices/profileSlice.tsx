import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface ProfileState {
  currentStep: 2 | 3 | 4
  role: '' | 'student' | 'mentor'
  
  name: string
  email: string
  location: string
  phone: string
  avatarPreview?: string | null
  
  educationLevel: string
  selectedCourse: string
  goals: string[]
  learningStyle: string
  
  title: string
  experience: string
  expertise: string[]
  availability: string
}

const initialState: ProfileState = {
  currentStep: 2, 
  role: '',
  
  name: '',
  email: '',
  location: '',
  phone: '',
  avatarPreview: null,
  
  educationLevel: '',
  selectedCourse: '',
  goals: [],
  learningStyle: '',
  
  title: '',
  experience: '',
  expertise: [],
  availability: ''
}

interface ToggleArrayItemPayload {
  field: 'goals' | 'expertise'
  value: string
}

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setRole: (state, action: PayloadAction<'student' | 'mentor'>) => {
      state.role = action.payload
    },
    
    setStep: (state, action: PayloadAction<2 | 3 | 4>) => {
      state.currentStep = action.payload
    },
    
    nextStep: (state) => {
      if (state.currentStep < 4) {
        state.currentStep = (state.currentStep + 1) as 2 | 3 | 4
      }
    },
    
    prevStep: (state) => {
      if (state.currentStep > 2) {
        state.currentStep = (state.currentStep - 1) as 2 | 3 | 4
      }
    },
    
    updateField: <K extends keyof Omit<ProfileState, 'currentStep'>>(
  state: ProfileState,
  action: PayloadAction<{ field: K; value: ProfileState[K] }>
) => {
  state[action.payload.field] = action.payload.value
},

    
    toggleArrayItem: (state, action: PayloadAction<ToggleArrayItemPayload>) => {
      const { field, value } = action.payload
      const array = state[field]
      const index = array.indexOf(value)
      
      if (index > -1) {
        array.splice(index, 1)
      } else {
        array.push(value)
      }
    },
    
    setAvatarPreview: (state, action: PayloadAction<string | null>) => {
      state.avatarPreview = action.payload
    },
    
    resetProfile: () => initialState
  }
})

export const calcProfileStrength = (profile: ProfileState): number => {
  const basicFields = [
    profile.name,
    profile.email,
    profile.location,
    profile.phone
  ].filter(Boolean).length
  
  let roleFields = 0
  let totalRoleFields = 0
  
  if (profile.role === 'student') {
    totalRoleFields = 4
    roleFields = [
      profile.educationLevel,
      profile.selectedCourse,
      profile.learningStyle,
      profile.goals.length > 0 ? 'filled' : ''
    ].filter(Boolean).length
  } else if (profile.role === 'mentor') {
    totalRoleFields = 4
    roleFields = [
      profile.title,
      profile.experience,
      profile.availability,
      profile.expertise.length > 0 ? 'filled' : ''
    ].filter(Boolean).length
  }
  
  const totalFields = 4 + totalRoleFields 
  const filledFields = basicFields + roleFields
  
  return Math.round((filledFields / totalFields) * 100)
}

export const { 
  setRole, 
  setStep, 
  nextStep, 
  prevStep, 
  updateField, 
  toggleArrayItem, 
  setAvatarPreview, 
  resetProfile 
} = profileSlice.actions

export default profileSlice.reducer