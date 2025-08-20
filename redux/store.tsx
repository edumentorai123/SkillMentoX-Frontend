import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "./Slices/profileSlice";
import authSlice from "./Slices/authSlice"

export const store = configureStore({
    reducer: {
    profile: profileReducer,
    auth: authSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
