import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const menuItemApi = createApi({
  reducerPath: "menuItemApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:44344/api/",
  }),
  tagTypes: ["MenuItems"],
  endpoints: (builder) => ({
    GetAllMenuItem: builder.query({
      query: () => ({
        url: "MenuItem",
      }),

      providesTags: ["MenuItems"],
    }),
    CreateMenuItem: builder.mutation({
      query: (meunItemsCreateDTO) => ({
        url: `MenuItem`,
        method: "POST",

        body: meunItemsCreateDTO,
      }),
      invalidatesTags: ["MenuItems"],
    }),
    updateMenuItem: builder.mutation({
      query: ({ data, id }) => ({
        url: `MenuItem/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["MenuItems"],
    }),
    deleteMenuItem: builder.mutation({
      query: (id) => ({
        url: `MenuItem/${id}`,
        method: "DELETE",

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
