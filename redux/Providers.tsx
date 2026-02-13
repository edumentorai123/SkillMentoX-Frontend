"use client";

import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import authReducer, { AuthState, User } from "./Slices/authSlice";
import profileReducer from "./Slices/profileSlice";

const createStore = () => {
    // Define default state matching AuthState interface
    const defaultAuthState: AuthState = {
        user: null,
        token: null,
        hasProfile: false,
        isPremium: false,
        mentorSelected: false,
        mentorAccepted: false,
        loading: true,
        error: null,
    };

    let preloadedAuth = defaultAuthState;

    if (typeof window !== "undefined") {
        try {
            const stored = localStorage.getItem("auth");
            if (stored) {
                const parsed = JSON.parse(stored);
                // Ensure parsed data matches expected shape or fallback
                preloadedAuth = {
                    ...defaultAuthState,
                    user: parsed.user || null,
                    token: parsed.token || null,
                    hasProfile: parsed.hasProfile || false,
                    isPremium: parsed.isPremium || false,
                    loading: false,
                };
            } else {
                preloadedAuth = {
                    ...defaultAuthState,
                    loading: false,
                };
            }
        } catch (error) {
            console.error("Failed to load auth from localStorage in Providers:", error);
            preloadedAuth = {
                ...defaultAuthState,
                loading: false,
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
        preloadedState: {
            auth: preloadedAuth,
        },
    });
};

const store = createStore();

export default function Providers({ children }: { children: React.ReactNode }) {
    return <Provider store={store}>{children}</Provider>;
}