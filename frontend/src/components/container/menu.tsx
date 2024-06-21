'use client';

import { DropdownMenu } from '@radix-ui/themes';
import Link from 'next/link';

export type IMenu = {
    name: string;
    href?: string;
    children?: IMenu[];
};

type MenuProps = {
    menu: IMenu[];
    menuTitle?: string;
    isSubMenu?: boolean;
};

const Menu = ({ menu, menuTitle, isSubMenu = false }: MenuProps) => {
    return !isSubMenu ? (
        <nav className="relative w-full h-[50px] flex items-center bg-blue-500 text-white">
            <div className="app-container flex items-center gap-5">
                {menu.map(({ name, href, children }, index) => (
                    <div key={index}>
                        {Array.isArray(children) && children.length > 0 ? (
                            <DropdownMenu.Root>
                                <DropdownMenu.Trigger>
                                    <button className="flex items-center gap-3">
                                        {name}
                                        <DropdownMenu.TriggerIcon />
                                    </button>
                                </DropdownMenu.Trigger>
                                <DropdownMenu.Content>
                                    {children.map(({ name, href, children }, index) => (
                                        <div key={index}>
                                            {Array.isArray(children) && children.length > 0 ? (
                                                <Menu menu={children} menuTitle={name} isSubMenu={true} />
                                            ) : (
                                                <DropdownMenu.Item>
                                                    <Link
                                                        href={href ?? '/'}
                                                        className="flex items-center h-full text-inherit hover:no-underline"
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
                            <Link href={href ?? '/'} className="flex items-center h-full text-white hover:no-underline">
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
                {menu.map(({ name, href, children }, index) => (
                    <div key={index}>
                        {Array.isArray(children) && children.length > 0 ? (
                            <Menu menu={children} menuTitle={name} isSubMenu={true} />
                        ) : (
                            <DropdownMenu.Item>
                                <Link href={href ?? '/'} className="text-inherit hover:no-underline">
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
