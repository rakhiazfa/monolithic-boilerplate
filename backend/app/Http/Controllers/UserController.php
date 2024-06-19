<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserCollection;
use App\Http\Resources\UserResource;
use App\Services\UserService;

class UserController extends Controller
{
    public function __construct(private UserService $userService)
    {
        // 
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = $this->userService->findAll();

        return new UserCollection($users);
    }

    /**
     * Search the specified resource.
     */
    public function search()
    {
        $users = $this->userService->search();

        return new UserCollection($users);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CreateUserRequest $request)
    {
        $this->userService->create($request);

        return response()->json([
            'message' => 'Successfully created a new user.',
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $user = $this->userService->findById($id);

        return new UserResource($user);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, string $id)
    {
        $this->userService->update($request, $id);

        return response()->json([
            'message' => 'Successfully updated user.',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $this->userService->delete($id);

        return response()->json([
            'message' => 'Successfully deleted user.',
        ]);
    }
}
