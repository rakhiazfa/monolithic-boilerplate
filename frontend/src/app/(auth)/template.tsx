'use client';

import Menu, { IMenu } from '@/components/container/menu';
import Topbar from '@/components/container/topbar';
import { fetchAuthUser } from '@/services/auth/auth.actions';
import { AppDispatch } from '@/store';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const menu: IMenu[] = [
    {
        name: 'IAM',
        children: [
            {
                name: 'Users',
                href: '/iam/users'
            },
            {
                name: 'Roles',
                href: '/iam/roles'
            }
        ]
    }
];

export default function Template({ children }: { children: React.ReactNode }) {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(fetchAuthUser());
    }, []);

    return (
        <>
            <Topbar />
            <Menu menu={menu} />
            <div className="py-10">{children}</div>
        </>
    );
}
