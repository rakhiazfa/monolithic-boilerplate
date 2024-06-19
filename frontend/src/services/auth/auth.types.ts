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
};

export type AuthErrors = {
    name?: string | string[];
    email?: string | string[];
    password?: string | string[];
};

export type AuthState = {
    user: User | null;
    errors: AuthErrors | null;
    loading: boolean;
};
