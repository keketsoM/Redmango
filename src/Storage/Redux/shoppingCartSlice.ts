import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  cartItem: [],
};

export const shoppingCartSlice = createSlice({
  name: "CartItems",
  initialState: initialState,
  reducers: {
    setShoppingCart: (state, action) => {
      state.cartItem = action.payload;
    },
  },
});
export const {setShoppingCart} = shoppingCartSlice.actions;
export const shoppingCartReducer = shoppingCartSlice.reducer;