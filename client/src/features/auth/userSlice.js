import { createSlice } from '@reduxjs/toolkit';


// Create a slice for user data
const userSlice = createSlice({
    name: 'user',
    initialState: {
        userInfo: null,
        isLoggedIn: false,
    },
    reducers: {
        setUserInfo(state, action) {
            state.userInfo = action.payload;
            state.isLoggedIn = true;
        },
        logout(state) {
            state.userInfo = null;
            state.isLoggedIn = false;
        },
    },
});

export const { setUserInfo, logout } = userSlice.actions;
export default userSlice.reducer;
