import { configureStore } from "@reduxjs/toolkit";
import { authApi, orderApi } from "../../Apis";
import menuItemApi from "../../Apis/MenuItemApi";
import paymentApi from "../../Apis/paymentApi";
import shoppingCartApi from "../../Apis/ShoppingCartApi";
import { menuItemReducer } from "./menuItemSlice";
import { shoppingCartReducer } from "./shoppingCartSlice";
import { userAuthReducer } from "./userAuthSlice";

const store = configureStore({
  reducer: {
    menuItemStore: menuItemReducer,
    shoppingCartstore: shoppingCartReducer,
    userAuthstore: userAuthReducer,
    [paymentApi.reducerPath]: paymentApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [menuItemApi.reducerPath]: menuItemApi.reducer,
    [shoppingCartApi.reducerPath]: shoppingCartApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(menuItemApi.middleware)
      .concat(shoppingCartApi.middleware)
      .concat(authApi.middleware)
      .concat(paymentApi.middleware)
      .concat(orderApi.middleware),
});
export type RootState = ReturnType<typeof store.getState>;
export default store;
