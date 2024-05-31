import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { People } from "../../entities/model";

interface CurrentUserSliceState {
  currentUser: People | null;
  isAuthorized: boolean;
}

const initialState: CurrentUserSliceState = {
  currentUser: null,
  isAuthorized: false,
};

export const currentUserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentUser(state, action: PayloadAction<People>) {
      state.currentUser = action.payload;
    },
    setIsAuthorized(state, action: PayloadAction<boolean>) {
      state.isAuthorized = action.payload;
    },
  },
});

export const { setCurrentUser, setIsAuthorized } = currentUserSlice.actions;

export default currentUserSlice.reducer;
