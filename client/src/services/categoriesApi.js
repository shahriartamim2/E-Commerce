import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = 'http://localhost:3001/api';

export const categoriesApi = createApi({
    reducerPath: 'categoriesApi',
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl,
        credentials: 'include',
    }),
    tagTypes: ['Categories'],
    endpoints: (build) => ({
        getCategories: build.query({
            query: () =>
                `/categories`,
            providesTags: (result) => {
                if (result) {
                    const data = result.payload.categories;
                    return result
                        ? [...data.map(({ id }) => ({ type: 'Products', id })), 'Products']
                        : ['Products'];
                }
            }
        }),
        getSingleCategory: build.query({
            query: (slug) => `/categories/${slug}`,
            providesTags: (result, error, id) => [{ type: 'Products', id }]
        }),

    })
})

export const { useGetCategoriesQuery, useGetSingleCategoryQuery } = categoriesApi;