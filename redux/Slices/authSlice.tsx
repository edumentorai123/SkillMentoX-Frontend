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
    loading: boolean;
    error: string | null;
}

interface ErrorResponse {
    message?: string;
}

const initialState: AuthState = {
    user: null,
    token: null,
    loading: false,
    error: null,
};

const loadInitialState = (): AuthState => {
    if (typeof window === "undefined") return initialState;
    try {
        const stored = localStorage.getItem("auth");
        if (stored) {
            const parsed = JSON.parse(stored) as { token: string; user: User };
            return {
                ...initialState,
                user: parsed.user,
                token: parsed.token,
            };
        }
    } catch (error) {
        console.error("Failed to load auth from localStorage:", error);
    }
    return initialState;
};

export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async ({ email, password }: { email: string; password: string }, thunkAPI) => {
        try {
            const res = await axios.post<{
                message: string;
                token: string;
                user: User;
            }>(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:9999/api/auth"}/login`, {
                email,
                password,
            });
            
            const userData: User = {
                ...res.data.user,
                lastName: res.data.user.lastName || null, 
            };
            
            const authData = { token: res.data.token, user: userData };
            localStorage.setItem("auth", JSON.stringify(authData));
            
            return { ...res.data, user: userData };
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
            localStorage.removeItem("auth");
        },
        setCredentials: (
            state,
            action: PayloadAction<{ token: string; user: User }>
        ) => {
            const userData: User = {
                ...action.payload.user,
                lastName: action.payload.user.lastName || null,
            };
            
            state.token = action.payload.token;
            state.user = userData;
            localStorage.setItem("auth", JSON.stringify({ 
                token: action.payload.token, 
                user: userData 
            }));
        },
        loadUserFromStorage: (state) => {
            const stored = localStorage.getItem("auth");
            if (stored) {
                const parsed = JSON.parse(stored) as { token: string; user: User };
                const userData: User = {
                    ...parsed.user,
                    lastName: parsed.user.lastName || null,
                };
                state.token = parsed.token;
                state.user = userData;
            }
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
                (state, action: PayloadAction<{ token: string; user: User }>) => {
                    state.loading = false;
                    const userData: User = {
                        ...action.payload.user,
                        lastName: action.payload.user.lastName || null,
                    };
                    state.user = userData;
                    state.token = action.payload.token;
                }
            )
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { logout, setCredentials, loadUserFromStorage } = authSlice.actions;
export default authSlice.reducer;