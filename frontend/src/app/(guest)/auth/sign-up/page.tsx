'use client';

import { signup } from '@/services/auth/auth.actions';
import { authSelector, resetErrors } from '@/services/auth/auth.slice';
import { SignUpPayload } from '@/services/auth/auth.types';
import { AppDispatch } from '@/store';
import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

export default function SignUp() {
    const { register, watch, handleSubmit, reset } = useForm<SignUpPayload>();
    const watchedFields = watch();

    const { errors, loading } = useSelector(authSelector);
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();

    const onSubmit = (payload: SignUpPayload) => {
        dispatch(signup(payload))
            .unwrap()
            .then(() => {
                reset();
                dispatch(resetErrors());

                router.push('/auth/sign-in');
            });
    };

    useEffect(() => {
        return () => {
            dispatch(resetErrors());
        };
    }, []);

    return (
        <main>
            <section className="min-h-[575px] app-container flex justify-center items-center py-10">
                <div className="w-[425px] bg-white border border-gray-300 rounded-lg px-7 py-7">
                    <h1 className="text-2xl font-bold tracking-wide mb-5">Sign Up</h1>
                    <p className="text-gray-600 mb-7">Enter the details to get started.</p>
                    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-7">
                        <Input
                            type="text"
                            label="Name"
                            {...register('name')}
                            isInvalid={!!errors?.name}
                            errorMessage={errors?.name}
                        />
                        <Input
                            type="text"
                            label="Email"
                            {...register('email')}
                            isInvalid={!!errors?.email}
                            errorMessage={errors?.email}
                        />
                        <Input
                            type="password"
                            label="Password"
                            {...register('password')}
                            isInvalid={!!errors?.password}
                            errorMessage={errors?.password}
                        />
                        <Input type="password" label="Password Confirmation" {...register('password_confirmation')} />
                        <div className="flex justify-end">
                            <Button
                                type="submit"
                                color="primary"
                                isDisabled={
                                    !watchedFields.name ||
                                    !watchedFields.email ||
                                    !watchedFields.password ||
                                    !watchedFields.password_confirmation ||
                                    loading
                                }
                            >
                                Sign Up
                            </Button>
                        </div>
                    </form>
                    <div className="text-center border-t pt-7 mt-7">
                        <p>
                            Already have an account? <Link href="/auth/sign-in">Sign In</Link>
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
}
