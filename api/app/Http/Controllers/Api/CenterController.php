<?php

namespace App\Http\Controllers\Api;

use App\Models\Center;
use App\Traits\ApiResponse;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Str;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;


class CenterController extends Controller
{

	use ApiResponse;


	// CREATE
	public function create(Request $request)
	{

		$validate = Validator::make($request->all(), [
			'name' => 'required',
			'code' => 'required|unique:centers'
		], [
			'name.required' => 'Debes incluír un nombre para el centro médico',
			'code.required' => 'Debes proveer un código de 4 dígitos',
			'code.unique' => 'Ya existe un centro médico con ese código',
		]);

		if( $validate->fails() ){ return $this->validationErrorResponse($validate->errors()); }

		$center = Center::create([
			'name' => $request->name,
			'code' => Str::upper($request->code)
		]);

		return $this->successResponse($center, 'Hemos creado un nuevo centro médico');

	}



	// UPDATE
	public function update(Request $request)
	{

		$validate = Validator::make($request->all(), [
			'id' => 'required|numeric',
			'name' => 'required',
			// 'code' => 'required|unique:centers'
		], [
			'id.required' => 'Debes proveernos el ID del centro médico para continuar',
			'id.numeric' => 'Formato incorrecto',
			'name.required' => 'Debes incluír un nombre para el centro médico',
			// 'code.required' => 'Debes proveer un código de 4 dígitos',
			// 'code.unique' => 'Ya existe un centro médico con ese código',
		]);

		if( $validate->fails() ) return $this->validationErrorResponse($validate->errors());

		$center = Center::find($request->id);

		if( !$center ) return $this->errorResponse('El centro médico que estás buscando no existe o ha sido eliminado', 404);

		$center->update([
			'name' => $request->name,
			// 'code' => Str::upper($request->code)
		]);

		return $this->successResponse($center, 'Hemos actualizado los datos del centro médico');
	}




	// GET
	public function get(Request $request)
	{

		$center = Center::find($request->id);

		if( !$center ){
			return $this->errorResponse('No existen datos para este hospital', 404);
		}

		return $this->successResponse($center);
	}



	// LIST
	public function list(Request $request)
	{
        $query = Center::query();

        if ($request->has('center_id') && $request->center_id != 0) {
            $query->where('center_id', $request->center_id);
        }

        $list = $query->latest()->paginate(10);

		return $this->successResponse($list);
	}


	// GET FULL LIST
	public function getFullList(Request $request)
	{
		$list = Center::get();
		return $this->successResponse($list);
	}



	// DELETE
	public function delete(Center $center)
	{
		if( !$center ) return $this->errorResponse('El centro médico que tratas de eliminar no existe', 404);

        $user = Auth::user();

		if( $user->role == 'doctor') {
            return $this->errorResponse('No puedes eliminar el centro médico', 200);
        }

		$center->delete();

		return $this->successResponse([], 'Se ha eliminado el centro médico');
	}

}
