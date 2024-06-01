import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type Age = {
  from: number;
  to: number;
};

interface FilterSliceState {
  activePage: number;
  pagesCount: number;
  searchValue: string;
  gender: string;
  age: Age;
  city: string;
}

const initialState: FilterSliceState = {
  activePage: 1,
  pagesCount: 0,
  searchValue: "",
  gender: "any",
  age: { from: 14, to: 9999 },
  city: "",
};

export const filterSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    setActivePage(state, action: PayloadAction<number>) {
      state.activePage = action.payload;
    },

    setPagesCount(state, action: PayloadAction<number>) {
      state.pagesCount = action.payload;
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

    setCity(state, action: PayloadAction<string>) {
      state.city = action.payload;
    },
  },
});

export const {
  setActivePage,
  setPagesCount,
  setSearchValue,
  setGender,
  setAge,
  setCity,
} = filterSlice.actions;

export default filterSlice.reducer;
