import axios from "axios";
import { getCookies } from "next-client-cookies/server";

const BASEURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const axiosInstance = axios.create({
  baseURL: BASEURL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    let token = "";
    if (typeof window === "undefined") {
      token = getCookies().get("token")!;
    } else {
      token = document.cookie.match(/(?<=token=).+(?=;)/)?.[0]!;
    }
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);
