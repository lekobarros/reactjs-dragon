import { configureStore } from "@reduxjs/toolkit";

// Reducers
import authSlice from './features/authSlice';
import dragonsReducer from "./features/dragonsSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    dragonsReducer
  },
  devTools: process.env.NODE_ENV !== "production",
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
