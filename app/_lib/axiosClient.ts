import axios from "axios";
import { API } from "./definitions";

// Create axios instance with default configuration
const axiosClient = axios.create({
  baseURL: "handshakr-v2.vercel.app",
  withCredentials: true, // includes JWT and CSRF 
  timeout: 10000, // timeout for request
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle authentication errors
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      // If on the login page, don't redirect
      if (!window.location.pathname.includes('/')) {
        window.location.href = '/';
      }
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
