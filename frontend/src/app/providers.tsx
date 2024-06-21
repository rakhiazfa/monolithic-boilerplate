'use client';

import '@radix-ui/themes/styles.css';
import store from '@/store';
import { NextUIProvider } from '@nextui-org/react';
import { Provider } from 'react-redux';
import { Theme } from '@radix-ui/themes';

const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <Provider store={store}>
            <NextUIProvider>
                <Theme>{children}</Theme>
            </NextUIProvider>
        </Provider>
    );
};

export default Providers;
