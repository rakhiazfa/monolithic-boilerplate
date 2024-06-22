import authReducer from '@/services/auth/auth.slice';
import menuReducer from '@/services/menu/menu.slice';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
    reducer: {
        auth: authReducer,
        menu: menuReducer
    }
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
