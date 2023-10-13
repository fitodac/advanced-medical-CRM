<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Patient extends Model
{
	use HasFactory;

	protected static function boot()
	{
		parent::boot();

		static::created(function ($patient) {
			$formattedId = str_pad($patient->id, 2, '0', STR_PAD_LEFT);  // Agrega '0' si es menor a 10
			$patient->code = $patient->center->code . '-' . $formattedId;
			$patient->save();
		});
	}

	protected $fillable = [
		'code',
		'doctor_id',
		'center_id'
	];


	// public function getDoctorAttribute(){ if( $this->doctor_id ) return Doctor::find($this->doctor_id)->user; }
	public function center(){ return $this->belongsTo(Center::class, 'center_id')->select(['id', 'code']); }

	public function doctor() {
		return $this->belongsTo(Doctor::class, 'doctor_id');
	}

	public function visits() {
		return $this->hasMany(Visit::class, 'patient_id');
	}
}
