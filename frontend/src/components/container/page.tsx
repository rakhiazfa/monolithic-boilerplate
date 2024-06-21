'use client';

import { useEffect } from 'react';

type PageProps = {
    title: string;
    children?: React.ReactNode;
};

const Page = ({ title, children }: PageProps) => {
    useEffect(() => {
        document.title = `${title} - ${process.env.NEXT_PUBLIC_APP_NAME}`;
    }, []);

    return children;
};

export default Page;
