'use client';

import Page from '@/components/container/page';
import BackButton from '@/components/ui/back-button';
import Breadcrumbs from '@/components/ui/breadcrumbs';
import { Card, CardBody } from '@nextui-org/card';
import Form from './form';
import { useDispatch, useSelector } from 'react-redux';
import { menuSelector, resetData } from '@/services/menu/menu.slice';
import { useEffect } from 'react';
import { AppDispatch } from '@/store';
import { fetchMenuById, searchMenus } from '@/services/menu/menu.actions';
import { Skeleton } from '@nextui-org/skeleton';

type EditMenuProps = {
    params: { id: number };
};

export default function EditMenu({ params }: EditMenuProps) {
    const breadcrumbs = [{ name: 'Menus', href: '/iam/menus' }, { name: 'Edit Menu' }];

    const { menu } = useSelector(menuSelector);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(fetchMenuById(params.id));
        dispatch(searchMenus(null));

        return () => {
            dispatch(resetData());
        };
    }, [dispatch]);

    return (
        <Page title="Edit Menu">
            <main>
                <section className="app-container">
                    <Breadcrumbs breadcrumbs={breadcrumbs} className="mb-5" />
                    <div className="flex justify-between items-center mb-7">
                        <h1 className="app-page-title">Edit Menu</h1>
                        <BackButton href="/iam/menus" />
                    </div>
                    <Card>
                        <CardBody className="p-5">{menu ? <Form menu={menu} /> : <FormSkeleton />}</CardBody>
                    </Card>
                </section>
            </main>
        </Page>
    );
}

const FormSkeleton = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
            <Skeleton className="w-full h-[55px] rounded-lg" />
            <Skeleton className="w-full h-[55px] rounded-lg" />
            <Skeleton className="w-full h-[55px] rounded-lg" />
            <Skeleton className="w-full h-[55px] rounded-lg" />
            <div className="col-span-2 flex justify-end">
                <Skeleton className="w-[75px] h-[40px] rounded-lg" />
            </div>
        </div>
    );
};
