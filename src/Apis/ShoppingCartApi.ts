import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const shoppingCartApi = createApi({
  reducerPath: "shoppingCartApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:44344/api/",
  }),
  tagTypes: ["ShoppingCart"],
  endpoints: (builder) => ({
    getAllShoppingCart: builder.query({
      query: (userId) => ({
        url: `ShoppingCart/${userId}`,
        params:{
          userId:userId
        }
      }),
      providesTags: ["ShoppingCart"],
    }),
    updateShoppingCart: builder.mutation({
      query: ({menuItemId, updateQuantity,userId}) => ({
        url: "ShoppingCart",
        method:"POST",
        params:{
          menuItemId: menuItemId,
          updateQuantityBy: updateQuantity,
          userId:userId,
        }
      }),
      invalidatesTags: ["ShoppingCart"],
    }),
  }),
});
export const { useGetAllShoppingCartQuery, useUpdateShoppingCartMutation } =
  shoppingCartApi;
export default shoppingCartApi;
