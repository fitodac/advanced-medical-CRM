<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Doctor;

use App\Models\Patient;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;


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

        $dogtor = [
					'name'      => 'house_md',
					'email'     => 'house_md@local.com',
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

			  // Dogtor
        $dr = User::create([
            'name' => $dogtor['name'],
            'email' => $dogtor['email'],
            'password' => bcrypt($dogtor['password']),
            'role' => 'doctor',
            'email_verified_at' => now(),
						'firstname' => 'Gregory',
						'lastname' => 'House'
        ]);

				Doctor::create([
					'user_id' => $dr->id,
					'center_id' => 1,
					'specialty_id' => 7
				]);

        User::factory(15)->create()->each(function ($user) {
            $doctor = Doctor::factory()->create(['user_id' => $user->id]);
            Patient::factory()->create();
        });
    }
}
