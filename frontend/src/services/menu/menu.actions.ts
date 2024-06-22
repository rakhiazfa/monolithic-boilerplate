import api from '@/endpoints/api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { CreateMenuPayload, UpdateMenuPayload } from './menu.types';

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
        const searchParams = payload ? new URLSearchParams(payload).toString() : null;
        const { data } = await api.get(searchParams ? `/menus/search?${searchParams}` : `/menus/search`);

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

export const fetchMenuById = createAsyncThunk('menus/details', async (id: number, { rejectWithValue }) => {
    try {
        const { data } = await api.get(`/menus/${id}`);

        return data;
    } catch (error: any) {
        return rejectWithValue(error);
    }
});

export const updateMenu = createAsyncThunk(
    'menus/update',
    async (
        {
            payload,
            id
        }: {
            payload: UpdateMenuPayload;
            id: number;
        },
        { rejectWithValue }
    ) => {
        try {
            const { data } = await api.put(`/menus/${id}`, payload);

            return data;
        } catch (error: any) {
            return rejectWithValue(error?.response?.data?.errors);
        }
    }
);
