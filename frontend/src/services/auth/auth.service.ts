import api from '@/endpoints/api';
import { SignInPayload, SignUpPayload } from './auth.types';

export default class AuthService {
    static async signin(payload: SignInPayload) {
        const { data } = await api.post(`/auth/login`, payload);

        return data;
    }

    static async signup(payload: SignUpPayload) {
        const { data } = await api.post(`/auth/register`, payload);

        return data;
    }

    static async signout() {
        const { data } = await api.post(`/auth/logout`);

        return data;
    }

    static async fetchAuthUser() {
        const { data } = await api.get(`/auth/user`);

        return data;
    }

    static async fetchAuthUserMenus() {
        const { data } = await api.get(`/auth/user/menus`);

        return data;
    }
}
