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
  const cookieStore = cookies(); 
  const jwt = await cookieStore.get("jwt_token")?.value;

  if (jwt) {
    config.headers.Authorization = `Bearer ${jwt}`;
  }

  try {
    const csrfTokenRes = await axios.get(`${API.BASE}${API.CSRF_TOKEN}`, { // TODO: may need to replace with other way to get token
      withCredentials: true,
    });
    //Add CSRF
    if (csrfTokenRes.data?.csrfToken) {
      config.headers["X-CSRF-Token"] = csrfTokenRes.data.csrfToken;
    }
  } catch (error) {
    console.error("Error fetching CSRF token:", error);
  }

  return config;
});

export default axiosServer;
