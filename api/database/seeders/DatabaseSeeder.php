<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\User;
use App\Models\Center;

use App\Models\Doctor;
use App\Models\Patient;
use Faker\Factory as Faker;
use Illuminate\Database\Seeder;
use Database\Factories\VisitsFactory;


class DatabaseSeeder extends Seeder
{


	/**
	 * Seed the application's database.
	 */
	public function run(): void
	{

		$faker = Faker::create();

		$this->call([
			UsersSeeder::class,
			SpecialtySeeder::class,
		]);


		Center::create([
			'name' => 'Hospital 1',
			'code' => 'H01'
		]);

		User::create(['name' => 'doctor1', 'email' => 'doctor1@local.com', 'password' => bcrypt(env('USER_DEFAULT_PASSWORD')), 'role' => 'doctor', 'firstname' => 'Linda', 'lastname' => 'Hamilton' ]);
		Doctor::create(['user_id' => 3, 'center_id' => 1, 'specialty_id' => 3]);

		User::create(['name' => 'doctor2', 'email' => 'doctor2@local.com', 'password' => bcrypt(env('USER_DEFAULT_PASSWORD')), 'role' => 'doctor', 'firstname' => 'Arnold', 'lastname' => 'Schwartzeneger' ]);
		Doctor::create(['user_id' => 4, 'center_id' => 1, 'specialty_id' => 6]);

		User::create([ 'name' => 'doctor3', 'email' => 'doctor3@local.com', 'password' => bcrypt(env('USER_DEFAULT_PASSWORD')), 'role' => 'doctor', 'firstname' => 'Edward', 'lastname' => 'Furlong' ]);
		Doctor::create(['user_id' => 5, 'center_id' => 1, 'specialty_id' => 10]);


		$letrasPosibles = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0987654321';
		$longitud = 5;

		for($i = 0; $i < 10; $i++){
			$stringAleatorio = substr(str_shuffle($letrasPosibles), 0, $longitud);

			Patient::create([
				'code' => $stringAleatorio,
				'doctor_id' => rand(1,3),
				'center_id' => 1,
				'name' => $faker->name,
				'lastname' => $faker->lastname,
				'gender' => $faker->randomElement(['hombre', 'mujer'])
			]);
		}

		// \App\Models\User::factory(10)->create();

		// \App\Models\User::factory()->create([
		//     'name' => 'Test User',
		//     'email' => 'test@example.com',
		// ]);
        $visits = VisitsFactory::new()->count(10)->create();
	}
}
