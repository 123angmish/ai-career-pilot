import axios from 'axios';

const api = axios.create({
  baseURL: (import.meta.env.VITE_API_URL as string) || 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to attach JWT
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('cp_token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle formatting and common errors (like 401 Unauthorized)
api.interceptors.response.use(
  (response) => {
    // If the response is not already wrapped in ApiResponse, wrap it
    if (response.data && typeof response.data === 'object' && !('success' in response.data)) {
      response.data = {
        success: true,
        message: '',
        data: response.data,
        timestamp: new Date().toISOString(),
      };
    }
    return response;
  },
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        // Clear local storage and redirect to login if unauthorized
        localStorage.removeItem('cp_token');
        localStorage.removeItem('cp_user');
        if (window.location.pathname !== '/login' && window.location.pathname !== '/register') {
          window.location.href = '/login';
        }
      }
      
      // If error payload is not wrapped in ApiError, wrap it
      if (error.response.data && typeof error.response.data === 'object' && !('success' in error.response.data)) {
        error.response.data = {
          success: false,
          message: error.response.data.message || error.response.data.error || 'An error occurred.',
          errors: error.response.data.errors,
          timestamp: new Date().toISOString(),
        };
      }
    }
    return Promise.reject(error);
  }
);

export default api;
