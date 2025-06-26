import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Create an axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // optional, include if your API requires cookies/sessions
  headers: {
    "Content-Type": "application/json",
  },
});

// GET request
export const get = async (url, config = {}) => {
  try {
    const response = await api.get(url, config);
    return response.data;
  } catch (error) {
    throw error?.response?.data || error;
  }
};

// POST request
export const post = async (url, data, config = {}) => {
  try {
    const response = await api.post(url, data, config);
    return response.data;
  } catch (error) {
    throw error?.response?.data || error;
  }
};

// PUT request
export const put = async (url, data, config = {}) => {
  try {
    const response = await api.put(url, data, config);
    return response.data;
  } catch (error) {
    throw error?.response?.data || error;
  }
};

// DELETE request
export const del = async (url, config = {}) => {
  try {
    const response = await api.delete(url, config);
    return response.data;
  } catch (error) {
    throw error?.response?.data || error;
  }
};
