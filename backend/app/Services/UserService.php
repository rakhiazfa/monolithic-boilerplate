<?php

namespace App\Services;

use App\Http\Requests\CreateUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Models\User;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;
use Spatie\QueryBuilder\QueryBuilder;

class UserService
{
    public function findAll(): LengthAwarePaginator
    {
        $users = QueryBuilder::for(User::class)
            ->allowedFilters(['name', 'email'])
            ->paginate(15);

        return $users;
    }

    public function search(): Collection
    {
        $users = QueryBuilder::for(User::class)
            ->allowedFilters(['name', 'email'])
            ->get();

        return $users;
    }

    public function create(CreateUserRequest $request): User
    {
        $roles = $request->input('roles', []);

        $user = User::create($request->all());
        $user->roles()->sync($roles);

        return $user;
    }

    public function findById(string $id): User
    {
        $user = User::with('roles')->findOrFail($id);

        return $user;
    }

    public function update(UpdateUserRequest $request, string $id): bool
    {
        $roles = $request->input('roles', []);

        $user = $this->findById($id);
        $user->roles()->sync($roles);

        return $user->update($request->all());
    }

    public function delete(string $id): bool
    {
        $user = $this->findById($id);

        return $user->delete();
    }
}
