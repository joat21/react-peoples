import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Meta } from "../../entities/model";

interface PaginationSliceState {
  meta: Meta | null;
  activePage: number;
}

const initialState: PaginationSliceState = {
  meta: null,
  activePage: 1,
};

export const paginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    setMeta(state, action: PayloadAction<Meta>) {
      state.meta = action.payload;
    },

    setActivePage(state, action: PayloadAction<number>) {
      state.activePage = action.payload;
    },
  },
});

export const { setActivePage, setMeta } = paginationSlice.actions;

export default paginationSlice.reducer;
