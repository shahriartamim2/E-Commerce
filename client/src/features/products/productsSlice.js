import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading: false,
    products: [],
    error: null,
};

const BASE_URL = "http://localhost:3001/api/products";

export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
    const res = await axios.get(BASE_URL);
    return res.data.payload.products;
});

export const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.pending, (state) => {
            state.isLoading = true;
            state.error = null;
            });
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.products = action.payload;
            });
        builder.addCase(fetchProducts.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        });


    }
});

// Action creators are generated for each case reducer function


export default productsSlice.reducer;
