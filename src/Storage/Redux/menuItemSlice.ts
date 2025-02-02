import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  menuItem: [],
};

export const menuItemSlice = createSlice({
  name: "MenuItem",
  initialState: initialState,
  reducers: {
    setMeunItem: (state, action) => {
      state.menuItem = action.payload;
    },
  },
});
export const {setMeunItem} =menuItemSlice.actions;
export const menuItemReducer = menuItemSlice.reducer;