// axiosClient.ts
'use client'
import axios from "axios";
import { API } from "./definitions";

const axiosClient = axios.create({
  baseURL: API.BASE,
  withCredentials: true,
  headers: { "Content-Type": "application/json" }
});

// Helper to parse cookies
const getCSRFCookie = () => {
  return document.cookie
    .split('; ')
    .find(row => row.startsWith('MY-XSRF-TOKEN='))
    ?.split('=')[1];
};

// Request interceptor
axiosClient.interceptors.request.use((config) => {
  // Skip CSRF for login/register
  if (['/auth/login', '/auth/register'].some(path => config.url?.endsWith(path))) {
    return config;
  }

  // Attach CSRF token for mutating requests
  if (['post', 'put', 'delete', 'patch'].includes(config.method?.toLowerCase() ?? '')) {
    const csrfToken = getCSRFCookie();
    if (csrfToken) {
      config.headers['X-XSRF-TOKEN'] = csrfToken;
    }
  }

  return config;
});

// Response interceptor to capture new CSRF tokens
axiosClient.interceptors.response.use((response) => {
  const newCSRFToken = response.headers['x-csrf-token'];
  if (newCSRFToken) {
    // Update cookie directly (if needed)
    document.cookie = `MY-XSRF-TOKEN=${newCSRFToken}; Path=/; Secure; SameSite=Lax`;
  }
  return response;
}, (error) => {
  // Existing error handling
});

export default axiosClient;