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
		Schema::create('patients', function (Blueprint $table) {
			$table->id();
			$table->string('code', 10);
			$table->unsignedBigInteger('doctor_id')->nullable();
			$table->unsignedBigInteger('center_id')->nullable();
			$table->string('name');
			$table->string('lastname');
			$table->enum('gender', ['hombre', 'mujer'])->nullable()->comment('Género del paciente');
			$table->timestamps();

			$table->foreign('doctor_id')->references('id')->on('doctors')->onDelete('set null');
			$table->foreign('center_id')->references('id')->on('centers')->onDelete('set null');
		});
	}

	/**
	 * Reverse the migrations.
	 */
	public function down(): void
	{
		Schema::dropIfExists('patients');
	}
};
