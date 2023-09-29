<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\Center;
use App\Models\Doctor;
use App\Models\Specialty;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Doctor>
 */
class DoctorFactory extends Factory
{
    protected $model = Doctor::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $specialty_id = Specialty::inRandomOrder()->first()->id;
        $center_id = Center::inRandomOrder()->first()->id;

        return [
            'user_id' => User::factory(),
            'center_id' => $center_id,
            'specialty_id' => $specialty_id,
        ];
    }
}
