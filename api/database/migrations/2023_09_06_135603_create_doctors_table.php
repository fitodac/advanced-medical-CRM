<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
	/**
	 * Run the migrations.
	 */
	public function up(): void
	{
		Schema::create('doctors', function (Blueprint $table) {
			$table->id();
			$table->unsignedBigInteger('user_id')->unique()->constrained('users')->cascadeOnDelete();
			$table->unsignedBigInteger('center_id')->constrained('centers')->nullOnDelete();
			$table->unsignedBigInteger('specialty_id')->constrained('specialties')->nullOnDelete();
			$table->timestamps();
		});
	}

	/**
	 * Reverse the migrations.
	 */
	public function down(): void
	{
		Schema::dropIfExists('doctors');
	}
};
