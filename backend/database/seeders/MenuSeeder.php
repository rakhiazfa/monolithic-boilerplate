<?php

namespace Database\Seeders;

use App\Models\Menu;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MenuSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $menu = Menu::create([
            'name' => 'IAM',
            'order' => 10,
        ]);

        $menu->children()->saveMany([
            new Menu(['name' => 'Users', 'href' => '/iam/users', 'order' => 1]),
            new Menu(['name' => 'Roles', 'href' => '/iam/roles', 'order' => 2]),
            new Menu(['name' => 'Menus', 'href' => '/iam/menus', 'order' => 3]),
        ]);
    }
}
