import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const menuItemApi = createApi({
  reducerPath: "menuItemApi",
  baseQuery: fetchBaseQuery({
     // "https://keketsom-001-site1.anytempurl.com/api/"
    // "https://localhost:44344/api/"
    baseUrl: "https://keketsom-001-site1.anytempurl.com/api/",
    prepareHeaders: (headers: Headers, api) => {
      const token = localStorage.getItem("token");
      token && headers.append("Authorization", "Bearer " + token);
    },
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
