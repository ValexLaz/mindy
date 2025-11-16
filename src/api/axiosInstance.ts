// src/api/axiosInstance.ts
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: '/api', // 👈 ahora TODAS las llamadas irán a /api/...
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Adds JWT token to headers
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken'); // Ajusta la key si es otra
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
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
