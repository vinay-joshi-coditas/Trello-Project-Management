import { apiSlice } from "./apiSlice";


export const authApiSlice = apiSlice.injectEndpoints({
    endpoints : (builder) => ({
        getOTP: builder.mutation({
            query: (data) => ({
                url: `auth/generateOTP`,
                method: 'POST',
                body: data
            })
        }) ,
        verifyOTP: builder.mutation({
            query: (data) => ({
                url:`auth/Login`,
                method: 'POST',
                body: data
            })
        })
    })
})


export const { useGetOTPMutation, useVerifyOTPMutation} = authApiSlice