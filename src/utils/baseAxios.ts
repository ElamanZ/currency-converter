import axios from "axios";

export const baseAxios = axios.create({
  baseURL: "https://api.vatcomply.com",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

baseAxios.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

baseAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      const message = error.response.data?.message || error.message;
      return Promise.reject(new Error(message));
    } else if (error.request) {
      return Promise.reject(new Error("Network error. Please check your connection."));
    } else {
      return Promise.reject(error);
    }
  }
);
