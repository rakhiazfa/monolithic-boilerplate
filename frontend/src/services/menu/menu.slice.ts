import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from '@/store';
import { Menu, MenuErrors, MenuState } from '../menu/menu.types';
import { createMenu, fetchMenuById, fetchMenus, searchMenus, updateMenu } from './menu.actions';

const initialState = (): MenuState => ({
    data: null,
    menu: null,
    menuOptions: null,
    errors: null,
    loading: false
});

const menuSlice = createSlice({
    name: 'menus',
    initialState: initialState(),
    reducers: {
        resetData(state) {
            Object.assign(state, initialState());
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
        // Fetch Menus
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

        // Search Menus
        builder.addCase(searchMenus.fulfilled, (state, { payload }) => {
            state.menuOptions = payload.menus;
        });

        // Create Menu
        builder.addCase(createMenu.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(createMenu.rejected, (state, { payload }) => {
            state.loading = false;
            state.errors = payload as MenuErrors;
        });
        builder.addCase(createMenu.fulfilled, (state, { payload }) => {
            state.loading = false;
        });

        // Fetch Menu By Id
        builder.addCase(fetchMenuById.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchMenuById.rejected, (state) => {
            state.loading = false;
        });
        builder.addCase(fetchMenuById.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.menu = payload.menu;
        });

        // Update Menu
        builder.addCase(updateMenu.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(updateMenu.rejected, (state, { payload }) => {
            state.loading = false;
            state.errors = payload as MenuErrors;
        });
        builder.addCase(updateMenu.fulfilled, (state, { payload }) => {
            state.loading = false;
        });
    }
});

export const menuSelector = createSelector(
    (state: AppState) => state,
    (state: AppState) => state.menu
);

export const { resetData, resetErrors } = menuSlice.actions;

export default menuSlice.reducer;
