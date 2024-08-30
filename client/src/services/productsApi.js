import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

const baseUrl = 'http://localhost:3001/api/products';

export const productsApi = createApi({
    reducerPath: 'productsApi',
    baseQuery : fetchBaseQuery({
        baseUrl: baseUrl, 
        credentials: 'include',
    }),
    tagTypes: ['Products'],
    endpoints: (build) => ({
        getProducts: build.query({
            query: ({ page = 1, limit = 10} = {}) =>
                `/?page=${page}&limit=${limit}`,
            providesTags: (result) =>
                result
                    ? [...result.map(({ id }) => ({ type: 'Products', id })), 'Products']
                    : ['Products'],
        }),

    })
})

export const { useGetProductsQuery, } = productsApi;