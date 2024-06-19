<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
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
        return response()->json([
            'user' => auth()->user(),
        ]);
    }

    public function refresh()
    {
        return response()->json([
            'access_token' => auth()->refresh(),
        ]);
    }
}
