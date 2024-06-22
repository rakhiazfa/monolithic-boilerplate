'use client';

import { Breadcrumbs as NextUIBreadcrumbs, BreadcrumbItem } from '@nextui-org/breadcrumbs';
import Link from 'next/link';

type BreadcrumbsPros = {
    breadcrumbs: {
        name: string;
        href?: string;
    }[];
    className?: string;
};

const Breadcrumbs = ({ breadcrumbs, className }: BreadcrumbsPros) => {
    return (
        <NextUIBreadcrumbs className={className}>
            {breadcrumbs.map(({ name, href }, index) => (
                <BreadcrumbItem key={index}>{href ? <Link href={href}>{name}</Link> : name}</BreadcrumbItem>
            ))}
        </NextUIBreadcrumbs>
    );
};

export default Breadcrumbs;
