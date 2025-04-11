'use client'
import axios from "axios";
import { API } from "./definitions";
import type { AxiosError } from "axios";
import { useRouter } from "next/navigation";


const axiosClient = axios.create({
  baseURL: API.BASE,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to attach tokens
axiosClient.interceptors.request.use((config) => {
  // Get tokens from localStorage
  const jwt = localStorage.getItem('jwt');
  const csrf = localStorage.getItem('csrf');

  // Attach JWT to all requests if available
  if (jwt) {
    config.headers.Authorization = `Bearer ${jwt}`;
  }

  // Attach CSRF token for mutating requests
  if (csrf && ['post', 'put', 'delete'].includes(config.method?.toLowerCase() || '')) {
    config.headers["X-CSRF-TOKEN"] = csrf;
  }

  config.headers["Content-Type"] = "application/json";
  
  return config;
});

// Response interceptor 
axiosClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      // Clear tokens on auth failures
      localStorage.removeItem('jwt');
      localStorage.removeItem('csrf');
      
      // Redirect if not already on login page
      if (!window.location.pathname.includes('/')) {
          const router = useRouter();
          router.push("/");
      }
    }
    return Promise.reject(error);
  }
);

export default axiosClient;