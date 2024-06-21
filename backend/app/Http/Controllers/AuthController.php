<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Http\Resources\UserResource;
use App\Models\Role;
use App\Models\User;
use App\Services\MenuService;
use Illuminate\Support\Facades\Cookie;

class AuthController extends Controller
{
    public function login(LoginRequest $request)
    {
        $credentials = $request->getCredentials();

        if (!$tokens = auth()->attempt($credentials)) return response()->json([
            'errors' => [
                'email' => 'The provided credentials do not match our records.',
            ],
        ], 401);

        return response()->json([
            'message' => 'Successfully logged in.',
            'access_token' => $tokens['access_token'],
        ])->withCookie(
            Cookie::make(
                name: 'refresh_token',
                value: $tokens['refresh_token'],
                httpOnly: true,
                minutes: 20160
            )
        );
    }

    public function register(RegisterRequest $request)
    {
        $user = User::create($request->all());
        $user->assignRole('Customer');

        return response()->json([
            'message' => 'Account registration successful.',
        ], 201);
    }

    public function logout()
    {
        auth()->logout();

        return response()->json([
            'message' => 'Successfully logged out.',
        ])->withCookie(
            Cookie::forget('refresh_token')
        );
    }

    public function user()
    {
        $user = auth()->user();

        return new UserResource($user);
    }

    public function userMenus(MenuService $menuService)
    {
        $user = auth()->user();
        $user->load('roles.menus');

        $menus = collect($user->roles)->map(function (Role $role) {
            return $role->menus;
        })->collapse();

        return response()->json([
            'menus' => $menuService->formatMenus($menus),
        ]);
    }

    public function token()
    {
        return response()->json([
            'access_token' => auth()->refresh(),
        ]);
    }
}
