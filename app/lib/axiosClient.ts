import axios from "axios";
import { API } from "./definitions";

const axiosClient = axios.create({
  baseURL: API.BASE,
  withCredentials: true, // includes JWT and CSRF
});

export default axiosClient;
