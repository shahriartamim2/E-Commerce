import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "http://localhost:3001/api/";

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({ baseUrl, credentials: "include" }),
    tagTypes: ["auth"],
    endpoints: (builder) => ({
        loginUser: builder.mutation({
            query: (form) => ({
                url: `auth/login`,
                method: 'POST',
                data: form,
            }),
            invalidatesTags: ["auth"],
        }),
    }),
});

export const {  useLoginUserQuery } = authApi;
