import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const shoppingCartApi = createApi({
  reducerPath: "shoppingCartApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://keketsom-001-site1.anytempurl.com/api/",
    prepareHeaders: (headers: Headers, api) => {
      const token = localStorage.getItem("token");
      token && headers.append("Authorization", "Bearer " + token);
    },
  }),
  tagTypes: ["ShoppingCart"],
  endpoints: (builder) => ({
    getAllShoppingCart: builder.query({
      query: (userId) => ({
        url: `ShoppingCart?userId${userId}`,
        method: "GET",
        params: {
          userId: userId,
        },
      }),
      providesTags: ["ShoppingCart"],
    }),
    updateShoppingCart: builder.mutation({
      query: ({ menuItemId, updateQuantityBy, userId }) => ({
        url: "ShoppingCart",
        method: "POST",
        params: {
          menuItemId: menuItemId,
          updateQuantityBy: updateQuantityBy,
          userId: userId,
        },
      }),
      invalidatesTags: ["ShoppingCart"],
    }),
  }),
});
export const { useGetAllShoppingCartQuery, useUpdateShoppingCartMutation } =
  shoppingCartApi;
export default shoppingCartApi;
