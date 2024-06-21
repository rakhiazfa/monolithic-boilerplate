import Footer from '@/components/ui/footer';

export default function Template({ children }: { children: React.ReactNode }) {
    return (
        <>
            {children}
            <Footer />
        </>
    );
}
