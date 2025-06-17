// src/axiosConfig.js
import axios from "axios";

const API = axios.create({
  baseURL: "https://jobportal-e8ss.onrender.com/api"
});

export default API;
