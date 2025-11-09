import axiosClient from "@/app/lib/axiosClient";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export interface ProfileState {
  currentStep: 2 | 3 | 4;
  role: "student" | null;
  name: string;
  email: string;
  location: string;
  phone: string;
  avatarPreview?: string | null;
  educationLevel: string;
  selectedCategory: string;
  selectedStack: string;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  userId?: string;
}

const initialState: ProfileState = {
  currentStep: 2,
  role: null,
  name: "",
  email: "",
  location: "",
  phone: "",
  avatarPreview: null,
  educationLevel: "",
  selectedCategory: "",
  selectedStack: "",
  status: "idle",
  error: null,
};

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL as string;

export const calcProfileStrength = (profile: ProfileState): number => {
  let strength = 0;

  if (profile.name) strength += 15;
  if (profile.email) strength += 15;
  if (profile.location) strength += 10;
  if (profile.phone) strength += 10;
  if (profile.avatarPreview) strength += 15;
  if (profile.educationLevel) strength += 15;
  if (profile.selectedCategory) strength += 10;
  if (profile.selectedStack) strength += 10;

  return Math.min(strength, 100);
};

export const createProfileApi = createAsyncThunk(
  "profile/createProfile",
  async (profileData: Partial<ProfileState>, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken") ||
        localStorage.getItem("token") ||
        localStorage.getItem("authToken");

      const profilePayload: Partial<ProfileState> & { avatar?: string } = { ...profileData };
      if (profilePayload.avatarPreview !== undefined && profilePayload.avatarPreview !== null) {
        profilePayload.avatar = profilePayload.avatarPreview;
        delete profilePayload.avatarPreview;
      } else {
        delete profilePayload.avatarPreview;
      }
      delete profilePayload.userId;
      delete profilePayload.role;
      delete profilePayload.currentStep;
      delete profilePayload.status;
      delete profilePayload.error;

      const response = await axiosClient.post(
        "/api/students/createprofile",
        profilePayload
      );
      return response.data;
    } catch (err) {
      let errorMessage = "Failed to create profile";
      if (err && typeof err === 'object' && 'isAxiosError' in err && err.isAxiosError) {
        const axiosError = err as { response?: { data?: { message?: string; error?: string } }; message?: string };
        errorMessage = axiosError.response?.data?.message || axiosError.response?.data?.error || axiosError.message || "Failed to create profile";
      }
      return rejectWithValue(errorMessage);
    }
  }
);

const profileSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    setRole: (state, action: PayloadAction<"student">) => {
      state.role = action.payload;
    },
    setStep: (state, action: PayloadAction<2 | 3 | 4>) => {
      state.currentStep = action.payload;
    },
    nextStep: (state) => {
      if (state.currentStep < 4) state.currentStep++;
    },
    prevStep: (state) => {
      if (state.currentStep > 2) state.currentStep--;
    },
    updateField: <
      K extends keyof Omit<ProfileState, "currentStep" | "status" | "error">
    >(
      state: ProfileState,
      action: PayloadAction<{ field: K; value: ProfileState[K] }>
    ) => {
      state[action.payload.field] = action.payload.value;
    },
    setAvatarPreview: (state, action: PayloadAction<string | null>) => {
      state.avatarPreview = action.payload;
    },
    resetProfile: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProfileApi.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(createProfileApi.fulfilled, (state, action) => {
        state.status = "succeeded";
        Object.assign(state, action.payload);
      })
      .addCase(createProfileApi.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const {
  setRole,
  setStep,
  nextStep,
  prevStep,
  updateField,
  setAvatarPreview,
  resetProfile,
} = profileSlice.actions;

export default profileSlice.reducer;
