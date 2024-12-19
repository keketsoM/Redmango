import { createSlice } from "@reduxjs/toolkit";
import { shoppingCartModel } from "../../Interface";

const initialState:shoppingCartModel = {
  cartItems: [],
};

export const shoppingCartSlice = createSlice({
  name: "CartItems",
  initialState: initialState,
  reducers: {
    setShoppingCart: (state, action) => {
      state.cartItems = action.payload;
    },
    updateQuantity: (state, action) => {
      state.cartItems = state.cartItems?.map((item) => {
        if (item.cartItemId === action.payload.cartItem.cartItemId) {
          item.quantity = action.payload.quantity;
        }
        return item
      });
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems?.filter((item) => {
        if (item.cartItemId === action.payload.cartItem.cartItemId) {
        return null;
        }
        return item
      });
    },
  },
});
export const { setShoppingCart } = shoppingCartSlice.actions;
export const shoppingCartReducer = shoppingCartSlice.reducer;
