<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Traits\ApiResponse;

use App\Models\Specialty;


class SpecialtyController extends Controller
{

	use ApiResponse;
  
	// GET FULL LIST
	public function getFullList(Request $request)
	{
		$list = Specialty::get()->toArray();
		return $this->successResponse($list);
	}

}
