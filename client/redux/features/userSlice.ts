import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CurrentUser } from "../apis/auth/auth-api-slice";

interface InitialState {
  currentUser: CurrentUser | null;
}

const initialState: InitialState = {
  currentUser: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<CurrentUser>) {
      state.currentUser = action.payload;
    },
    removeUser(state) {
      state.currentUser = null;
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
