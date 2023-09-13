<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Traits\ApiResponse;
use App\Http\Resources\DoctorResource;

use App\Models\Doctor;

class DoctorController extends Controller
{

	use ApiResponse;


  public function list(Request $request)
	{
		$resp = Doctor::latest()->paginate(10);
		return DoctorResource::collection($resp);
	}

}
