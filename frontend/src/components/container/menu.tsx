'use client';

import { DropdownMenu } from '@radix-ui/themes';
import Link from 'next/link';
import { useState } from 'react';

export interface IMenu {
    name: string;
    href?: string;
    children?: IMenu[];
}

type MenuProps = {
    menus: IMenu[];
    menuTitle?: string;
    isSubMenu?: boolean;
};

const Menu = ({ menus, menuTitle, isSubMenu = false }: MenuProps) => {
    const [open, setOpen] = useState<boolean>(false);

    const handleOpenChange = (open: boolean) => {
        setOpen(open);
    };

    return !isSubMenu ? (
        <nav className="relative w-full h-[50px] flex items-center bg-blue-500 text-white shadow-md">
            <div className="app-container flex items-center gap-5">
                {menus.map(({ name, href, children }, index) => (
                    <div key={index}>
                        {Array.isArray(children) && children.length > 0 ? (
                            <DropdownMenu.Root open={open} onOpenChange={handleOpenChange}>
                                <DropdownMenu.Trigger>
                                    <button className="flex items-center gap-3 font-medium tracking-wider">
                                        {name}
                                        <DropdownMenu.TriggerIcon />
                                    </button>
                                </DropdownMenu.Trigger>
                                <DropdownMenu.Content className="min-w-[175px]">
                                    {children.map(({ name, href, children }, index) => (
                                        <div key={index}>
                                            {Array.isArray(children) && children.length > 0 ? (
                                                <Menu menus={children} menuTitle={name} isSubMenu={true} />
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
                                className="w-full h-full flex items-center text-white hover:no-underline"
                            >
                                {name}
                            </Link>
                        )}
                    </div>
                ))}
            </div>
        </nav>
    ) : (
        <DropdownMenu.Sub>
            <DropdownMenu.SubTrigger>{menuTitle}</DropdownMenu.SubTrigger>
            <DropdownMenu.SubContent>
                {menus.map(({ name, href, children }, index) => (
                    <div key={index}>
                        {Array.isArray(children) && children.length > 0 ? (
                            <Menu menus={children} menuTitle={name} isSubMenu={true} />
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
