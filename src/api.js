import axios from "axios";

const API = axios.create({
  baseURL: "https://backend-wh-nudx.onrender.com"
});

export default API;