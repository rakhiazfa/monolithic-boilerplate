<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

/* ---------------------------------------------------------------------
| Auth Routes
--------------------------------------------------------------------- */

Route::prefix('/auth')->group(function () {
    Route::post('/login', [AuthController::class, 'login'])->name('auth.login');
    Route::post('/register', [AuthController::class, 'register'])->name('auth.register');
    Route::post('/logout', [AuthController::class, 'logout'])->name('auth.logout');
    Route::post('/token', [AuthController::class, 'token'])->name('auth.token');
    Route::middleware('auth')->get('/user', [AuthController::class, 'user'])->name('auth.user');
    Route::middleware('auth')->get('/user/menus', [AuthController::class, 'userMenus'])->name('auth.user.menus');
});

Route::middleware(['auth', 'permission'])->group(function () {

    /* ---------------------------------------------------------------------
    | Role Routes
    --------------------------------------------------------------------- */

    Route::get('/roles/search', [RoleController::class, 'search'])->name('roles.search');
    Route::apiResource('/roles', RoleController::class, [
        'parameters' => [
            'roles' => 'id',
        ],
    ]);

    /* ---------------------------------------------------------------------
    | User Routes
    --------------------------------------------------------------------- */

    Route::get('/users/search', [UserController::class, 'search'])->name('users.search');
    Route::apiResource('/users', UserController::class, [
        'parameters' => [
            'users' => 'id',
        ],
    ]);

    Route::get('/menus/search', [MenuController::class, 'search'])->name('menus.search');
    Route::apiResource('/menus', MenuController::class, [
        'parameters' => [
            'menus' => 'id',
        ],
    ]);
});
