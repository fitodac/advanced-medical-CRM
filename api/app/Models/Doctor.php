<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Doctor extends Model
{
	use HasFactory;

	protected $fillable = [
		'user_id',
		'center_id',
		'speciality_id'
	];

	public function user(){ return $this->belongsTo(User::class, 'user_id')->select(['id', 'name', 'email' ]); }
	public function speciality(){ return $this->belongsTo(Speciality::class)->select(['name']); }	
	public function center(){ return $this->belongsTo(Center::class)->select(['id', 'name', 'code']); }

}
