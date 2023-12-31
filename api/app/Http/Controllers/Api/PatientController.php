<?php

namespace App\Http\Controllers\Api;

use App\Models\Doctor;
use App\Models\Patient;
use App\Traits\ApiResponse;
use Illuminate\Http\Request;
use App\Traits\VisitMessageTrait;

use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\PatientResource;
use Illuminate\Support\Facades\Validator;


class PatientController extends Controller
{

	use ApiResponse, VisitMessageTrait;


	// CREATE
	public function create(Request $request)
	{

		$validate = Validator::make($request->all(), [
			'code' => 'required',
			'doctor_id' => 'required|numeric',
			'center_id' => 'required|numeric',
		], [
			'code.required' => 'Debes incluír un código de paciente',
			'doctor_id.required' => 'El ID del doctor es requerido',
			'doctor_id.numeric' => 'Formato incorrecto',
			'center_id.required' => 'El ID del centro médico es requerido',
			'center_id.numeric' => 'Formato incorrecto'
		]);

		if( $validate->fails() ){ return $this->validationErrorResponse($validate->errors()); }

		$patient = Patient::create($request->all());

		return $this->successResponse($patient, 'Hemos creado un nuevo paciente');

	}



	// GET
	public function get(Request $request)
	{

		$auth = Auth::user();
        $messages = '';

		$validate = Validator::make($request->all(), [
			'id' => 'required|numeric',
		], [
			'id.required' => 'Debes proveernos el ID del paciente para continuar',
			'id.numeric' => 'Formato incorrecto'
		]);

		if( $validate->fails() ) return $this->validationErrorResponse($validate->errors());

		$patient = Patient::with('visits')->select(['id', 'code', 'doctor_id', 'center_id'])->find($request->id);

		if ($patient->visits) {
			$messages = $this->normalRangeMessageNotification($patient->visits->keyBy('visit_type')->toArray(), true);
		}

		if( 'doctor' === $auth->role ){
			$doctor = Doctor::where('user_id', $auth->id)->first();
			if( $patient->doctor_id !== $doctor->id ) return $this->unauthorizedResponse('No estás autorizado a ver los datos de este paciente');
			return $this->successResponse(compact('patient', 'messages'));
		}else{
			return $this->successResponse($patient);
		}

	}





	// LIST
	public function list(Request $request)
	{

		$auth = Auth::user();
		$resp = [];

		$query = Patient::with(['doctor.user', 'visits:id,patient_id,birth_date,date']);

		if ($auth->role === 'doctor') {
			$query->where('doctor_id', $auth->doctor->id);
		}

		if ($request->has('code') && !empty($request->code)) {
			$query->where(DB::raw('UPPER(code)'), 'LIKE', '%' . strtoupper($request->code) . '%');
		}

		// if ($request->has('doctor') && !empty($request->doctor)) {
		// 	$query->whereHas('doctor.user', function ($query) use ($request) {
		// 		$query->where(DB::raw('UPPER(firstname)'), 'LIKE', '%' . strtoupper($request->doctor) . '%')
		// 				->orWhere(DB::raw('UPPER(lastname)'), 'LIKE', '%' . strtoupper($request->doctor) . '%');
		// 	});
		// }

		// if ($request->has('name') && !empty($request->name)) {
		// 	$query->where(function($query) use ($request) {
		// 		$query->where(DB::raw('UPPER(name)'), 'LIKE', '%' . strtoupper($request->name) . '%')
		// 				->orWhere(DB::raw('UPPER(lastname)'), 'LIKE', '%' . strtoupper($request->name) . '%');
		// 	});
		// }

		$resp = $query->latest()->paginate(10)->withQueryString();

		return $this->successResponse($resp);
	}



	// DELETE
	public function delete(Patient $patient)
	{
        /**
         * Lo pueden eliminar cualquiera de los roles,
         * pero si es doctor hay que validar que el paciente le pertenece.
         */

        if( !$patient ) return $this->errorResponse('El paciente que tratas de eliminar no existe', 404);

        $user = Auth::user();

        $user->load('doctor');

		if( $user->role == 'doctor' && $user->doctor) {
            if ($user->doctor->id !== $patient->doctor_id ) {
                return $this->unauthorizedResponse('Tu usuario no puede modificar este paciente');
            }
        }

		$patient->delete();

		return $this->successResponse([], 'Se ha eliminado el paciente');

	}

}
