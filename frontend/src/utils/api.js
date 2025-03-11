import axios from "axios";

const API_URL = "https://expense-backend-vert.vercel.app";

// Create an axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Add a request interceptor to add the auth token to every request
api.interceptors.request.use(
  (config) => {
    try {
      // Get the token from localStorage
      const userString = localStorage.getItem("user");
      if (userString) {
        const user = JSON.parse(userString);
        // If token exists, add it to the headers
        if (user && user.token) {
          config.headers.Authorization = `Bearer ${user.token}`;
        }
      }
    } catch (error) {
      console.error("Error parsing user from localStorage:", error);
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
