// Axios server component 
// intercepts request gets and adds CSRF token in headers
'use server'
import axios from "axios";
// import { cookies } from "next/headers";
import { API } from "./definitions";

const axiosServer = axios.create({
  baseURL: API.BASE,
  withCredentials: true, 
  headers: {
    "Content-Type": "application/json",
  },
});

//  Intercepts requests
//  Attaches JWT & CSRF Token 
axiosServer.interceptors.request.use(async (config) => {
  
  // Get stored tokens
  const jwt = localStorage.getItem('jwt');
  const csrf = localStorage.getItem('csrf');

  // Attach JWT
  if (jwt) {
    config.headers.Authorization = `Bearer ${jwt}`;
  }

  // Attach CSRF token for data modification requests
  if (csrf && ['post', 'put', 'delete', 'patch'].includes(config.method?.toLowerCase() || '')) {
    config.headers["X-CSRF-TOKEN"] = csrf;
  }
  
  config.headers["Content-Type"] = "application/json";

  return config;
});

export default axiosServer;

