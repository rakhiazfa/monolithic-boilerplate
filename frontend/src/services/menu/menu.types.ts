import { IMenu } from '@/components/container/menu';

export type CreateMenuPayload = {
    name: string;
    href?: string | null;
    order?: number | null;
    parent_id?: number | null;
};

export type UpdateMenuPayload = {
    name: string;
    href?: string | null;
    order?: number | null;
    parent_id?: string | null;
};

export interface Menu extends IMenu {
    id: number;
    order?: number;
    parent?: Menu;
}

export interface MenuErrors extends Partial<CreateMenuPayload & UpdateMenuPayload> {}

export type MenuState = {
    data: {
        menus: Menu[];
        links: any;
        meta: any;
    } | null;
    menu: Menu | null;
    errors: MenuErrors | null;
    loading: boolean;
};
