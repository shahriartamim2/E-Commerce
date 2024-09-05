import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = 'http://localhost:3001/api';

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
                `/products/?page=${page}&limit=${limit}`,
            providesTags: (result) => {
                if(result){
                    const data = result.payload.products;
                    return result
                        ? [...data.map(({ id }) => ({ type: 'Products', id })), 'Products']
                        : ['Products'];
                }
            }
        }),
        addProduct: (build).mutation({
            query : () =>
                '/products',
            invalidatesTags : ['Products']
        })

    })
})

export const { useGetProductsQuery } = productsApi;