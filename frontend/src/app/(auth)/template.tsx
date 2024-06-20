'use client';

import Topbar from '@/components/container/topbar';
import { fetchAuthUser } from '@/services/auth/auth.actions';
import { AppDispatch } from '@/store';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

export default function Template({ children }: { children: React.ReactNode }) {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(fetchAuthUser());
    }, []);

    return (
        <>
            <Topbar />
            <div className="py-10">{children}</div>
        </>
    );
}
