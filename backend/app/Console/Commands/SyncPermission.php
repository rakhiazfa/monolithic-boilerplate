<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Schema;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\PermissionRegistrar;

class SyncPermission extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:sync-permission';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        /**
         * Reset cached roles and permissions.
         */
        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        /**
         * Reset registered permissions.
         */
        Schema::disableForeignKeyConstraints();
        DB::table('permissions')->truncate();
        Schema::enableForeignKeyConstraints();

        /**
         * Restore available permissions.
         */
        $routes = Route::getRoutes()->getRoutes();
        $allowedGuards = ['api'];

        foreach ($routes as $route) {
            $routeName = $route->getName();
            $guardName = isset($route->getAction()['middleware']) ? $route->getAction()['middleware']['0'] : '';

            if (!empty($routeName) && in_array($guardName, $allowedGuards)) {
                Permission::create([
                    'name' => $routeName,
                    'guard_name' => $guardName
                ]);
            }
        }

        $this->info('Permission synchronization was successful.');
    }
}
