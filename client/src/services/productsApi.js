import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "http://localhost:3001/api/";

export const productsApi = createApi({
    reducerPath: "productsApi",
    baseQuery: fetchBaseQuery({ baseUrl }),
    tagTypes: ["Products"],
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => `products`,
            providesTags: (result) => {
                result ? [...result.map(({ id }) => ({ type: 'Products', id }))] : [{ type: 'Products', id: 'LIST' }]
            }
        }),
        getProductById: builder.query({
            query: (id) => (`products/${id}`),
            providesTags : (result, error, id) => [{type: 'Products', id}]
        }),
        deleteProduct: builder.mutation({
            query: (id)=> ({
                url: `products/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: (result, error, id) => [{type: 'Products', id}]
        })

    }),
});

export const { useGetProductsQuery, useGetProductByIdQuery, useDeleteProductMutation } = productsApi;
