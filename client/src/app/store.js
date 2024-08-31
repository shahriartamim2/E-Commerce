import authSlice from '@/features/auth/authSlice'
import { authApi } from '@/services/authApi'
import { productsApi } from '@/services/productsApi'
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

export const store = configureStore({
    reducer: {
        [authApi.reducerPath] : authApi.reducer,
        [productsApi.reducerPath] : productsApi.reducer,
        auth: authSlice,

    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(authApi.middleware)
            .concat(productsApi.middleware),

})

setupListeners(store.dispatch)