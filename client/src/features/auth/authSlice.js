import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const baseUrl = 'http://localhost:3001';

export const authCheck = createAsyncThunk(
    'auth/authCheck',
    async (_, { dispatch, rejectWithValue }) => {
        try {
            const response = await axios.get(`${baseUrl}/api/auth/check`, {
                withCredentials: true,
            });

            return response.data.payload.user;
        } catch (error) {
            // If access token is expired or missing, try refreshing it
            if (
                error.response?.status === 401 &&
                (error.response.data.message === "Access token expired" ||
                    error.response.data.message === "Access Denied. No token found")
            ) {
                try {
                    const refreshResponse = await axios.post(
                        `${baseUrl}/api/auth/refresh-token`,
                        {},
                        { withCredentials: true }
                    );

                    // Retry the original auth check with the new access token
                    const retryResponse = await axios.get(`${baseUrl}/api/auth/check`, {
                        withCredentials: true,
                    });

                    return retryResponse.data.payload.user;
                } catch (refreshError) {
                    return rejectWithValue("Session expired. Please log in again.");
                }
            }
            return rejectWithValue("Not authenticated");
        }
    }
);
const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        isAuthenticated: false,
        status: "idle",
        error: null,
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;  // Fix: Access payload from action
            state.isAuthenticated = true;
            state.status = "succeeded";
        },
        logOut: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.status = "idle";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(authCheck.pending, (state) => {
                state.status = "loading";
            })
            .addCase(authCheck.fulfilled, (state, action) => {
                state.user = action.payload;
                state.isAuthenticated = true;
                state.status = "succeeded";
            })
            .addCase(authCheck.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
                state.user = null;
                state.isAuthenticated = false;
            });
    },
});

export const { setUser, logOut } = authSlice.actions;

export default authSlice.reducer;
