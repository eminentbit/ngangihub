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

let csrfToken: string | null = null;

// Fetch and set CSRF token before making requests
async function ensureCsrfToken() {
  if (!csrfToken) {
    const { data } = await axiosClient.get("/csrf-token");
    csrfToken = data.csrfToken;
  }
  return csrfToken;
}

export const securePost = async (
  url: string,
  payload: unknown,
  config?: { headers?: Record<string, string> }
) => {
  const token = await ensureCsrfToken();
  return axiosClient.post(url, payload, {
    withCredentials: true,
    headers: {
      "X-CSRF-Token": token,
      ...config?.headers,
    },
  });
};

export const secureGet = async (
  url: string,
  config: {
    headers?: Record<string, string>;
    params?: Record<string, unknown>;
  } = {}
) => {
  const token = await ensureCsrfToken();
  return axiosClient.get(url, {
    ...config,
    withCredentials: true,
    headers: {
      ...(config.headers || {}),
      "X-CSRF-Token": token,
    },
  });
};

export const secureDelete = async (
  url: string,
  config: { headers?: Record<string, string> } = {}
) => {
  const token = await ensureCsrfToken();
  return axiosClient.delete(url, {
    ...config,
    withCredentials: true,
    headers: {
      ...(config.headers || {}),
      "X-CSRF-Token": token,
    },
  });
};

export const securePut = async (
  url: string,
  payload: unknown,
  config: { headers?: Record<string, string> } = {}
) => {
  const token = await ensureCsrfToken();
  return axiosClient.put(url, payload, {
    ...config,
    withCredentials: true,
    headers: {
      ...(config.headers || {}),
      "X-CSRF-Token": token,
    },
  });
};

// DELETE helper
export const deleteRequest = async (url: string, config = {}) => {
  const res = await axiosClient.delete(url, config);
  return res.data;
};

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
