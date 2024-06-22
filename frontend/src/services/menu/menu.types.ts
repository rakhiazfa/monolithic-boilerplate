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
    parent_id?: number | null;
};

export interface Menu {
    id: number;
    name: string;
    href?: string;
    order?: number;
    parent_id?: number | null;
    parent?: Menu | null;
    children?: Menu[];
}

export interface MenuErrors extends Partial<CreateMenuPayload & UpdateMenuPayload> {}

export type MenuState = {
    data: {
        menus: Menu[];
        links: any;
        meta: any;
    } | null;
    menu: Menu | null;
    menuOptions: Menu[] | null;
    errors: MenuErrors | null;
    loading: boolean;
};
