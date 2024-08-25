import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunk to check if the user is authenticated on app load
export const authCheck = createAsyncThunk(
    'auth/authCheck',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('/api/auth/check', { withCredentials: true });
            return response.data.user;  // Returns the user data if authenticated
        } catch (error) {
            return rejectWithValue(error.response.data);  // Returns error message if not authenticated
        }
    }
);

const initialState = {
    user: null,  // Stores the authenticated user's data
    isAuthenticated: false,  // Boolean to check if the user is authenticated
    status: 'idle',  // Status of the auth check request
    error: null,  // Error message if the auth check fails
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logOut: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.status = 'idle';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(authCheck.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(authCheck.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.isAuthenticated = true;
                state.status = 'succeeded';
            })
            .addCase(authCheck.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
                state.user = null;
                state.isAuthenticated = false;
            });
    },
});

export const { logOut } = authSlice.actions;

export default authSlice.reducer;
