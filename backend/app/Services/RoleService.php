<?php

namespace App\Services;

use App\Http\Requests\CreateRoleRequest;
use App\Http\Requests\UpdateRoleRequest;
use App\Models\Role;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Spatie\QueryBuilder\QueryBuilder;

class RoleService
{
    public function findAll(): LengthAwarePaginator
    {
        $roles = QueryBuilder::for(Role::class)
            ->allowedFilters(['name'])
            ->paginate(15);

        return $roles;
    }

    public function search(): Collection
    {
        $roles = QueryBuilder::for(Role::class)
            ->allowedFilters(['name'])
            ->get();

        return $roles;
    }

    public function create(CreateRoleRequest $request): Role
    {
        $role = DB::transaction(function () use ($request) {
            $permissions = $request->input('permissions', []);
            $menus = $request->input('menus', []);

            $role = Role::create($request->all());
            $role->permissions()->sync($permissions);
            $role->menus()->sync($menus);

            return $role;
        });

        return $role;
    }

    public function findById(string $id): Role
    {
        $role = Role::with(['permissions', 'menus'])->findOrFail($id);

        return $role;
    }

    public function update(UpdateRoleRequest $request, string $id): bool
    {
        $role = DB::transaction(function () use ($request, $id) {
            $permissions = $request->input('permissions', []);
            $menus = $request->input('menus', []);

            $role = $this->findById($id);
            $role->permissions()->sync($permissions);
            $role->menus()->sync($menus);

            return $role;
        });

        return $role->update($request->all());
    }

    public function delete(string $id): bool
    {
        $role = $this->findById($id);

        return $role->delete();
    }
}
