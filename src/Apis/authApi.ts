import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:44344/api/",
  }),

  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (userData) => ({
        url: "Auth/register",
        method: "POST",
        headers: { "Content-type": "application/json", },
        body: userData,
      }),
    }),
    loginUser: builder.mutation({
      query: (userCredential) => ({
        url: "Auth/login",
        method: "POST",
        body: userCredential,
      }),
    }),
  }),
});
export const { useRegisterUserMutation, useLoginUserMutation } = authApi;
export default authApi;
