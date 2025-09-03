import axiosClient from "@/app/lib/axiosClient";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";


interface User {
    id: string;
    email: string;
    firstName: string;
    lastName?: string | null;
    role: "student" | "mentor" | "admin" | null;
}

interface AuthState {
    user: User | null;
    token: string | null;
    hasProfile: boolean;
    isPremium: boolean;
    mentorSelected: boolean;
    mentorAccepted: boolean;
    loading: boolean;
    error: string | null;
}

interface ErrorResponse {
    message?: string;
}

const initialState: AuthState = {
    user: null,
    token: null,
    hasProfile: false,
    isPremium: false,
    mentorSelected: false,
    mentorAccepted: false,
    loading: false,
    error: null,
};

const loadInitialState = (): AuthState => {
    if (typeof window === "undefined") return initialState;
    try {
        const stored = localStorage.getItem("auth");
        if (stored) {
            const parsed = JSON.parse(stored) as {
                token: string;
                user: User;
                hasProfile?: boolean;
                isPremium?: boolean;
            };
            return {
                ...initialState,
                user: parsed.user,
                token: parsed.token,
                hasProfile: parsed.hasProfile || false,
                isPremium: parsed.isPremium || false,
            };
        }
    } catch (error) {
        console.error("Failed to load auth from localStorage:", error);
    }
    return initialState;
};

export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (
        { email, password }: { email: string; password: string },
        thunkAPI
    ) => {
        try {
            const res = await axiosClient.post<{
                message: string;
                token: string;
                user: User;
                hasProfile?: boolean;
                isPremium?: boolean;
            }>(
                `${process.env.NEXT_PUBLIC_API_URL as string
                }/login`,
                { email, password }
            );

            const userData: User = {
                ...res.data.user,
                lastName: res.data.user.lastName || null,
            };

            const authData = {
                token: res.data.token,
                user: userData,
                hasProfile: res.data.hasProfile ?? false,
                isPremium: res.data.isPremium ?? false,
            };

            localStorage.setItem("auth", JSON.stringify(authData));

            return authData;
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                const axiosError = err as AxiosError<ErrorResponse>;
                return thunkAPI.rejectWithValue(
                    axiosError.response?.data?.message || "Login failed"
                );
            }
            return thunkAPI.rejectWithValue("An unexpected error occurred");
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState: loadInitialState(),
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.hasProfile = false;
            state.isPremium = false;

            localStorage.removeItem("auth");
            localStorage.removeItem("accessToken");
        },
        setCredentials: (
            state,
            action: PayloadAction<{
                token: string;
                user: User;
                hasProfile?: boolean;
                isPremium?: boolean;
            }>
        ) => {
            const userData: User = {
                ...action.payload.user,
                lastName: action.payload.user.lastName || null,
            };

            state.token = action.payload.token;
            state.user = userData;
            state.hasProfile = action.payload.hasProfile ?? false;
            state.isPremium = action.payload.isPremium ?? false;

            localStorage.setItem(
                "auth",
                JSON.stringify({
                    token: action.payload.token,
                    user: userData,
                    hasProfile: state.hasProfile,
                    isPremium: state.isPremium,
                })
            );
        },
        loadUserFromStorage: (state) => {
            const stored = localStorage.getItem("auth");
            if (stored) {
                const parsed = JSON.parse(stored) as {
                    token: string;
                    user: User;
                    hasProfile?: boolean;
                    isPremium?: boolean;
                };
                state.token = parsed.token;
                state.user = parsed.user;
                state.hasProfile = parsed.hasProfile ?? false;
                state.isPremium = parsed.isPremium ?? false;
            }
        },
        setHasProfile: (state, action: PayloadAction<boolean>) => {
            state.hasProfile = action.payload;
            localStorage.setItem(
                "auth",
                JSON.stringify({ ...state, hasProfile: action.payload })
            );
        },
        setPremium: (state, action: PayloadAction<boolean>) => {
            state.isPremium = action.payload;
            localStorage.setItem(
                "auth",
                JSON.stringify({ ...state, isPremium: action.payload })
            );
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                loginUser.fulfilled,
                (
                    state,
                    action: PayloadAction<{
                        token: string;
                        user: User;
                        hasProfile: boolean;
                        isPremium: boolean;
                    }>
                ) => {
                    state.loading = false;
                    state.user = action.payload.user;
                    state.token = action.payload.token;
                    state.hasProfile = action.payload.hasProfile;
                    state.isPremium = action.payload.isPremium;

                    localStorage.setItem("auth", JSON.stringify(action.payload));
                    localStorage.setItem("accessToken", action.payload.token);
                }
            )

            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const {
    logout,
    setCredentials,
    loadUserFromStorage,
    setHasProfile,
    setPremium,
} = authSlice.actions;

export default authSlice.reducer;
