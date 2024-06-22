import { Menu } from '../menu/menu.types';

export type SignInPayload = {
    email: string;
    password: string;
};

export type SignUpPayload = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
};

export type User = {
    id: number;
    name: string;
    email: string;
    email_verified_at: Date;
    menus?: Menu[];
};

export interface AuthErrors extends Partial<SignInPayload & SignUpPayload> {}

export type AuthState = {
    user: User | null;
    errors: AuthErrors | null;
    loading: boolean;
};
