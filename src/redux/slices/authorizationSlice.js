import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthorized: false,
};

export const authorizationSlice = createSlice({
  name: "authorization",
  initialState,
  reducers: {
    setIsAuthorized(state, action) {
      state.isAuthorized = action.payload;
    },
  },
});

export const { setIsAuthorized } = authorizationSlice.actions;

export default authorizationSlice.reducer;
