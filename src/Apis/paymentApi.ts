import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const paymentApi = createApi({
  reducerPath: "paymentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:44344/api/",
  }),

  endpoints: (builder) => ({
    initialPayment: builder.mutation({
      query: (nameId) => ({
        url: "/payment",
        method: "POST",
        params: {
          userId: nameId,
        },
      }),
    }),
  }),
});
export const { useInitialPaymentMutation } = paymentApi;
export default paymentApi;
