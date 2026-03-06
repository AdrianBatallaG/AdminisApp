import axios from 'axios';

const defaultApiUrl = 'http://localhost:8000/api';
const rawApiUrl = (import.meta.env.VITE_API_URL || defaultApiUrl).trim();

const baseURL = rawApiUrl.replace(/\/+$/, '');

const apiClient = axios.create({
  baseURL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default apiClient;
export { baseURL as apiBaseUrl };