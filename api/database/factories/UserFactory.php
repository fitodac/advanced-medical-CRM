<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    protected $model = User::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => Str::slug($this->faker->name),
            'role' => 'doctor',
            'email' => $this->faker->unique()->safeEmail,
            'firstname' => $this->faker->firstName,
            'lastname' => $this->faker->lastName,
            'email_verified_at' => now(),
            'password' => bcrypt(env('USER_DEFAULT_PASSWORD')),
            'remember_token' => Str::random(10),
        ];
    }
}
