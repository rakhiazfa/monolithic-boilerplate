'use client';

import { searchMenus, updateMenu } from '@/services/menu/menu.actions';
import { menuSelector, resetErrors } from '@/services/menu/menu.slice';
import { Menu, UpdateMenuPayload } from '@/services/menu/menu.types';
import { AppDispatch } from '@/store';
import { Autocomplete, AutocompleteItem } from '@nextui-org/autocomplete';
import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

type FormProps = {
    menu: Menu;
};

const Form = ({ menu }: FormProps) => {
    const { menuOptions, errors, loading } = useSelector(menuSelector);
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();

    const { register, setValue, watch, handleSubmit, reset } = useForm<UpdateMenuPayload>({
        defaultValues: {
            name: menu.name,
            href: menu.href,
            order: menu.order,
            parent_id: menu.parent_id
        }
    });
    const watchedFields = watch();

    const handleSearchMenus = (keyword: string) => {
        dispatch(
            searchMenus({
                'filter[name]': keyword
            })
        );
    };

    const onSubmit = (payload: UpdateMenuPayload) => {
        dispatch(
            updateMenu({
                payload,
                id: menu.id
            })
        )
            .unwrap()
            .then(() => {
                reset();
                dispatch(resetErrors());

                router.push('/iam/menus');
            });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-7">
            <Input type="text" label="Name" {...register('name')} isInvalid={!!errors?.name} errorMessage={errors?.name} />
            <Input type="text" label="Href" {...register('href')} isInvalid={!!errors?.href} errorMessage={errors?.href} />
            <Input
                type="number"
                min={1}
                label="Order"
                {...register('order')}
                isInvalid={!!errors?.order}
                errorMessage={errors?.order}
            />
            <Autocomplete
                label="Parent Menu"
                placeholder="Select a parent menu"
                defaultSelectedKey={menu.parent_id?.toString()}
                items={menuOptions ?? []}
                onInputChange={handleSearchMenus}
                onSelectionChange={(id) => (id ? setValue('parent_id', +id.toString()) : null)}
            >
                {({ id, name }: Menu) => (
                    <AutocompleteItem key={id} value={id}>
                        {name}
                    </AutocompleteItem>
                )}
            </Autocomplete>
            <div className="col-span-2 flex justify-end">
                <Button
                    type="submit"
                    color="primary"
                    isDisabled={!watchedFields.name || !watchedFields.order || loading}
                    isLoading={loading}
                >
                    Save
                </Button>
            </div>
        </form>
    );
};

export default Form;
