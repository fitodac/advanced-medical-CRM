<?php

namespace Database\Factories;

use App\Models\Center;
use App\Models\Doctor;
use App\Models\Patient;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Patient>
 */
class PatientFactory extends Factory
{
    protected $model = Patient::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $genders = ['hombre', 'mujer'];
        $doctor = Doctor::inRandomOrder()->first();

        return [
            'code' => Str::upper($this->randomAlphaNum(5)),
            'doctor_id' => $doctor->id,
            'center_id' => $doctor->center->id
        ];
    }

    private function randomAlphaNum($length)
    {
        $characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $charactersLength = strlen($characters);
        $randomString = '';
        for ($i = 0; $i < $length; $i++) {
            $randomString .= $characters[rand(0, $charactersLength - 1)];
        }
        return $randomString;
    }
}
