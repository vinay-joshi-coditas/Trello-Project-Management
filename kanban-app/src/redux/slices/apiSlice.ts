import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";


export const apiSlice = createApi({
    baseQuery: fetchBaseQuery({baseUrl:"https://k876zjtd-8008.inc1.devtunnels.ms/"}),
    endpoints: (builder) => ({})
})
