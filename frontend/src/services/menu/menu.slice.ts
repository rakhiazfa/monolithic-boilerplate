import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from '@/store';
import { MenuErrors, MenuState } from '../menu/menu.types';
import { createMenu, fetchMenus } from './menu.actions';

const initialState = (): MenuState => ({
    data: null,
    menu: null,
    errors: null,
    loading: false
});

const menuSlice = createSlice({
    name: 'menus',
    initialState: initialState(),
    reducers: {
        reset(state) {
            state = initialState();
        },
        resetErrors(state, { payload }: PayloadAction<keyof MenuErrors | undefined>) {
            if (payload && state.errors) {
                state.errors[payload] = undefined;
            } else {
                state.errors = null;
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchMenus.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchMenus.rejected, (state) => {
            state.loading = false;
        });
        builder.addCase(fetchMenus.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.data = payload;
        });

        builder.addCase(createMenu.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(createMenu.rejected, (state, { payload }) => {
            state.loading = false;
            state.errors = payload as MenuErrors;
        });
        builder.addCase(createMenu.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.data = payload;
        });
    }
});

export const menuSelector = createSelector(
    (state: AppState) => state,
    (state: AppState) => state.menu
);

export const { resetErrors } = menuSlice.actions;

export default menuSlice.reducer;
