<?php

namespace App\Http\Controllers\Api;

use App\Models\Doctor;
use App\Traits\ApiResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

use App\Http\Resources\DoctorResource;
use Illuminate\Support\Facades\Validator;

class DoctorController extends Controller
{

	use ApiResponse;


  public function list(Request $request)
	{
        $query = Doctor::with(['center', 'user', 'specialty']);

        if ($request->has('name') && !empty($request->name)) {
            $query->whereHas('user', function ($query) use ($request) {
                $query->where(DB::raw('UPPER(firstname)'), 'LIKE', '%' . strtoupper($request->name) . '%')
                    ->orWhere(DB::raw('UPPER(lastname)'), 'LIKE', '%' . strtoupper($request->name) . '%');
            });
        }

        if ($request->has('center_id') && $request->center_id != 0) {
            $query->where('center_id', $request->center_id);
        }

        if ($request->has('specialty_id') && $request->specialty_id != 0) {
            $query->where('specialty_id', $request->specialty_id);
        }

        $resp = $query->latest()->paginate(10);

		return $this->successResponse($resp);
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
