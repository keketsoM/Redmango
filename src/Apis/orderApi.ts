import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:44344/api/",
  }),
  tagTypes: ["Orders"],
  endpoints: (builder) => ({
    GetAllOrder: builder.query({
      query: (userId) => ({
        url: "Order",
        method: "GET",
        params: {
          userId: userId,
        },
      }),
      providesTags: ["Orders"],
    }),
    updateOrderHeader: builder.mutation({
      query: (orderHeaderUpdateDTO) => ({
        
        url: `Order/${orderHeaderUpdateDTO.orderHeaderId}`,
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: orderHeaderUpdateDTO,
      }),
      invalidatesTags: ["Orders"],
    }),
    GetOrderDetails: builder.query({
      query: (orderHeaderId) => ({
        url: `Order/${orderHeaderId}`,
        method: "GET",
        params: {
          orderHeaderId: orderHeaderId,
        },
      }),
      providesTags: ["Orders"],
    }),
    CreateOrder: builder.mutation({
      query: (orderHeaderCreateDTO) => ({
        url: "Order",
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: orderHeaderCreateDTO,
      }),
      invalidatesTags: ["Orders"],
    }),

   
  }),
});
export const {
  useGetAllOrderQuery,
  useGetOrderDetailsQuery,
  useCreateOrderMutation,
  useUpdateOrderHeaderMutation,
} = orderApi;
export default orderApi;
