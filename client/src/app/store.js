
import { configureStore } from '@reduxjs/toolkit'
import authSlice from '../features/auth/authSlice'
import { authApi } from '../services/authApi'
import { productsApi } from '../services/productsApi'
import { usersApi } from '../services/usersApi'
import { setupListeners } from '@reduxjs/toolkit/query'
import { categoriesApi } from '@/services/categoriesApi'


export const store = configureStore({
    reducer: {
        [authApi.reducerPath] : authApi.reducer,
        [productsApi.reducerPath] : productsApi.reducer,
        [usersApi.reducerPath]: usersApi.reducer,
        [categoriesApi.reducerPath]: categoriesApi.reducer,
        auth: authSlice,

    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(authApi.middleware)
            .concat(productsApi.middleware)
            .concat(usersApi.middleware)
            .concat(categoriesApi.middleware),

})

setupListeners(store.dispatch)