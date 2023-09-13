<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Traits\ApiResponse;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

use App\Models\Visit;

class VisitController extends Controller
{

	use ApiResponse;


	// CREATE
	public function create(Request $request)
	{

		$auth = Auth::user();

		$validate = Validator::make($request->all(), [
			'patient_id' => 'required|numeric',
			'visit_type' => 'required'
		], [
			'patient_id.required' => 'La visita debe tener un ID de paciente',
			'patient_id.numeric' => 'Formato incorrecto',
			'visit_type.required' => 'Debes incluír el tipo de visita'
		]);

		if( $validate->fails() ){ return $this->validationErrorResponse($validate->errors()); }

		$visit = Visit::create($request->all());

		return $this->successResponse($visit, 'Hemos registrado una nueva visita');

	}



	// UPDATE
	public function update(Request $request)
	{

		$auth = Auth::user();

		$validate = Validator::make($request->all(), [
			'id' => 'required|numeric',
			'patient_id' => 'required|numeric',
			'visit_type' => 'required'
		], [
			'id.required' => 'Debes proveernos el ID de la visita para continuar',
			'id.numeric' => 'Formato incorrecto',
			'visit_type.required' => 'Debes incluír el tipo de visita'
		]);

		if( $validate->fails() ){ return $this->validationErrorResponse($validate->errors()); }

		$visit = Visit::find($request->id);

		if( !$visit ) return $this->errorResponse('La visita que estás buscando no existe o ha sido eliminada', 404);

		return $visit->modelUpdate($request->all());

		return $this->successResponse($visit, 'Hemos actualizado los datos de la visita');

	}

}
