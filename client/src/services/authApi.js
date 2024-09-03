import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


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
            invalidatesTags: ['User']
            // Handle the response and set the user's data in local state or Redux
        }),
        logout: builder.mutation({
            query: () => ({
                url: '/logout',
                method: 'POST',
            }),
            invalidatesTags: ['User']
        }),
    }),
});

// Export the auto-generated hooks for the endpoints
export const { useLoginMutation, useLogoutMutation } = authApi;
