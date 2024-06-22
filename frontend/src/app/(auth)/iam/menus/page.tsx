'use client';

import Page from '@/components/container/page';
import Breadcrumbs from '@/components/ui/breadcrumbs';
import { fetchMenus } from '@/services/menu/menu.actions';
import { menuSelector } from '@/services/menu/menu.slice';
import { AppDispatch } from '@/store';
import { Button } from '@nextui-org/button';
import { Card, CardBody, CardHeader } from '@nextui-org/card';
import { Divider } from '@nextui-org/divider';
import { Skeleton } from '@nextui-org/skeleton';
import { Table } from '@radix-ui/themes';
import Link from 'next/link';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function Menus() {
    const breadcrumbs = [{ name: 'Menus' }];

    const { data, loading } = useSelector(menuSelector);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(fetchMenus());
    }, []);

    return (
        <Page title="Menus">
            <main>
                <section className="app-container">
                    <Breadcrumbs breadcrumbs={breadcrumbs} className="mb-5"></Breadcrumbs>
                    <h1 className="app-page-title mb-7">Menus</h1>
                    <Card>
                        <CardHeader className="p-5">
                            <div className="w-full flex justify-between items-start gap-5">
                                <div></div>
                                <Button as={Link} href="/iam/menus/create" color="primary">
                                    Create Menu
                                </Button>
                            </div>
                        </CardHeader>
                        <Divider />
                        <CardBody className="p-5">
                            <Table.Root>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
                                        <Table.ColumnHeaderCell>Href</Table.ColumnHeaderCell>
                                        <Table.ColumnHeaderCell>Order</Table.ColumnHeaderCell>
                                        <Table.ColumnHeaderCell>Parent</Table.ColumnHeaderCell>
                                        <Table.ColumnHeaderCell>#</Table.ColumnHeaderCell>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    {!loading
                                        ? data?.menus?.map(({ id, name, href, order, parent }, index) => (
                                              <Table.Row key={index}>
                                                  <Table.RowHeaderCell>{name}</Table.RowHeaderCell>
                                                  <Table.Cell>{href ?? '-'}</Table.Cell>
                                                  <Table.Cell>{order ?? 1}</Table.Cell>
                                                  <Table.Cell>
                                                      {parent ? (
                                                          <Link
                                                              href={`/iam/menus/${parent.id}`}
                                                              className="text-blue-500 hover:underline"
                                                          >
                                                              {parent.name}
                                                          </Link>
                                                      ) : (
                                                          '-'
                                                      )}
                                                  </Table.Cell>
                                                  <Table.Cell className="flex items-center gap-5">
                                                      <Link href={`/iam/menus/${id}`} className="text-blue-500 hover:underline">
                                                          Details
                                                      </Link>
                                                      <Link
                                                          href={`/iam/menus/${id}/edit`}
                                                          className="text-blue-500 hover:underline"
                                                      >
                                                          Edit
                                                      </Link>
                                                  </Table.Cell>
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
            <Table.Cell>
                <Skeleton className="w-10 h-5 rounded-lg" />
            </Table.Cell>
            <Table.Cell>
                <Skeleton className="w-10 h-5 rounded-lg" />
            </Table.Cell>
        </Table.Row>
    );
};
