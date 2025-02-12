import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:44344/api/",
  }),

  endpoints: (builder) => ({
    GetAllOrder: builder.query({
      query: (userId) => ({
        url: "/Order",
        method: "GET",
        params:{
          userId:userId
        }
      }),
    }),
    CreateOrder: builder.mutation({
      query: (orderDetails) => ({
        url: "/Order",
        method: "POST",
        headers: { "Content-type": "application/json", },
        body:orderDetails
        
      }),
    }),
    GetAllOrderById: builder.mutation({
      query: (orderId) => ({
        url: `/Order/${orderId}`,
        method: "GET",
       params:{
        orderId:orderId,
        // orderHeaderId:orderHeaderId
       }
      }),
    }),
    updateOrder: builder.mutation({
      query: (orderId) => ({
        url: `/Order/${orderId}`,
        method: "PUT",
        params: {
          orderId: orderId,
        },
      }),
    }),
  }),
});
export const { useCreateOrderMutation } = orderApi;
export default orderApi;
