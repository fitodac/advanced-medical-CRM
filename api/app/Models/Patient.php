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


	public function getDoctorAttribute(){ if( $this->doctor_id ) return Doctor::find($this->doctor_id)->user; }
	public function center(){ return $this->belongsTo(Center::class, 'center_id')->select(['id', 'name', 'code']); }

    public function doctorRelation() {
        return $this->belongsTo(Doctor::class, 'doctor_id');
    }

    public function visits() {
        return $this->hasMany(Visit::class, 'patient_id');
    }
}
