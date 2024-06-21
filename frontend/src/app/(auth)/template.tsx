'use client';

import Menu, { IMenu } from '@/components/container/menu';
import Topbar from '@/components/container/topbar';
import Footer from '@/components/ui/footer';
import { fetchAuthUser, fetchAuthUserMenus } from '@/services/auth/auth.actions';
import { AppDispatch } from '@/store';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

export default function Template({ children }: { children: React.ReactNode }) {
    const [loading, setLoading] = useState<boolean>(true);
    const [userMenus, setUserMenus] = useState<IMenu[]>([]);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(fetchAuthUser())
            .unwrap()
            .then(() => {
                dispatch(fetchAuthUserMenus())
                    .unwrap()
                    .then((data) => {
                        setUserMenus(data.menus);
                    })
                    .finally(() => {
                        setLoading(false);
                    });
            })
            .catch(() => {
                setLoading(false);
            });
    }, []);

    return !loading ? (
        <>
            <Topbar />
            <Menu menus={userMenus} />
            <div className="py-10">{children}</div>
            <Footer />
        </>
    ) : (
        <></>
    );
}
