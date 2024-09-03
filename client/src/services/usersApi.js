import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = 'http://localhost:3001/api';

export const usersApi = createApi({
    reducerPath: 'usersApi',
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl,
        credentials: 'include',
    }),
    tagTypes: ['Users'],
    endpoints: (build) => ({
        getUsers: build.query({
            query: () =>
                `/users/`,
            providesTags: (result) => {
                const data = result.payload.users;
                return result
                    ? [...data.map(({ id }) => ({ type: 'Products', id })), 'Users']
                    : ['Users'];
            }
        }),
    })
})

export const { useGetUsersQuery } = usersApi;