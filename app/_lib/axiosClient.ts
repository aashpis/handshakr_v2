'use client'
import axios from "axios";
import { API } from "./definitions";
import type { AxiosError } from "axios";

const axiosClient = axios.create({
  baseURL: API.BASE,
  timeout: 10000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to attach tokens
axiosClient.interceptors.request.use((config) => {
  // Extract CSRF token from cookies
  const csrfToken = document.cookie
    .split('; ')
    .find(row => row.startsWith('XSRF-TOKEN='))
    ?.split('=')[1];

  // Attach to mutating requests
  if (csrfToken && ['post', 'put', 'delete', 'patch'].includes(config.method?.toLowerCase() || '')) {
    config.headers['XSRF-TOKEN'] = csrfToken; // Correct header name
  }

  return config;
});

// Response interceptor 
axiosClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      
      // Redirect if not already on login page
      if (window.location.pathname !=='/') {
          window.location.href = "/"; 
      }
    }
    return Promise.reject(error);
  }
);

export default axiosClient;