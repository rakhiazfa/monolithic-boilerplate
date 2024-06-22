import api from '@/endpoints/api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { CreateMenuPayload } from './menu.types';

export const fetchMenus = createAsyncThunk('menus', async (_, { rejectWithValue }) => {
    try {
        const { data } = await api.get(`/menus`);

        return data;
    } catch (error: any) {
        return rejectWithValue(error);
    }
});

export const searchMenus = createAsyncThunk('menus/search', async (payload: any, { rejectWithValue }) => {
    try {
        const searchParams = new URLSearchParams(payload).toString();
        const { data } = await api.get(`/menus/search?${searchParams}`);

        return data;
    } catch (error: any) {
        return rejectWithValue(error);
    }
});

export const createMenu = createAsyncThunk('menus/create', async (payload: CreateMenuPayload, { rejectWithValue }) => {
    try {
        const { data } = await api.post(`/menus`, payload);

        return data;
    } catch (error: any) {
        return rejectWithValue(error?.response?.data?.errors);
    }
});
