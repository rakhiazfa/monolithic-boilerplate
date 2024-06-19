<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateRoleRequest;
use App\Http\Requests\UpdateRoleRequest;
use App\Http\Resources\RoleCollection;
use App\Http\Resources\RoleResource;
use App\Services\RoleService;

class RoleController extends Controller
{
    public function __construct(private RoleService $roleService)
    {
        // 
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $roles = $this->roleService->findAll();

        return new RoleCollection($roles);
    }

    /**
     * Search the specified resource.
     */
    public function search()
    {
        $roles = $this->roleService->search();

        return new RoleCollection($roles);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CreateRoleRequest $request)
    {
        $this->roleService->create($request);

        return response()->json([
            'message' => 'Successfully created a new role.',
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $role = $this->roleService->findById($id);

        return new RoleResource($role);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRoleRequest $request, string $id)
    {
        $this->roleService->update($request, $id);

        return response()->json([
            'message' => 'Successfully updated role.',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $this->roleService->delete($id);

        return response()->json([
            'message' => 'Successfully deleted role.',
        ]);
    }
}
