import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Meta } from "../../entities/model";

interface FilterSliceState {
  meta: Meta | null;
  activePage: number;
  searchValue: string;
}

const initialState: FilterSliceState = {
  meta: null,
  activePage: 1,
  searchValue: "",
};

export const filterSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    setMeta(state, action: PayloadAction<Meta>) {
      state.meta = action.payload;
    },

    setActivePage(state, action: PayloadAction<number>) {
      state.activePage = action.payload;
    },

    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
  },
});

export const { setActivePage, setMeta, setSearchValue } = filterSlice.actions;

export default filterSlice.reducer;
