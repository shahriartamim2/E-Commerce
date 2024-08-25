import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


// Thunk to check if the user is authenticated and handle token refresh
export const authCheck = createAsyncThunk(
    'auth/authCheck',
    async (_, { dispatch, rejectWithValue }) => {
        try {
            const response = await axios.get('/api/auth/check', { withCredentials: true });
            return response.data.payload.user;
        } catch (error) {
            if (error.response?.status === 401 && error.response.data.message === 'Access token expired') {
                // Attempt to refresh the token
                try {
                    const refreshResponse = await axios.post('/api/auth/refresh', {}, { withCredentials: true });
                    return refreshResponse.data.payload.user; 
                } catch (refreshError) {
                    return rejectWithValue('Session expired. Please log in again.');
                }
            }
            return rejectWithValue('Not authenticated');
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        isAuthenticated: false,
        status: 'idle',
        error: null,
    },
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
                state.user = action.payload;
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
