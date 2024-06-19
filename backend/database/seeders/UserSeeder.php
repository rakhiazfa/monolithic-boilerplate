<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::create([
            'name' => 'Super Admin',
            'email' => 'super.admin@example.co.id',
            'password' => 'P@ssw0rd',
        ]);
        $user->assignRole('Super Admin');

        $user = User::create([
            'name' => 'Customer',
            'email' => 'customer@example.co.id',
            'password' => 'P@ssw0rd',
        ]);
        $user->assignRole('Customer');
    }
}
