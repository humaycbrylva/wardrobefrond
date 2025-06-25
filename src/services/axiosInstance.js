// src/services/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api', // serverin URL-sini buraya yaz
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Tokeni hər istəyə əlavə et
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
