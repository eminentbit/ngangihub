// axiosClient.js
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
// import toast from "react-hot-toast";

declare module "axios" {
  export interface InternalAxiosRequestConfig {
    successMessage?: string;
    silent?: boolean;
  }
}

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Global error handler
axiosClient.interceptors.response.use(
  (response) => {
    const successMessage = response.config?.successMessage as
      | string
      | undefined;
    if (successMessage) {
      // toast.success(successMessage);
    }
    return response;
  },
  (error) => {
    const errorMessage =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      "Something went wrong";

    console.error("API Error:", error.response?.data || errorMessage);

    // 🔥 Show toast only if the request is not silent
    if (!error.config?.silent) {
      // toast.error(errorMessage);
    }

    return Promise.reject(error);
  }
);

let csrfToken: string | null = null;

// Fetch and set CSRF token before making requests
async function ensureCsrfToken() {
  if (!csrfToken) {
    const { data } = await axiosClient.get("/csrf-token", {
      silent: true,
    } as AxiosRequestConfig);
    csrfToken = data.csrfToken;
  }
  return csrfToken;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const securePost = async <T = any>(
  url: string,
  payload: unknown,
  config?: { headers?: Record<string, string>; silent?: boolean }
): Promise<AxiosResponse<T>> => {
  const token = await ensureCsrfToken();
  return axiosClient.post<T>(url, payload, {
    ...config,
    withCredentials: true,
    headers: {
      "X-CSRF-Token": token,
      ...config?.headers,
    },
  });
};
export const secureGet = async (
  url: string,
  config?: {
    headers?: Record<string, string>;
    params?: Record<string, unknown>;
    silent?: true;
  }
) => {
  const token = await ensureCsrfToken();
  return axiosClient.get(url, {
    ...config,
    withCredentials: true,
    headers: {
      ...(config?.headers || {}),
      "X-CSRF-Token": token,
    },
  });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const secureDelete = async <T = any>(
  url: string,
  config?: AxiosRequestConfig
) => {
  const token = await ensureCsrfToken();
  return axiosClient.delete<T>(url, {
    ...config,
    withCredentials: true,
    headers: {
      ...(config?.headers || {}),
      "X-CSRF-Token": token,
    },
  });
};

export const securePut = async (
  url: string,
  payload: unknown,
  config?: { headers?: Record<string, string>; silent?: true }
) => {
  const token = await ensureCsrfToken();
  return axiosClient.put(url, payload, {
    ...config,
    withCredentials: true,
    headers: {
      ...(config?.headers || {}),
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
