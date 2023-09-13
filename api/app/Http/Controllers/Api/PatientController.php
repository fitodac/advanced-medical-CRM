<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Traits\ApiResponse;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

use App\Models\Patient;
use App\Models\Doctor;


class PatientController extends Controller
{

	use ApiResponse;


	// CREATE
	public function create(Request $request)
	{

		$validate = Validator::make($request->all(), [
			'code' => 'required|unique:patients',
			'doctor_id' => 'required|numeric',
			'center_id' => 'required|numeric',
			'name' => 'required',
			'lastname' => 'required',
		], [
			'code.required' => 'Debes incluír un código de paciente',
			'code.unique' => 'Ya existe un paciente con ese código',
			'doctor_id.required' => 'El ID del doctor es requerido',
			'doctor_id.numeric' => 'Formato incorrecto',
			'center_id.required' => 'El ID del centro médico es requerido',
			'center_id.numeric' => 'Formato incorrecto',
			'name.required' => 'Debes incluír un nombre para el paciente',
			'lastname.required' => 'Debes incluír un apellido para el paciente'
		]);

		if( $validate->fails() ){ return $this->validationErrorResponse($validate->errors()); }

		$patient = Patient::create($request->all());

		return $this->successResponse($patient, 'Hemos creado un nuevo paciente');

	}



	// UPDATE
	public function update(Request $request)
	{

		$validate = Validator::make($request->all(), [
			'id' => 'required|numeric',
			'doctor_id' => 'required|numeric',
			'name' => 'required',
			'lastname' => 'required',
		], [
			'id.required' => 'Debes proveernos el ID del paciente para continuar',
			'id.numeric' => 'Formato incorrecto',
			'doctor_id.required' => 'Debes proveernos un ID de usuario',
			'doctor_id.numeric' => 'Formato incorrecto',
			'name.required' => 'Debes incluír un nombre para el paciente',
			'lastname.required' => 'Debes incluír un apellido para el paciente'
		]);

		if( $validate->fails() ) return $this->validationErrorResponse($validate->errors());

		$patient = Patient::find($request->id);

		if( !$patient ) return $this->errorResponse('El paciente que estás buscando no existe o ha sido eliminado', 404);
		if( $request->doctor_id !== $patient->doctor_id ) return $this->unauthorizedResponse('Tu usuario no puede modificar este paciente');

		$patient->update([
			'name' => $request->name,
			'lastname' => $request->lastname,
		]);

		return $this->successResponse($patient, 'Hemos actualizado los datos del paciente');

	}


	// SHOW
	public function show(Request $request)
	{

		$auth = Auth::user();

		$validate = Validator::make($request->all(), [
			'id' => 'required|numeric',
		], [
			'id.required' => 'Debes proveernos el ID del paciente para continuar',
			'id.numeric' => 'Formato incorrecto'
		]);

		if( $validate->fails() ) return $this->validationErrorResponse($validate->errors());

		$patient = Patient::find($request->id);

		if( 'doctor' === $auth->role ){
			$doctor = Doctor::where('user_id', $auth->id)->first();
			if( $patient->doctor_id !== $doctor->id ) return $this->unauthorizedResponse('No estás autorizado a ver los datos de este paciente');
			return $this->successResponse($patient, '');
		}else{
			return $this->successResponse($patient, '');
		}

	}


	// LIST
	public function list(Request $request)
	{

		$auth = Auth::user();

		if( 'doctor' === $auth->role ){
			$doctor = Doctor::where('user_id', $auth->id)->first();
			return Patient::where('doctor_id', $doctor->id)->latest()->paginate(10);
		}else{
			return Patient::latest()->paginate(10);
		}

	}


	// DELETE
	public function delete(Request $request)
	{

		$validate = Validator::make($request->all(), [
			'id' => 'required|numeric',
			'doctor_id' => 'required|numeric',
		], [
			'id.required' => 'Debes proveernos el ID del paciente para continuar',
			'id.numeric' => 'Formato incorrecto',
			'doctor_id.required' => 'Debes proveernos un ID de usuario',
			'doctor_id.numeric' => 'Formato incorrecto'
		]);

		if( $validate->fails() ) return $this->validationErrorResponse($validate->errors());

		$patient = Patient::find($request->id);

		if( !$patient ) return $this->errorResponse('El paciente que tratas de eliminar no existe', 404);
		if( $request->doctor_id !== $patient->doctor_id ) return $this->unauthorizedResponse('Tu usuario no puede modificar este paciente');

		$patient->delete();

		return $this->successResponse([], 'Se ha eliminado el paciente');

	}

}