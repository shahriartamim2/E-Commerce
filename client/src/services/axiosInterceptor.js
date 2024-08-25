import axios from 'axios';
import { clearUserInfo } from './localStorage';

// Create an Axios instance
const api = axios.create({
    baseURL: 'http://localhost:3001/api',
    withCredentials: true, // Ensure that cookies are sent with every request
});

// Add a response interceptor
api.interceptors.response.use(
    response => response,
    async (error) => {
        const originalRequest = error.config;

        // If the error status is 401, it means the access token is expired or invalid
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                // Attempt to refresh the token
                await api.get('/auth/refresh-token');

                // Retry the original request with the new token
                return api(originalRequest);
            } catch (refreshError) {
                console.error('Token refresh failed:', refreshError);
                clearUserInfo();

                // Redirect to the login page or handle logout
                window.location.href = '/login';
            }
        }

        return Promise.reject(error);
    }
);

export default api;
