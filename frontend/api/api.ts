import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

// Create Axios instance
const api = axios.create({
  baseURL: "http://10.12.73.104:8000",
});

// Attach interceptor to automatically add token to headers
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(new Error(error?.message ?? String(error)));
  }
);

export default api;
