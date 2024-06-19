<?php

namespace App\Services;

use App\Http\Requests\CreateRoleRequest;
use App\Http\Requests\UpdateRoleRequest;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;
use Spatie\Permission\Models\Role;
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
        $permissions = $request->input('permissions', []);

        $role = Role::create($request->all());
        $role->permissions()->sync($permissions);

        return $role;
    }

    public function findById(string $id): Role
    {
        $role = Role::with('permissions')->findOrFail($id);

        return $role;
    }

    public function update(UpdateRoleRequest $request, string $id): bool
    {
        $permissions = $request->input('permissions', []);

        $role = $this->findById($id);
        $role->permissions()->sync($permissions);

        return $role->update($request->all());
    }

    public function delete(string $id): bool
    {
        $role = $this->findById($id);

        return $role->delete();
    }
}
