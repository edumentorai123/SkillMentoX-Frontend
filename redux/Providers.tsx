"use client";

import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slices/authSlice";
import profileReducer from "./Slices/profileSlice"

interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: "student" | "mentor" | "admin" | null;
}

interface AuthState {
    user: User | null;
    token: string | null;
    loading: boolean;
    error: string | null;
}

const createStore = () => {
    const defaultState: { auth: AuthState } = {
        auth: {
            user: null,
            token: null,
            loading: true,
            error: null,
        },
    };

    let preloadedState = defaultState;
    if (typeof window !== "undefined") {
        try {
            const stored = localStorage.getItem("auth");
            if (stored) {
                const parsed = JSON.parse(stored) as { token: string; user: User };
                preloadedState = {
                    auth: {
                        user: parsed.user || null,
                        token: parsed.token || null,
                        loading: false,
                        error: null,
                    },
                };
            } else {
                preloadedState = {
                    auth: {
                        ...defaultState.auth,
                        loading: false,
                    },
                };
            }
        } catch (error) {
            console.error("Failed to load auth from localStorage in Providers:", error);
            preloadedState = {
                auth: {
                    ...defaultState.auth,
                    loading: false,
                },
            };
        }
    } else {
        console.log("SSR: Using default state with loading: true for Redux store");
    }

    return configureStore({
        reducer: {
            auth: authReducer,
            profile: profileReducer,
        },
        preloadedState,
    });
};

const store = createStore();

export default function Providers({ children }: { children: React.ReactNode }) {
    return <Provider store={store}>{children}</Provider>;
}