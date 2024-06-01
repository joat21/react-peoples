import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Meta } from "../../entities/model";

type Age = {
  from: number;
  to: number;
};

interface FilterSliceState {
  meta: Meta | null;
  activePage: number;
  searchValue: string;
  gender: string;
  age: Age;
}

const initialState: FilterSliceState = {
  meta: null,
  activePage: 1,
  searchValue: "",
  gender: "any",
  age: { from: 14, to: 9999 },
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

    setGender(state, action: PayloadAction<string>) {
      state.gender = action.payload;
    },

    setAge(state, action: PayloadAction<Age>) {
      state.age = action.payload;
    },
  },
});

export const { setActivePage, setMeta, setSearchValue, setGender, setAge } =
  filterSlice.actions;

export default filterSlice.reducer;
