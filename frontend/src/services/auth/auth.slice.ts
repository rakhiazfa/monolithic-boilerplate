import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthErrors, AuthState } from './auth.types';
import { signin, signup } from './auth.actions';
import { AppState } from '@/store';

const initialState = (): AuthState => ({
    user: null,
    errors: null,
    loading: false
});

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState(),
    reducers: {
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
    }
});

export const authSelector = createSelector(
    (state: AppState) => state,
    (state: AppState) => state.auth
);

export const { resetErrors } = authSlice.actions;

export default authSlice.reducer;
