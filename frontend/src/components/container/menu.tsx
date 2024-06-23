'use client';

import { Menu as IMenu } from '@/services/menu/menu.types';
import { DropdownMenu } from '@radix-ui/themes';
import Link from 'next/link';
import { useState } from 'react';

type MenuProps = {
    menus: IMenu[];
};

const Menu = ({ menus }: MenuProps) => {
    return (
        <nav className="relative w-full h-[50px] flex items-center bg-blue-500 text-white shadow-md">
            <div className="app-container flex items-center gap-5">
                {menus.map(({ name, href, children }, index) => (
                    <MenuItem key={index} name={name} href={href} children={children} />
                ))}
            </div>
        </nav>
    );
};

type MenuItemProps = {
    name: string;
    href?: string;
    children?: IMenu[];
    isSubMenu?: boolean;
};

const MenuItem = ({ name, href, children, isSubMenu }: MenuItemProps) => {
    const [open, setOpen] = useState<boolean>(false);

    const handleOpenChange = (open: boolean) => {
        setOpen(open);
    };

    return !isSubMenu ? (
        <div>
            {Array.isArray(children) && children.length > 0 ? (
                <DropdownMenu.Root open={open} onOpenChange={handleOpenChange}>
                    <DropdownMenu.Trigger>
                        <button className="flex items-center gap-3 text-sm font-medium tracking-wider">
                            {name}
                            <DropdownMenu.TriggerIcon />
                        </button>
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Content className="min-w-[175px]">
                        {children.map(({ name, href, children }, index) => (
                            <div key={index}>
                                {Array.isArray(children) && children.length > 0 ? (
                                    <MenuItem name={name} href={href} children={children} isSubMenu={true} />
                                ) : (
                                    <DropdownMenu.Item>
                                        <Link
                                            href={href ?? '/'}
                                            onClick={() => handleOpenChange(false)}
                                            className="w-full h-full flex items-center text-inherit hover:no-underline"
                                        >
                                            {name}
                                        </Link>
                                    </DropdownMenu.Item>
                                )}
                            </div>
                        ))}
                    </DropdownMenu.Content>
                </DropdownMenu.Root>
            ) : (
                <Link
                    href={href ?? '/'}
                    onClick={() => handleOpenChange(false)}
                    className="w-full h-full flex items-center text-white font-medium tracking-wider hover:no-underline"
                >
                    {name}
                </Link>
            )}
        </div>
    ) : (
        <DropdownMenu.Sub>
            <DropdownMenu.SubTrigger>{name}</DropdownMenu.SubTrigger>
            <DropdownMenu.SubContent className="min-w-[175px]">
                {children?.map(({ name, href, children }, index) => (
                    <div key={index}>
                        {Array.isArray(children) && children.length > 0 ? (
                            <MenuItem name={name} href={href} children={children} isSubMenu={true} />
                        ) : (
                            <DropdownMenu.Item>
                                <Link
                                    href={href ?? '/'}
                                    onClick={() => handleOpenChange(false)}
                                    className="w-full h-full flex items-center text-inherit hover:no-underline"
                                >
                                    {name}
                                </Link>
                            </DropdownMenu.Item>
                        )}
                    </div>
                ))}
            </DropdownMenu.SubContent>
        </DropdownMenu.Sub>
    );
};

export default Menu;
