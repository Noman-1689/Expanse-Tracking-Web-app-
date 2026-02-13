import { configureStore } from "@reduxjs/toolkit";
import expanceReducer from "../features/ExpanceTrack/expanceTrackSlice";

export const store = configureStore({
  reducer: {
    // Change this key from 'expanceReducer' to 'expanceTracker'
    expanceTracker: expanceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
