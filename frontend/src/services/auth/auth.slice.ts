import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { AuthErrors, AuthState } from './auth.types';
import { fetchAuthUser, signin, signout, signup } from './auth.actions';
import { AppState } from '@/store';
import { IMenu } from '@/components/container/menu';

const initialState = (): AuthState => ({
    user: null,
    errors: null,
    loading: false
});

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState(),
    reducers: {
        setUserMenus(state, { payload }: PayloadAction<IMenu[]>) {
            state.user!.menus = payload;
        },
        resetErrors(state, { payload }: PayloadAction<keyof AuthErrors | undefined>) {
            if (payload && state.errors) {
                state.errors[payload] = undefined;
            } else {
                state.errors = null;
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(signin.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(signin.rejected, (state, { payload }) => {
            state.loading = false;
            state.errors = payload as AuthErrors;
        });
        builder.addCase(signin.fulfilled, (state, { payload }) => {
            state.loading = false;

            Cookies.set('access_token', payload.access_token);
        });

        builder.addCase(signup.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(signup.rejected, (state, { payload }) => {
            state.loading = false;
            state.errors = payload as AuthErrors;
        });
        builder.addCase(signup.fulfilled, (state, { payload }) => {
            state.loading = false;
        });

        builder.addCase(signout.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(signout.rejected, (state, { payload }) => {
            state.loading = false;
        });
        builder.addCase(signout.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.user = null;

            Cookies.remove('access_token');
        });

        builder.addCase(fetchAuthUser.fulfilled, (state, { payload }) => {
            state.user = payload.user;
        });
    }
});

export const authSelector = createSelector(
    (state: AppState) => state,
    (state: AppState) => state.auth
);

export const { setUserMenus, resetErrors } = authSlice.actions;

export default authSlice.reducer;
