<?php

namespace Database\Seeders;

use App\Models\Visit;
use App\Models\Patient;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class PatientSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Patient::factory(50)->create()->each(function ($patient) {
            // Para cada paciente, crea una visita del tipo 'initial'
            Visit::factory()->create([
                'patient_id' => $patient->id,
                'visit_type' => 'initial'
            ]);

            // Y luego, crea una visita del tipo 'first'
            Visit::factory()->create([
                'patient_id' => $patient->id,
                'visit_type' => 'first'
            ]);
        });
    }
}
