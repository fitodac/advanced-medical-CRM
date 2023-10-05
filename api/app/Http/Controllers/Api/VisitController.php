<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Traits\ApiResponse;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

use App\Models\Visit;
use App\Traits\VisitMessageTrait;

class VisitController extends Controller
{

	use ApiResponse, VisitMessageTrait;


	// CREATE
	public function create(Request $request)
	{
		$validate = Validator::make($request->all(), [
			'patient_id' => 'required|numeric',
			'visit_type' => 'required'
		], [
			'patient_id.required' => 'La visita debe tener un ID de paciente',
			'patient_id.numeric' => 'Formato incorrecto',
			'visit_type.required' => 'Debes incluír el tipo de visita'
		]);

		if( $validate->fails() ){ return $this->validationErrorResponse($validate->errors()); }

        $messages = $this->normalRangeMessageNotification($request->all());
        // dd($request->all());
		$visit = Visit::create($request->all());

		return $this->successResponse(
            ['visit' => $visit, 'message' => $messages],
            'Hemos registrado una nueva visita'
        );

	}



	// UPDATE
	public function update(Request $request)
	{

		// return 1;
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

        $messages = $this->normalRangeMessageNotification($request->all());

        $visit = Visit::find($request->id);

		if( !$visit ) return $this->errorResponse('La visita que estás buscando no existe o ha sido eliminada', 404);

		$visit->modelUpdate($request->all());

		return $this->successResponse(['visit' => $visit, 'message' => $messages], 'Hemos actualizado los datos de la visita');

	}


	// GET
	public function get(Request $request)
	{
		$messages = "";

		$validate = Validator::make($request->all(), [
			'id' => 'required|numeric'
		], [
			'id.required' => 'Debes proveernos el ID de la visita para continuar',
			'id.numeric' => 'Formato incorrecto'
		]);

		if( $validate->fails() ){ return $this->validationErrorResponse($validate->errors()); }

		$visit = Visit::find($request->id);

		if( !$visit ) return $this->errorResponse('La visita que estás buscando no existe o ha sido eliminada', 404);

		// if ($visit) {
		// 	$messages = $this->normalRangeMessageNotification($visit->keyBy('visit_type')->toArray(), true);
		// }

		return $this->successResponse(['visit' => $visit, 'messages' => $messages]);
	}


	// DELETE
	public function delete(Visit $visit)
	{
		/**
		 * Lo elimina cualquier rol. Si el rol es doctor,
		 * hay que validar que la visita le pertenece al paciente,
		 * que a su vez le pertenece al doctor.
		 */

		if( !$visit ) return $this->errorResponse('La visita que tratas de eliminar no existe', 200);

		$user = Auth::user();

		$visit->load('patient');

		if( $user->role == 'doctor') {
			$doctor = $visit->patient->doctorRelation;

			if ($doctor && $doctor->user_id !== $user->id) {
				return $this->errorResponse('No puedes eliminar la visita seleccionada', 200);
			}
		}

		$visit->delete();

		return $this->successResponse([], 'Se ha eliminado la visita');

	}
}
