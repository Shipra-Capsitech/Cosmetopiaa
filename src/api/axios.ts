
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5237/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// ============================
// JWT TOKEN INTERCEPTOR
// ============================
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    const isPublicAuth =
      config.url === "/auth/login" ||
      config.url === "/auth/register";

    if (isPublicAuth) {
      delete config.headers.Authorization;
    } else if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default API;
