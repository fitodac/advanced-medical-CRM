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

			// Super Admin
			User::create([
				'name' => env('SUPER_ADMIN_NAME'),
				'email' => env('SUPER_ADMIN_EMAIL'),
				'password' => bcrypt(env('SUPER_ADMIN_PASSWORD')),
				'role' => 'superadmin',
                'email_verified_at' => now()
			]);

			// Admin
			User::create([
				'name' => env('ADMIN_NAME'),
				'email' => env('ADMIN_EMAIL'),
				'password' => bcrypt(env('ADMIN_PASSWORD')),
				'role' => 'admin',
                'email_verified_at' => now()
			]);

    }
}
