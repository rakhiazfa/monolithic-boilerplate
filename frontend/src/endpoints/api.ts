import axios, { AxiosInstance } from 'axios';

const api: AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_ENDPOINT,
    headers: {
        Accept: 'application/json'
    },
    withCredentials: true
});

export default api;
