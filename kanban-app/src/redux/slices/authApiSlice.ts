import { apiSlice } from "./apiSlice";
const API = `${import.meta.env.VITE_BASE_URL}`


export const authApiSlice = apiSlice.injectEndpoints({
    endpoints : (builder) => ({
        getOTP: builder.mutation({
            query: (data) => ({
                url: `${API}auth/generateOTP`,
                method: 'POST',
                body: data
            })
        }) ,
        verifyOTP: builder.mutation({
            query: (data) => ({
                url: `${API}auth/Login`,
                method: 'POST',
                body: data
            })
        })
    })
})


export const { useGetOTPMutation, useVerifyOTPMutation} = authApiSlice