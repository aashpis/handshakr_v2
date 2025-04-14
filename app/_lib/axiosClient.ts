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

  if (config.url?.endsWith('/auth/register') || config.url?.endsWith('/auth/login')) {
    return config;
  }

  // Extract CSRF token from cookies
  const csrfToken = document.cookie
    .split('; ')
    .find(row => row.startsWith('XSRF-TOKEN='))
    ?.split('=')[1];
    
    console.log("Cookies after axiosClient csrfToken: ", csrfToken);

  // Attach to mutating requests
  if (csrfToken && ['post', 'put', 'delete', 'patch'].includes(config.method?.toLowerCase() || '') ) {
    config.headers['X-XSRF-TOKEN'] = csrfToken; // TODO: Is this the right syntax to set headers? Is this the Correct header name?
    console.log("csrfToken added to header") 
  }
  console.log("request config:");
  console.log(config);

  return config;
});

// Response interceptor 
axiosClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      
      // Redirect if not already on login page
      if (window.location.pathname !=='/' &&  window.location.pathname !=='/register' ) {
          window.location.href = "/"; 
      }
    }
    return Promise.reject(error);
  }
);

export default axiosClient;