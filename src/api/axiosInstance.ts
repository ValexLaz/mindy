// src/api/axiosInstance.ts
import axios from 'axios';

const baseURL = '/';

if (!baseURL) {
  console.error(
    'FATAL ERROR: VITE_API_BASE_URL is not defined in your .env file!',
  );
  // Optional: throw new Error('API base URL not configured');
}

const axiosInstance = axios.create({
  baseURL: baseURL, 
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Adds JWT token to headers
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken'); // Adjust key if needed
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response Interceptor: Handles common errors like 401
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error('Unauthorized (401). Token might be invalid or expired.');
      localStorage.removeItem('authToken');
     
       if (window.location.pathname !== '/login') {
         window.location.href = '/login'; 
       }
    } else {
       console.error(
        'API Request Error:',
        error.response?.data?.message || error.message,
       );
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;