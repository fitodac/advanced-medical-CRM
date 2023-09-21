<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\Specialty;

class SpecialtySeeder extends Seeder
{
	/**
	 * Run the database seeds.
	 */
	public function run(): void
	{

		$list = [
			'Alergología',
			'Anestesiología',
			'Cardiología',
			'Cirugía Cardiovascular',
			'Cirugía General',
			'Cirugía Pediátrica',
			'Cirugía Plástica y Reconstructiva',
			'Dermatología',
			'Endocrinología',
			'Gastroenterología',
			'Geriatría',
			'Ginecología',
			'Hematología',
			'Infectología',
			'Medicina Familiar',
			'Medicina Interna',
			'Nefrología',
			'Neumología',
			'Neurología',
			'Obstetricia',
			'Oftalmología',
			'Oncología',
			'Ortopedia y Traumatología',
			'Otorrinolaringología',
			'Pediatría',
			'Psiquiatría',
			'Radiología',
			'Reumatología',
			'Urología'
		];

		foreach($list as $item) Specialty::create([ 'name' => $item ]);

	}
}
