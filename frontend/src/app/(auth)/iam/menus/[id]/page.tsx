'use client';

import Page from '@/components/container/page';
import BackButton from '@/components/ui/back-button';
import Breadcrumbs from '@/components/ui/breadcrumbs';
import { fetchMenuById } from '@/services/menu/menu.actions';
import { menuSelector, resetData } from '@/services/menu/menu.slice';
import { AppDispatch } from '@/store';
import { Card, CardBody, CardHeader } from '@nextui-org/card';
import { Divider } from '@nextui-org/divider';
import { Skeleton } from '@nextui-org/skeleton';
import { DataList, Table } from '@radix-ui/themes';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

type MenuDetailsProps = {
    params: {
        id: number;
    };
};

export default function MenuDetails({ params }: MenuDetailsProps) {
    const breadcrumbs = [{ name: 'Menus', href: '/iam/menus' }, { name: 'Menu Details' }];

    const { menu, loading } = useSelector(menuSelector);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(fetchMenuById(params.id));

        return () => {
            dispatch(resetData());
        };
    }, [dispatch]);

    return (
        <Page title="Menu Details">
            <main>
                <section className="app-container">
                    <Breadcrumbs breadcrumbs={breadcrumbs} className="mb-5" />
                    <div className="flex justify-between items-center mb-7">
                        <h1 className="app-page-title">Menu Details</h1>
                        <BackButton href="/iam/menus" />
                    </div>
                    <Card className="mb-5">
                        <CardBody className="p-5">
                            {!loading ? (
                                <DataList.Root>
                                    <DataList.Item>
                                        <DataList.Label minWidth="88px">ID</DataList.Label>
                                        <DataList.Value>{menu?.id}</DataList.Value>
                                    </DataList.Item>
                                    <DataList.Item>
                                        <DataList.Label minWidth="88px">Name</DataList.Label>
                                        <DataList.Value>{menu?.name}</DataList.Value>
                                    </DataList.Item>
                                    <DataList.Item>
                                        <DataList.Label minWidth="88px">Href</DataList.Label>
                                        <DataList.Value>{menu?.href ?? '-'}</DataList.Value>
                                    </DataList.Item>
                                    <DataList.Item>
                                        <DataList.Label minWidth="88px">Order</DataList.Label>
                                        <DataList.Value>{menu?.order ?? '-'}</DataList.Value>
                                    </DataList.Item>
                                </DataList.Root>
                            ) : (
                                <MenuDetailsSkeleton />
                            )}
                        </CardBody>
                    </Card>
                    <Card>
                        <CardHeader className="p-5">
                            <h1 className="font-medium tracking-wider">Children</h1>
                        </CardHeader>
                        <Divider />
                        <CardBody className="p-5">
                            <Table.Root>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
                                        <Table.ColumnHeaderCell>Href</Table.ColumnHeaderCell>
                                        <Table.ColumnHeaderCell>Order</Table.ColumnHeaderCell>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    {!loading
                                        ? menu?.children?.map(({ name, href, order }, index) => (
                                              <Table.Row key={index}>
                                                  <Table.RowHeaderCell>{name}</Table.RowHeaderCell>
                                                  <Table.Cell>{href ?? '-'}</Table.Cell>
                                                  <Table.Cell>{order ?? 1}</Table.Cell>
                                              </Table.Row>
                                          ))
                                        : [...Array(5)].map((_, index) => <MenuRowSkeleton key={index} />)}
                                </Table.Body>
                            </Table.Root>
                        </CardBody>
                    </Card>
                </section>
            </main>
        </Page>
    );
}

const MenuDetailsSkeleton = () => {
    return (
        <DataList.Root>
            <DataList.Item>
                <DataList.Label minWidth="88px">ID</DataList.Label>
                <DataList.Value>
                    <Skeleton className="w-7 h-5 rounded-lg" />
                </DataList.Value>
            </DataList.Item>
            <DataList.Item>
                <DataList.Label minWidth="88px">Name</DataList.Label>
                <DataList.Value>
                    <Skeleton className="w-32 h-5 rounded-lg" />
                </DataList.Value>
            </DataList.Item>
            <DataList.Item>
                <DataList.Label minWidth="88px">Href</DataList.Label>
                <DataList.Value>
                    <Skeleton className="w-52 h-5 rounded-lg" />
                </DataList.Value>
            </DataList.Item>
            <DataList.Item>
                <DataList.Label minWidth="88px">Order</DataList.Label>
                <DataList.Value>
                    <Skeleton className="w-7 h-5 rounded-lg" />
                </DataList.Value>
            </DataList.Item>
        </DataList.Root>
    );
};

const MenuRowSkeleton = () => {
    return (
        <Table.Row>
            <Table.Cell>
                <Skeleton className="w-16 h-5 rounded-lg" />
            </Table.Cell>
            <Table.Cell>
                <Skeleton className="w-20 h-5 rounded-lg" />
            </Table.Cell>
            <Table.Cell>
                <Skeleton className="w-10 h-5 rounded-lg" />
            </Table.Cell>
        </Table.Row>
    );
};
