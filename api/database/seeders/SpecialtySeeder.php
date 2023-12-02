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
			'Anestesiología y reanimación',
			'Aparato digestivo',
			'Cardiología',
			'Endocrinología y nutrición',
			'Geriatría',
			'Hematología y hemoterapia',
			'Medicina de la educación física y del deporte',
			'Medicina espacial',
			'Medicina intensiva',
			'Medicina interna',
			'Medicina legal y forense',
			'Medicina preventiva y salud pública',
			'Medicina del trabajo',
			'Nefrología',
			'Neumología',
			'Neurología',
			'Neurofisiología Clínica',
			'Oncología médica',
			'Oncología radioterápica',
			'Pediatría',
			'Psiquiatría',
			'Rehabilitación',
			'Reumatología',
			'Medicina familiar y comunitaria',
			'Enfermería',
			'Nutricionista',
			'Otra'
		];

		foreach($list as $item) Specialty::create([ 'name' => $item ]);

	}
}
