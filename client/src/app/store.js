import authSlice from '@/features/auth/authSlice'
import { authApi } from '@/services/authApi'
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

export const store = configureStore({
    reducer: {
        [authApi.reducerPath] : authApi.reducer,
        auth: authSlice,

    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware),
})

setupListeners(store.dispatch)