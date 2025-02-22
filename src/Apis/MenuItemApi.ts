import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const menuItemApi = createApi({
  reducerPath: "menuItemApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:44344/api/",
  }),
  tagTypes: ["MenuItems"],
  endpoints: (builder) => ({
    getAllMenuItem: builder.query({
      query: () => ({
        url: "MenuItem",
      }),
      providesTags: ["MenuItems"],
    }),
    CreateMenuItem: builder.mutation({
      query: (data) => ({
        url: `MenuItem`,
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: data,
      }),
      invalidatesTags: ["MenuItems"],
    }),
    updateMenuItem: builder.mutation({
      query: ({ data, id }) => ({
        url: `MenuItem/${id}`,
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: data,
      }),
      invalidatesTags: ["MenuItems"],
    }),
    deleteMenuItem: builder.mutation({
      query: (id) => ({
        url: `MenuItem/${id}`,
        method: "DELETE",
        headers: { "Content-type": "application/json" },
        body: id,
      }),
      invalidatesTags: ["MenuItems"],
    }),
    getMenuItem: builder.query({
      query: (id) => ({
        url: `MenuItem/${id}`,
      }),
      providesTags: ["MenuItems"],
    }),
  }),
});
export const {
  useGetAllMenuItemQuery,
  useGetMenuItemQuery,
  useUpdateMenuItemMutation,
  useDeleteMenuItemMutation,
  useCreateMenuItemMutation,
} = menuItemApi;
export default menuItemApi;
