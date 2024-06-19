import authReducer from '@/services/auth/auth.slice';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
    reducer: {
        auth: authReducer
    }
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
