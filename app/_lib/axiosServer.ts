// Axios server component 
// stores jwt in cookies
// intercepts request gets and adds CSRF token in headers
'use server'
import axios from "axios";
import { cookies } from "next/headers";
import { API } from "./definitions";

const axiosServer = axios.create({
  baseURL: API.BASE,
  withCredentials: true, 
});

// Attach JWT & CSRF Token 
axiosServer.interceptors.request.use(async (config) => {
  
  const cookieStore = await cookies(); 
  const jwt = cookieStore.get("jwtCookie")?.value;
  const csrfToken = cookieStore.get("XSRF-TOKEN")?.value;

  if (jwt) {
    config.headers.Authorization = `Bearer ${jwt}`;
  }
  if (csrfToken) {
    config.headers["X-CSRF-TOKEN"] = csrfToken;
  }

  return config;
});

export default axiosServer;
