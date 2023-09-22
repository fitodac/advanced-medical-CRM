<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PatientResource extends JsonResource
{
	/**
	 * Transform the resource into an array.
	 *
	 * @return array<string, mixed>
	 */
	public function toArray(Request $request): array
	{
		// return parent::toArray($request);
		return [
			'id' => $this->id,
			'code' => $this->code,
			'name' => $this->name,
			'lastname' => $this->lastname,
			'gender' => $this->gender,
			'doctor' => $this->doctor,
			'center' => $this->center,
		];
	}
}
