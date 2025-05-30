// axiosClient.js
import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Global error handler
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// GET helper
export const get = async (url: string, config = {}) => {
  const res = await axiosClient.get(url, config);
  return res.data;
};

// POST helper
export const post = async (
  url: string,
  data: unknown,
  config = { withCredentials: true }
) => {
  const res = await axiosClient.post(url, data, config);
  return res.data;
};

export default axiosClient;
