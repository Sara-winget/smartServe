// src/api/axios.js
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

export const setupInterceptors = (auth) => {
  api.interceptors.request.use((config) => {
    if (auth.accessToken) {
      config.headers.Authorization = `Bearer ${auth.accessToken}`;
    }
    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (
        error.response &&
        error.response.status === 401 &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true;

        try {
          const res = await axios.get("http://localhost:5000/api/auth/refresh", {
            withCredentials: true,
          });

          const newToken = res.data.accessToken;
          auth.login(newToken);

          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return api(originalRequest);
        } catch (err) {
          auth.logout();
         
          return Promise.reject(err);
        }
      }

      return Promise.reject(error);
    }
  );
};

export default api;
