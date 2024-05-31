import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  meta: {},
  activePage: 1,
};

export const paginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    setMeta(state, action) {
      state.meta = action.payload;
    },

    setActivePage(state, action) {
      state.activePage = action.payload;
    },
  },
});

export const { setActivePage, setMeta } = paginationSlice.actions;

export default paginationSlice.reducer;
