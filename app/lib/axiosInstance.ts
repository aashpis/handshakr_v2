import axios from "axios";
import { cookies } from "next/headers";
import { API } from "./definitions";

// Create Axios instance
const axiosInstance = axios.create({
  baseURL: API.BASE,
  withCredentials: true, // makes sure JWT and CSRF are sent
});

// intercepts requests, attaches JWT & CSRF token
axiosInstance.interceptors.request.use(
  async (config) => {
    // get cookies from the request
    const cookieStore = await cookies(); 
    const jwt = cookieStore.get("jwt_token")?.value;

    if (jwt) {
      config.headers.Authorization = `Bearer ${jwt}`; //TODO: make sure this matches backend schema
    }

    try {
      const csrfTokenRes = await axios.get(`${API.BASE}${API.CSRF_TOKEN}`, {
        withCredentials: true,
      });

      if (csrfTokenRes.data?.csrfToken) {
        config.headers["X-CSRF-Token"] = csrfTokenRes.data.csrfToken; //TODO: make sure this matches backend schema
      }
    } catch (error) {
      console.error("Error fetching CSRF token:", error);
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
