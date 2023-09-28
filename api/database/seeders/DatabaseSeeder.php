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
		$this->call([
			CenterSeeder::class,
			SpecialtySeeder::class,
			UsersSeeder::class,
            PatientSeeder::class,
            VisitsSeeder::class,
		]);
	}
}
