import axios from "axios";
import env from "../config/env";
import { SECURE_STORAGE } from '../../shared/utils/storage';
import { encodeBase64 } from '../../shared/utils/base64';

const axiosInstance = axios.create({
  baseURL: env.hostApi,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "token": encodeBase64(env.secretDocumentNumber),
    'ngrok-skip-browser-warning': 'any',
    "Access-Control-Allow-Origin": "*",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = SECURE_STORAGE.get();
  if (token) {
    config.headers.set('Authorization', token);
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (res) => res,
  (err) => Promise.reject(err?.response?.data || err)
);

export default axiosInstance;
