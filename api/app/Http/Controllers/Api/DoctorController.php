<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Traits\ApiResponse;
use App\Http\Resources\DoctorResource;
use Illuminate\Support\Facades\Validator;

use App\Models\Doctor;

class DoctorController extends Controller
{

	use ApiResponse;


  public function list(Request $request)
	{
		$resp = Doctor::latest()->paginate(10);
		return DoctorResource::collection($resp);
	}



	public function show(Request $request)
	{

		$validate = Validator::make($request->all(), [
			'id' => 'required|numeric',
		], [
			'id.required' => 'Debes proveernos el ID del doctor para continuar',
			'id.numeric' => 'Formato incorrecto',
		]);

		$doctor = Doctor::select(['id', 'specialty_id', 'center_id'])->where('user_id', $request->id)->first();

		return $this->successResponse([
			'id' => $doctor->id,
			'specialty_id' => $doctor->specialty_id,
			'center' => $doctor->center
		]);
	}

}
