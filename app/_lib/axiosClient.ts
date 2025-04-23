/**
 * Axios client component that handles HTTP requests with automatic attachment of tokens,
 * and intercepts responses to handle authentication errors.
 * 
 * This client component configures an Axios instance for making API requests with features
 * like token attachment for mutating requests (POST, PUT, DELETE, PATCH), response error handling,
 * and a timeout for requests.
 * 
 * @module axiosClient
 */

'use client';

import axios from "axios";
import { API } from "./definitions";
import type { AxiosError } from "axios";

// Create an Axios instance with default configurations
const axiosClient = axios.create({
  baseURL: API.BASE, // Set the base URL for the API
  timeout: 10000, // Set the timeout for requests (10 seconds)
  withCredentials: true, // Ensure credentials (cookies) are sent with requests
  headers: {
    "Content-Type": "application/json", // Default header for JSON content
  },
});

// Request interceptor to modify the request before sending
axiosClient.interceptors.request.use((config) => {
  
  // Skip modifying headers for registration and login endpoints
  if (config.url?.endsWith('/auth/register') || config.url?.endsWith('/auth/login')) {
    console.log("Axios Client Config: ", config); // Debugging log for registration/login requests
    return config;
  }

  // Retrieve CSRF token from sessionStorage for mutating requests
  const csrfToken = sessionStorage.getItem("X-XSRF-TOKEN");

  // Debugging log
  console.log("[Axios Client] Config: ", config);
  console.log("Cookies after axiosClient csrfToken: ", csrfToken);

  // Attach CSRF token for mutating requests (POST, PUT, DELETE, PATCH)
  if (csrfToken && ['post', 'put', 'delete', 'patch'].includes(config.method?.toLowerCase() || '')) {
    console.log("[AxiosClient] Method: ", config.method);
    config.headers['X-XSRF-TOKEN'] = csrfToken; // Attach CSRF token to the request header
    console.log("[AxiosClient]: CSRF token added to header"); // Debugging log
  }

  // Debugging log for the final request configuration
  console.log("Request config:");
  console.log(config);

  return config;
});

// Response interceptor to handle errors
axiosClient.interceptors.response.use(
  (response) => response, // Return response if no errors occur
  (error: AxiosError) => {
    // Handle authentication errors (401 Unauthorized or 403 Forbidden)
    if (error.response?.status === 401 || error.response?.status === 403) {
      
      // Debugging logs for authentication errors
      if (error.response?.status === 401) {
        console.log("axiosClient: 401 response, redirect to login");
      }
      if (error.response?.status === 403) {
        console.log("axiosClient: 403 response, redirect to login");
      }

      // Redirect to the login page if the user is not on the login or register page
      if (window.location.pathname !== '/' && window.location.pathname !== '/register') {
        window.location.href = "/"; // Redirect to the login page
      }
    }
    return Promise.reject(error); // Reject the promise with the error
  }
);

export default axiosClient;
