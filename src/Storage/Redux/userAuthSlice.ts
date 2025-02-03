import { createSlice } from "@reduxjs/toolkit";
import UserModel from "../../Interface/userModel";

export const emptyUserState: UserModel = {
  nameid: "",
  unique_name: "",
  email: "",
  role: "",
};

export const authUserSlice = createSlice({
  name: "userAuth",
  initialState: emptyUserState,
  reducers: {
    setLoggedInUser: (state, action) => {
      state.nameid = action.payload.nameid;
      state.unique_name = action.payload.unique_name;
      state.email = action.payload.email;
      state.role = action.payload.role;
    },
  },
});
export const { setLoggedInUser } = authUserSlice.actions;
export const userAuthReducer = authUserSlice.reducer;
