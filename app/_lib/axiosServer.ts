// Axios server component 
// intercepts requests and adds CSRF token in headers
'use server'
import axios from "axios";
import { cookies } from "next/headers";
import { API } from "./definitions";

const axiosServer = axios.create({
  baseURL: API.BASE,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Intercepts requests
axiosServer.interceptors.request.use(async (config) => {
  const cookieStore = await cookies();
  
  // Get tokens from cookies
  const jwt = cookieStore.get('jwtCookie')?.value;
  const csrf = cookieStore.get('XSRF-TOKEN')?.value;

  // Attach JWT from cookie
  if (jwt) {
    config.headers.Authorization = `Bearer ${jwt}`;
  }

  // Attach CSRF token for mutating requests
  if (csrf && ['post', 'put', 'delete', 'patch'].includes(config.method?.toLowerCase() || '')) {
    config.headers["XSRF-TOKEN"] = csrf; 
  }

  console.log("request config:");
  console.log(config);

  return config;
});

export default axiosServer;