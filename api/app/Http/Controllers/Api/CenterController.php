<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Traits\ApiResponse;
use Illuminate\Support\Facades\Validator;

use App\Models\Center;


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

		$center = Center::create($request->all());

		return $this->successResponse($center, 'Hemos creado un nuevo centro médico');

	}
	
	

	// UPDATE
	public function update(Request $request)
	{

		$validate = Validator::make($request->all(), [
			'id' => 'required|numeric',
			'name' => 'required',
			'code' => 'required|unique:centers'
		], [
			'id.required' => 'Debes proveernos el ID del centro médico para continuar',
			'id.numeric' => 'Formato incorrecto',
			'name.required' => 'Debes incluír un nombre para el centro médico',
			'code.required' => 'Debes proveer un código de 4 dígitos',
			'code.unique' => 'Ya existe un centro médico con ese código',
		]);

		if( $validate->fails() ) return $this->validationErrorResponse($validate->errors());

		$center = Center::find($request->id);
		
		if( !$center ) return $this->errorResponse('El centro médico que estás buscando no existe o ha sido eliminado', 404);

		$center->update([
			'name' => $request->name,
			'code' => $request->code
		]);

		return $this->successResponse($center, 'Hemos actualizado los datos del centro médico');
	}
	



	// SHOW
	public function show(Request $request)
	{

		$center = Center::find($request->id);

		if( !$center ){
			return $this->errorResponse('No existen datos para este hospital', 404);
		}

		return $this->successResponse([ 'center' => $center ]);
	}



	// LIST
	public function list(Request $request)
	{
		return Center::latest()->paginate(10);
	}
	



	// DELETE
	public function delete(Request $request)
	{

		$validate = Validator::make($request->all(), [
			'id' => 'required|numeric'
		], [
			'id.required' => 'Debes proveernos el ID del centro médico para continuar',
			'id.numeric' => 'Formato incorrecto'
		]);

		if( $validate->fails() ) return $this->validationErrorResponse($validate->errors());

		$center = Center::find($request->id);

		if( !$center ) return $this->errorResponse('El centro médico que tratas de eliminar no existe', 404);

		$center->delete();

		return $this->successResponse([], 'Se ha eliminado el centro médico');
	}

}
