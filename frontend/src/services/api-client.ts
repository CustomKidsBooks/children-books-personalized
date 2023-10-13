import axios from "axios";

export const privateAxiosInstance = axios.create({
  baseURL: "http://localhost:5001",
  headers: {
    authToken:
      typeof window !== "undefined" && localStorage.getItem("accessToken"),
  },
});

export const axiosInstance = axios.create({
  baseURL: "http://localhost:5001",
});
