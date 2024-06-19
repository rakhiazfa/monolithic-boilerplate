<?php

namespace App\Providers;

use App\Auth\JWTGuard;
use App\Auth\JWTUserProvider;
use App\Models\User;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        Gate::before(function (User $user) {
            if ($user->hasRole('Super Admin')) return true;
        });

        Auth::extend('jwt', function () {
            $provider = app(JWTUserProvider::class);
            $request = app('request');

            return new JWTGuard($provider, $request);
        });
    }
}
