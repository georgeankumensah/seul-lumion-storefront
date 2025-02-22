import { useAuthStore } from "@/store";
import axios from "axios";

// Load the backend URL from the environment variable
const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";

const api = axios.create({
  baseURL: `${BASE_URL}/api`,
  withCredentials: true, // Send cookies with requests (important if using HTTP-only cookies)
});

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    // Get the token from cookies (accessible only if NOT httpOnly)
    const token = useAuthStore.getState().token;

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error("API call failed:", error.message);
    return Promise.reject(error);
  }
);

export default api;
