<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Doctor extends Model
{
	use HasFactory;

	protected $fillable = [
		'user_id',
		'center_id',
		'specialty_id'
	];

    public function patiens() {
        return $this->hasMany(Patient::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class)->select(['id', 'name', 'email', 'firstname', 'lastname' ]);
    }

    public function center()
    {
        return $this->belongsTo(Center::class);
    }

    public function specialty()
    {
        return $this->belongsTo(Specialty::class)->select(['id', 'name']);
    }
}
