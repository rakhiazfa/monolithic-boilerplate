'use client';

import { signout } from '@/services/auth/auth.actions';
import { authSelector } from '@/services/auth/auth.slice';
import { AppDispatch } from '@/store';
import { Avatar } from '@nextui-org/avatar';
import { DropdownMenu } from '@radix-ui/themes';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';

const Topbar = () => {
    const { user, loading } = useSelector(authSelector);
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();

    const handleSignOut = () => {
        dispatch(signout())
            .unwrap()
            .then(() => {
                router.push('/auth/sign-in');
            });
    };

    return (
        <header className="relative w-full h-[70px] flex items-center bg-blue-500 border-b">
            <div className="app-container flex justify-between items-center">
                <div>
                    <Link href="/dashboard" className="text-xl text-white font-semibold tracking-wide hover:no-underline">
                        Monolithic Boilerplate
                    </Link>
                </div>
                <nav>
                    <ul>
                        <li>
                            <DropdownMenu.Root>
                                <DropdownMenu.Trigger className="flex items-center">
                                    <button>
                                        <Avatar name={user?.name} />
                                    </button>
                                </DropdownMenu.Trigger>
                                <DropdownMenu.Content className="min-w-[200px] mt-[0.5rem]">
                                    <DropdownMenu.Item>Profile</DropdownMenu.Item>
                                    <DropdownMenu.Separator />
                                    <DropdownMenu.Item color="red" onClick={handleSignOut} disabled={loading}>
                                        Sign Out
                                    </DropdownMenu.Item>
                                </DropdownMenu.Content>
                            </DropdownMenu.Root>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Topbar;
