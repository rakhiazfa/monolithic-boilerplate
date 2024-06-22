'use client';

import Page from '@/components/container/page';
import { signin } from '@/services/auth/auth.actions';
import { authSelector, resetErrors } from '@/services/auth/auth.slice';
import { SignInPayload } from '@/services/auth/auth.types';
import { AppDispatch } from '@/store';
import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

export default function SignIn() {
    const { register, watch, handleSubmit, reset } = useForm<SignInPayload>();
    const watchedFields = watch();

    const { errors, loading } = useSelector(authSelector);
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();

    const onSubmit = (payload: SignInPayload) => {
        dispatch(signin(payload))
            .unwrap()
            .then(() => {
                reset();
                dispatch(resetErrors());

                router.push('/dashboard');
            });
    };

    useEffect(() => {
        return () => {
            dispatch(resetErrors());
        };
    }, [dispatch]);

    return (
        <Page title="Sign In">
            <main>
                <section className="min-h-[575px] app-container flex justify-center items-center py-10">
                    <div className="w-[425px] bg-white border border-gray-300 rounded-lg px-7 py-7">
                        <h1 className="text-2xl font-bold tracking-wide mb-5">Sign In</h1>
                        <p className="text-gray-600 mb-7">Welcome back, please enter your credentials to continue.</p>
                        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-7">
                            <Input
                                type="text"
                                label="Email"
                                {...register('email')}
                                isInvalid={!!errors?.email}
                                errorMessage={errors?.email}
                                autoFocus
                            />
                            <Input
                                type="password"
                                label="Password"
                                {...register('password')}
                                isInvalid={!!errors?.password}
                                errorMessage={errors?.password}
                            />
                            <Button
                                type="submit"
                                color="primary"
                                isDisabled={!watchedFields.email || !watchedFields.password || loading}
                                isLoading={loading}
                            >
                                Sign In
                            </Button>
                        </form>
                        <div className="text-center border-t pt-7 mt-7">
                            <p>
                                Do not have an account?{' '}
                                <Link href="/auth/sign-up" className="text-blue-500 hover:underline">
                                    Sign Up
                                </Link>
                            </p>
                        </div>
                    </div>
                </section>
            </main>
        </Page>
    );
}
