import axios from "axios";

const API_URL = "http://localhost:3000";

// Create an axios instance
const api = axios.create({
  baseURL: API_URL,
});

// Add a request interceptor to add the auth token to every request
api.interceptors.request.use(
  (config) => {
    // Get the token from localStorage
    const user = JSON.parse(localStorage.getItem("user"));

    // If token exists, add it to the headers
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
