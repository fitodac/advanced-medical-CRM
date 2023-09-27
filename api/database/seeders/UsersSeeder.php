<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\User;


class UsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $super_admin = [
            'name'      => 'cpi_superadmin',
            'email'     => 'fito+advanced@commonpeoplei.com',
            'password'  => 'cpi_1975'
        ];

        $admin = [
            'name'      => 'cpi_admin',
            'email'     => 'admin@local.com',
            'password'  => 'cpi_1975'
        ];

        // Super Admin
        User::create([
            'name' => $super_admin['name'],
            'email' => $super_admin['email'],
            'password' => bcrypt($super_admin['password']),
            'role' => 'superadmin',
            'email_verified_at' => now()
        ]);

        // Admin
        User::create([
            'name' => $admin['name'],
            'email' => $admin['email'],
            'password' => bcrypt($admin['password']),
            'role' => 'admin',
            'email_verified_at' => now()
        ]);

    }
}
