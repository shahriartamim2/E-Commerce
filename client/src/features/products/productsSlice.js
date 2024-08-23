import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    products: [],
    error: null,
};

export const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
});



export default productsSlice.reducer;
