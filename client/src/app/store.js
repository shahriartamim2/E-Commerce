
import { configureStore } from '@reduxjs/toolkit'
import authSlice from '../features/auth/authSlice'
import { authApi } from '../services/authApi'
import { productsApi } from '../services/productsApi'
import { usersApi } from '../services/usersApi'
import { setupListeners } from '@reduxjs/toolkit/query'


export const store = configureStore({
    reducer: {
        [authApi.reducerPath] : authApi.reducer,
        [productsApi.reducerPath] : productsApi.reducer,
        [usersApi.reducerPath]: usersApi.reducer,
        auth: authSlice,

    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(authApi.middleware)
            .concat(productsApi.middleware)
            .concat(usersApi.middleware),

})

setupListeners(store.dispatch)