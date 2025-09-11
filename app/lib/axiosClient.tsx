import axios, { AxiosRequestHeaders } from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL as string;

const axiosClient = axios.create({
    baseURL: API_BASE_URL,
});

axiosClient.interceptors.request.use((config) => {
    if (typeof window !== "undefined") {
        const token = localStorage.getItem("accessToken");
        if (token) {
            const headers = config.headers as AxiosRequestHeaders;
            headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
});

export default axiosClient;
