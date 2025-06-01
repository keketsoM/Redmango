import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
     // "https://keketsom-001-site1.anytempurl.com/api/"
    // "https://localhost:44344/api/"
    baseUrl: "https://keketsom-001-site1.anytempurl.com/api/",
    prepareHeaders: (headers: Headers, api) => {
      const token = localStorage.getItem("token");
      token && headers.append("Authorization", "Bearer " + token);
    },
  }),
  tagTypes: ["Orders"],
  endpoints: (builder) => ({
    GetAllOrder: builder.query({
      query: ({ userId, searchString, status, pageSize, pageNumber }) => ({
        url: "Order",
        method: "GET",
        params: {
          userId: userId,
          searchString: searchString,
          status: status,
          pageSize: pageSize,
          pageNumber: pageNumber,
        },
      }),
      transformResponse(apiResponse: { result: any }, meta: any) {
        return {
          apiResponse,
          totalRecords: meta.response.headers.get("X-Pagination"),
        };
      },
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
