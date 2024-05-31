import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/currentUserSlice";
import paginationReducer from "./slices/paginationSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    pagination: paginationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
