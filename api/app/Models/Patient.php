<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Patient extends Model
{
	use HasFactory;

	protected $fillable = [
		'code',
		'doctor_id',
		'center_id',
		'name',
		'lastname',
		'gender',
	];



}