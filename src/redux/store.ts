import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/currentUserSlice";
import filterReducer from "./slices/filterSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    filter: filterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
