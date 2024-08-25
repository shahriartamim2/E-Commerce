import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define the base API slice
const baseUrl = 'http://localhost:3001/api/auth';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl,  // Base URL for your auth endpoints
        credentials: 'include', // Ensures cookies are sent with the request (needed for HttpOnly cookies)
    }),
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: '/login',
                method: 'POST',
                body: credentials,
            }),
            // Handle the response and set the user's data in local state or Redux
        }),
        logout: builder.mutation({
            query: () => ({
                url: '/logout',
                method: 'POST',
            }),
        }),
    }),
});

// Export the auto-generated hooks for the endpoints
export const { useLoginMutation, useLogoutMutation } = authApi;
