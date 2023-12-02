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
				'email'     => 'dani@commonpeoplei.com',
				'password'  => 'cpi_1975'
			];

			$admin = [
				'name'      => 'cpi_admin',
				'email'     => 'dani+admin@commonpeoplei.com',
				'password'  => 'cpi_1975'
			];

			// Super Admin
			User::create([
				// 'name' => $super_admin['name'],
				'email' => $super_admin['email'],
				'password' => bcrypt($super_admin['password']),
				'firstname' => 'Daniel',
				'lastname' => 'Albiñana',
				'role' => 'superadmin',
				'email_verified_at' => now()
			]);

			// Admin
			User::create([
				// 'name' => $admin['name'],
				'email' => $admin['email'],
				'password' => bcrypt($admin['password']),
				'firstname' => 'Daniel',
				'lastname' => 'Albiñana',
				'role' => 'admin',
				'email_verified_at' => now()
			]);

			if( env('APP_DEBUG') ){
				$doctor = [
					'name'      => 'house_md',
					'email'     => 'house_md@local.com',
					'password'  => 'cpi_1975'
				];

				// Doctor
				$dr = User::create([
					// 'name' => $doctor['name'],
					'email' => $doctor['email'],
					'password' => bcrypt($doctor['password']),
					'firstname' => 'Gregory',
					'lastname' => 'House',
					'role' => 'doctor',
					'email_verified_at' => now()
				]);

				Doctor::create([
					'user_id' => $dr->id,
					'center_id' => 1,
					'specialty_id' => 7
				]);

				User::factory(15)->create()->each(function ($user) {
					Doctor::factory()->create(['user_id' => $user->id]);
					Patient::factory()->create();
				});

			}
    }
}
