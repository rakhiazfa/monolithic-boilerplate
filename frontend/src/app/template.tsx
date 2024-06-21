import NextTopLoader from 'nextjs-toploader';
import Providers from './providers';

export default function Template({ children }: { children: React.ReactNode }) {
    return (
        <Providers>
            <NextTopLoader showSpinner={false} height={2} zIndex={15000} speed={350} color="#3b82f7" />
            {children}
        </Providers>
    );
}
