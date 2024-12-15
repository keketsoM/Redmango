import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react";

const menuItemApi = createApi({
    reducerPath:"menuItemApi",
    baseQuery: fetchBaseQuery({baseUrl:"https://localhost:44344/api/MenuItem/"}),
    tagTypes:['MenuItems'],
    endpoints:(builder)=>({
      getmenuItem:builder.query({
        
      })
    })
})
