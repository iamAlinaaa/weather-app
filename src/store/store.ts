import { configureStore } from "@reduxjs/toolkit";
import cityReducer from "./citySlice";

export const store = configureStore({
  reducer: {
    city: cityReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
