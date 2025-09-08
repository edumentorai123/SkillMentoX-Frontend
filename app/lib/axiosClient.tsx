import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL as string;

const axiosClient = axios.create({
    baseURL: API_BASE_URL,
});

axiosClient.interceptors.request.use((config) => {
    if (typeof window !== "undefined") {
        const token = localStorage.getItem("accessToken");
        if (token) {
            config.headers = config.headers ?? {};
            (config.headers as any).Authorization = `Bearer ${token}`;
        }
    }
    return config;
});

export default axiosClient;
