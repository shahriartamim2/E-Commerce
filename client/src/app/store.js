import authSlice from '@/features/auth/authSlice'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
    reducer: {
        auth: authSlice,
    },
})