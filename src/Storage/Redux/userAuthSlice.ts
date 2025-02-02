import { createSlice } from "@reduxjs/toolkit";
import UserModel from "../../Interface/userModel";

const initialState: UserModel = {
  id: "",
  fullName: "",
  email: "",
  role: "",
};

export const authUserSlice = createSlice({
  name: "userAuth",
  initialState: initialState,
  reducers: {
    setLoggedInUser: (state, action) => {
      state.id = action.payload.id;
      state.fullName = action.payload.fullName;
      state.email = action.payload.email;
      state.role = action.payload.role;
    },
  },
});
export const { setLoggedInUser } = authUserSlice.actions;
export const userAuthReducer = authUserSlice.reducer;
