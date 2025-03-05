import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  menuItem: [],
  searchItem: "",
};

export const menuItemSlice = createSlice({
  name: "MenuItem",
  initialState: initialState,
  reducers: {
    setMeunItem: (state, action) => {
      state.menuItem = action.payload;
    },
    setSearchItem: (state, action) => {
      state.searchItem = action.payload;
    },
  },
});
export const { setMeunItem, setSearchItem } = menuItemSlice.actions;
export const menuItemReducer = menuItemSlice.reducer;
