'use client';

import store from '@/store';
import { NextUIProvider } from '@nextui-org/react';
import { Provider } from 'react-redux';

const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <Provider store={store}>
            <NextUIProvider>{children}</NextUIProvider>
        </Provider>
    );
};

export default Providers;
