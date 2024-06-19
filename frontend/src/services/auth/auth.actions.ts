import { createAsyncThunk } from '@reduxjs/toolkit';
import { SignInPayload, SignUpPayload } from './auth.types';
import AuthService from './auth.service';
import { resetErrors } from './auth.slice';

export const signin = createAsyncThunk('auth/signin', async (payload: SignInPayload, { rejectWithValue, dispatch }) => {
    try {
        dispatch(resetErrors());

        const data = await AuthService.signin(payload);

        return data;
    } catch (error: any) {
        return rejectWithValue(error?.response?.data?.errors);
    }
});

export const signup = createAsyncThunk('auth/signup', async (payload: SignUpPayload, { rejectWithValue, dispatch }) => {
    try {
        dispatch(resetErrors());

        const data = await AuthService.signup(payload);

        return data;
    } catch (error: any) {
        return rejectWithValue(error?.response?.data?.errors);
    }
});

export const signout = createAsyncThunk('auth/signout', async (payload: unknown, { rejectWithValue, dispatch }) => {
    try {
        dispatch(resetErrors());

        const data = await AuthService.signout();

        return data;
    } catch (error: any) {
        return rejectWithValue(error?.response?.data?.errors);
    }
});
