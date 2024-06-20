import axios, { AxiosInstance } from 'axios';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

axios.defaults.baseURL = process.env.NEXT_PUBLIC_BACKEND_ENDPOINT;
axios.defaults.withCredentials = true;

const api: AxiosInstance = axios.create({
    headers: {
        Accept: 'application/json'
    }
});

api.interceptors.request.use(
    async (config) => {
        let accessToken = Cookies.get('access_token') ?? null;
        const decoded = accessToken ? jwtDecode(accessToken) : null;

        if (decoded?.exp && decoded.exp * 1000 <= new Date().getTime()) {
            try {
                const { data } = await axios.post('/auth/token');

                accessToken = data.access_token;
                Cookies.set('access_token', accessToken as string);
            } catch (error) {
                Cookies.remove('access_token');

                throw error;
            }
        }

        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
