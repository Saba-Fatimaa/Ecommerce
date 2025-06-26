import axios from "axios";

// Set base URL from env
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

// Create Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // if using cookies or sessions
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔁 Helper functions
export const get = async (url, config = {}) => {
  try {
    const response = await api.get(url, config);
    return response.data;
  } catch (error) {
    throw error?.response?.data || error;
  }
};

export const post = async (url, data, config = {}) => {
  try {
    const response = await api.post(url, data, config);
    return response.data;
  } catch (error) {
    throw error?.response?.data || error;
  }
};

export const put = async (url, data, config = {}) => {
  try {
    const response = await api.put(url, data, config);
    return response.data;
  } catch (error) {
    throw error?.response?.data || error;
  }
};

export const del = async (url, config = {}) => {
  try {
    const response = await api.delete(url, config);
    return response.data;
  } catch (error) {
    throw error?.response?.data || error;
  }
};

// Export axios instance if needed for interceptors
export default api;
