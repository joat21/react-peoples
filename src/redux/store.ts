import { configureStore } from "@reduxjs/toolkit";
import authorizationReducer from "./slices/authorizationSlice";
import userReducer from "./slices/userSlice";
import paginationReducer from "./slices/paginationSlice";

export const store = configureStore({
  reducer: {
    authorization: authorizationReducer,
    user: userReducer,
    pagination: paginationReducer,
  },
});
