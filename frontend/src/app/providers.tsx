'use client';

import '@radix-ui/themes/styles.css';
import store from '@/store';
import { Provider } from 'react-redux';
import { Theme } from '@radix-ui/themes';
import { NextUIProvider } from '@nextui-org/system';

const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <Provider store={store}>
            <Theme className="!bg-light">
                <NextUIProvider>{children}</NextUIProvider>
            </Theme>
        </Provider>
    );
};

export default Providers;
