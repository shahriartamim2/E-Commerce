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
                if(result){
                    const data = result.payload.users;
                    return result
                        ? [...data.map(({ id }) => ({ type: 'Products', id })), 'Users']
                        : ['Users'];
                }
            }
        }),
        getSingleUser: build.query({
            query: (id) =>
                `/users/${id}`,
            providesTags: (result, id) => [{ type: 'User', id }],
        }),
        processRegister: build.mutation({
            query: (formData) => ({
                url: "/users/process-register",
                method: 'POST',
                body: formData,
                
            }),
            invalidatesTags: [{ type: 'User' }]
        }),
        activateUser: build.mutation({
            query: (data) => ({
                url: `users/activate/${data.token}`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: [{ type: 'User' }]
        }),
    })
})

export const { useGetUsersQuery, useGetSingleUserQuery, useProcessRegisterMutation, useActivateUserMutation } = usersApi;