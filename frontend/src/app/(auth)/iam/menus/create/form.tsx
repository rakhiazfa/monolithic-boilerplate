'use client';

import { createMenu, searchMenus } from '@/services/menu/menu.actions';
import { menuSelector, resetErrors } from '@/services/menu/menu.slice';
import { CreateMenuPayload, Menu } from '@/services/menu/menu.types';
import { AppDispatch } from '@/store';
import { Autocomplete, AutocompleteItem } from '@nextui-org/autocomplete';
import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

const Form = () => {
    const { register, setValue, watch, handleSubmit, reset } = useForm<CreateMenuPayload>({
        defaultValues: {
            name: '',
            href: '/',
            order: 1,
            parent_id: null
        }
    });
    const watchedFields = watch();

    const { errors, loading } = useSelector(menuSelector);
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();

    const [menus, setMenus] = useState<Menu[]>([]);

    const handleSearchMenus = (keyword: string) => {
        dispatch(
            searchMenus({
                'filter[name]': keyword
            })
        )
            .unwrap()
            .then((data) => {
                setMenus(data.menus);
            });
    };

    const onSubmit = (payload: CreateMenuPayload) => {
        dispatch(createMenu(payload))
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
                defaultItems={menus}
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
                    isDisabled={
                        !watchedFields.name || !watchedFields.href || !watchedFields.order || !watchedFields.parent_id || loading
                    }
                    isLoading={loading}
                >
                    Save
                </Button>
            </div>
        </form>
    );
};

export default Form;
