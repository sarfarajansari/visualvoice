import axios from "axios";

export const apiClient = axios.create({
  // baseURL: "https://edutube-fastapi.onrender.com",
  // baseURL:'https://edutubeapi.azurewebsites.net',
  baseURL: "http://20.197.7.60:8000",
  // baseURL: "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
  },
});
