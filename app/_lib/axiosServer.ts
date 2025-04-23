/**
 * Axios server component that intercepts requests and adds the CSRF token in headers.
 * 
 * This server component creates an Axios instance with the base URL set to the API's base URL. 
 * It intercepts requests to attach the JWT and CSRF tokens from cookies, and modifies the headers 
 * accordingly before making the request.
 * 
 * @module axiosServer
 */

'use server';

import axios from "axios";
import { cookies } from "next/headers";
import { API } from "./definitions";

// Create an Axios instance with default configurations
const axiosServer = axios.create({
  baseURL: API.BASE, // API base URL
  withCredentials: true, // Ensure credentials (cookies) are sent with requests
  headers: {
    "Content-Type": "application/json", // Default header for JSON content
  },
});

// Intercepting each request to modify headers
axiosServer.interceptors.request.use(async (config) => {
  // Access cookies from the request context
  const cookieStore = await cookies();
  
  // Retrieve JWT and CSRF tokens from cookies
  const jwt = cookieStore.get('jwtCookie')?.value; // JWT token for authorization
  const csrf = cookieStore.get('XSRF-TOKEN')?.value; // CSRF token for securing mutating requests

  // If JWT is present, attach it to the request Authorization header
  if (jwt) {
    config.headers.Authorization = `Bearer ${jwt}`;
  }

  // If CSRF token is available and the request is a mutating one (POST, PUT, DELETE, PATCH),
  // add the CSRF token to the request headers
  if (csrf && ['post', 'put', 'delete', 'patch'].includes(config.method?.toLowerCase() || '')) {
    config.headers["XSRF-TOKEN"] = csrf; 
  }

  console.log("Request config:");
  console.log(config);

  return config;
});

export default axiosServer;
