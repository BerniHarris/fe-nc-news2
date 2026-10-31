import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
  timeout: 8000,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const backendMessage = error.response?.data?.message;

    let message = backendMessage || "Unexpected error.";

    if (status === 400) message = backendMessage || "Invalid request.";
    if (status === 404) message = backendMessage || "Not found.";
    if (status === 500) message = "Internal server error.";

    return Promise.reject({ status, message });
  },
);

export async function get(path, config) {
  const res = await api.get(path, config);
  return res.data;
}

export async function post(path, config) {
  const res = await api.post(path, config);
  return res.data;
}

export default api;
