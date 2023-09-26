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
		'specialty_id'
	];

	public function user(){ return $this->belongsTo(User::class, 'user_id')->select(['id', 'name', 'email', 'firstname', 'lastname' ]); }
	public function specialty(){ return $this->belongsTo(Specialty::class)->select(['id', 'name']); }
	public function center(){ return $this->belongsTo(Center::class); }

}
