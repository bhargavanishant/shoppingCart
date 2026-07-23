import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Product } from "../types/categories";

// TODO: Build a better understanding how this is done 
export const productsApi = createApi({
    reducerPath: "productsApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com" }),
    endpoints: (builder) => ({
        getCategories: builder.query<string[], void>({
            query: () => "products/category-list",
        }),
        getProductsByCategory: builder.query<{ products: Product[]; total: number }, string>({
            query: (category) => `products/category/${category}`,
        }),
        getProduct: builder.query<Product, string>({
            query: (id) => `products/${id}`,
        }),
    }),
});

export const {
    useGetCategoriesQuery,
    useGetProductsByCategoryQuery,
    useGetProductQuery,
} = productsApi;