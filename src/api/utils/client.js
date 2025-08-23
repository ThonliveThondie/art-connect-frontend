import axios from 'axios';
import {useStore} from '@/store/useStore';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {'Content-Type': 'application/json'},
});

apiClient.interceptors.request.use(
  (config) => {
    try {
      const {token} = useStore.getState();
      if (token) {
        const clean = String(token).trim();
        config.headers = config.headers || {};
        config.headers.Authorization = clean.startsWith('Bearer ') ? clean : `Bearer ${clean}`;
      }
    } catch (error) {
      console.error(error?.message);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const {logout} = useStore.getState();
      logout();
      window.location.replace('/login');
    }
    return Promise.reject(error);
  }
);

export default apiClient;
