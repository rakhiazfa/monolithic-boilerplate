<?php

namespace App\Services;

use App\Http\Requests\CreateMenuRequest;
use App\Http\Requests\UpdateMenuRequest;
use App\Models\Menu;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;
use Spatie\QueryBuilder\QueryBuilder;

class MenuService
{
    public function findAll(): LengthAwarePaginator
    {
        $menus = QueryBuilder::for(Menu::class)
            ->with('parent')
            ->allowedFilters(['name'])
            ->paginate(15);

        return $menus;
    }

    public function search(): Collection
    {
        $menus = QueryBuilder::for(Menu::class)
            ->allowedFilters(['name'])
            ->get();

        return $menus;
    }

    public function create(CreateMenuRequest $request): Menu
    {
        $menu = Menu::create($request->all());

        return $menu;
    }

    public function findById(string $id): Menu
    {
        $menu = Menu::with('children')->findOrFail($id);

        return $menu;
    }

    public function update(UpdateMenuRequest $request, string $id): bool
    {
        $menu = $this->findById($id);

        return $menu->update($request->all());
    }

    public function delete(string $id): bool
    {
        $menu = $this->findById($id);

        return $menu->delete();
    }

    public function formatMenus(Collection $menus): array
    {
        $menus = $menus->map(function (Menu $menu) {
            return [
                'id' => $menu->id,
                'name' => $menu->name,
                'href' => $menu->href,
                'order' => $menu->order,
                'parent_id' => $menu->parent_id,
                'children' => [],
            ];
        })->sortBy('order');

        return $this->getChildren($menus, null);
    }

    private function getChildren(Collection $menus, int|null $parentId): array
    {
        $rootMenus = $menus->where('parent_id', $parentId)->map(function (array $menu) use ($menus) {
            $menu['children'] = $this->getChildren($menus, $menu['id']);

            return $menu;
        });

        return $rootMenus->values()->toArray();
    }
}
