'use client';

import Menu from '@/components/container/menu';
import Topbar from '@/components/container/topbar';
import Footer from '@/components/ui/footer';
import { fetchAuthUser, fetchAuthUserMenus } from '@/services/auth/auth.actions';
import { authSelector } from '@/services/auth/auth.slice';
import { AppDispatch } from '@/store';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function Template({ children }: { children: React.ReactNode }) {
    const { user } = useSelector(authSelector);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (!user) {
            dispatch(fetchAuthUser())
                .unwrap()
                .then(() => {
                    dispatch(fetchAuthUserMenus());
                });
        }
    }, [user, dispatch]);

    return (
        <>
            <Topbar />
            <Menu menus={user?.menus ?? []} />
            <div className="py-10">{children}</div>
            <Footer />
        </>
    );
}
