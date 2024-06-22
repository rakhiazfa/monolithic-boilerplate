import { createAsyncThunk } from '@reduxjs/toolkit';
import { SignInPayload, SignUpPayload } from './auth.types';
import { resetErrors } from './auth.slice';
import api from '@/endpoints/api';

export const signin = createAsyncThunk('auth/signin', async (payload: SignInPayload, { rejectWithValue, dispatch }) => {
    try {
        dispatch(resetErrors());

        const { data } = await api.post(`/auth/login`, payload);

        return data;
    } catch (error: any) {
        return rejectWithValue(error?.response?.data?.errors);
    }
});

export const signup = createAsyncThunk('auth/signup', async (payload: SignUpPayload, { rejectWithValue, dispatch }) => {
    try {
        dispatch(resetErrors());

        const { data } = await api.post(`/auth/register`, payload);

        return data;
    } catch (error: any) {
        return rejectWithValue(error?.response?.data?.errors);
    }
});

export const signout = createAsyncThunk('auth/signout', async (_, { rejectWithValue, dispatch }) => {
    try {
        dispatch(resetErrors());

        const { data } = await api.post(`/auth/logout`);

        return data;
    } catch (error: any) {
        return rejectWithValue(error);
    }
});

export const fetchAuthUser = createAsyncThunk('auth/user', async (_, { rejectWithValue, dispatch }) => {
    try {
        dispatch(resetErrors());

        const { data } = await api.get(`/auth/user`);

        return data;
    } catch (error: any) {
        return rejectWithValue(error);
    }
});

export const fetchAuthUserMenus = createAsyncThunk('auth/user/menus', async (_, { rejectWithValue, dispatch }) => {
    try {
        dispatch(resetErrors());

        const { data } = await api.get(`/auth/user/menus`);

        return data;
    } catch (error: any) {
        return rejectWithValue(error);
    }
});
