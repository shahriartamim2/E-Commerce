import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoggedin: false,
    user: null, // or {}
    error: null,
};


const BASE_URL = "http://localhost:3001/api/auth/login";

export const login = createAsyncThunk(
    "auth/login",
    async (user) => {
        const res = await axios.post(BASE_URL, user);
        return res.data.payload.userWithoutPassword;
    }
);

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state) => {
            state.isLoggedin = false;
            state.error = null;
        });
        builder.addCase(login.fulfilled, (state, action) => {
            state.isLoggedin = true;
            state.user = action.payload;
        });
        builder.addCase(login.rejected, (state, action) => {
            state.isLoggedin = false;
            state.error = action.error.message;
        });
    },
});



// Action creators are generated for each case reducer function

export default authSlice.reducer;
