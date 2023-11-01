<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\User;
use App\Models\Center;

use Faker\Factory as Faker;
use Illuminate\Database\Seeder;


class DatabaseSeeder extends Seeder
{


	/**
	 * Seed the application's database.
	 */
	public function run(): void
	{
		if( env('APP_DEBUG') ) {
			$this->call([
				CenterSeeder::class
			]);
		}

		$this->call([
			SpecialtySeeder::class,
			UsersSeeder::class
		]);

		if( env('APP_DEBUG') ) {
			$this->call([
				CenterSeeder::class
			]);

			PatientSeeder::class;
		}
	}
}
