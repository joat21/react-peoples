import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: {},
};

export const currnetUserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentUser(state, action) {
      state.currentUser = action.payload;
    },
  },
});

export const { setCurrentUser } = currnetUserSlice.actions;

export default currnetUserSlice.reducer;
