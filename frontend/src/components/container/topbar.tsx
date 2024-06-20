'use client';

import { signout } from '@/services/auth/auth.actions';
import { authSelector } from '@/services/auth/auth.slice';
import { AppDispatch } from '@/store';
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
                console.log('asd');
                router.push('/auth/sign-in');
            });
    };

    return (
        <header className="relative w-full h-[75px] flex items-center border-b">
            <div className="app-container flex justify-between items-center">
                <div></div>
                <nav>
                    <ul>
                        <li>
                            <button onClick={handleSignOut} disabled={loading}>
                                Logout
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Topbar;
