<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Traits\ApiResponse;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

use App\Models\User;
use App\Models\Doctor;

class UserController extends Controller
{
  
	use ApiResponse;

	// CREATE
	public function create(Request $request)
	{

		$auth = Auth::user();

		$validate = Validator::make($request->all(), [
			'name' => 'required|unique:users',
			'email' => 'required|unique:users'
		], [
			'name.required' => 'Debes incluír un nombre para el usuario',
			'name.unique' => 'Ya existe un usuario con ese nombre',
			'email.required' => 'Debes incluír un email para el usuario',
			'email.unique' => 'El email que intentas usar ya existe en la base de datos'
		]);

		if( $validate->fails() ){ return $this->validationErrorResponse($validate->errors()); }

		// Set the default password for the new user
		$userData = array_merge($request->all(), [ 
			'role' => 'superadmin' === $auth->role ? $request->role : 'doctor',
			'password' => env('USER_DEFAULT_PASSWORD') 
		]);


		// If the role is 'doctor', some additional information need to be validated
		if( 'doctor' === $userData['role'] ){
			$validate_doctor = Validator::make($userData, [
				'center_id' => 'required|numeric',
				'speciality_id' => 'required|numeric',
			], [
				'center_id.required' => 'Debes seleccionar un hospital para continuar',
				'center_id.numeric' => 'Formato incorrecto',
				'speciality_id.required' => 'El doctor debe tener una especialidad',
				'speciality_id.numeric' => 'Formato incorrecto'
			]);

			if( $validate_doctor->fails() ){ return $this->validationErrorResponse($validate_doctor->errors()); }
		}

		$user = User::create($userData);

		if( 'doctor' === $userData['role'] ){
			$drData = array_merge($userData, ['user_id' => $user->id]);
			Doctor::create($drData);
		}

		$token = $user->createToken('my-token')->plainTextToken;

		return $this->successResponse($user, 'Hemos creado un nuevo usuario');

	}




	// UPDATE
	public function update(Request $request)
	{

		$auth = Auth::user();
		
		$validate = Validator::make($request->all(), [
			'id' => 'required|numeric',
			'name' => 'required|unique:users,name,'.$request->id,
			'email' => 'required|unique:users,email,'.$request->id,
			'role' => 'required|in:admin,doctor',
		], [
			'id.required' => 'Debes proveernos el ID del paciente para continuar',
			'id.numeric' => 'Formato incorrecto',
			'name.required' => 'Debes incluír un nombre para el usuario',
			'name.unique' => 'Ya existe un usuario con ese nombre',
			'email.required' => 'Debes incluír un email para el usuario',
			'email.unique' => 'El email que intentas usar ya existe en la base de datos',
			'role.in' => 'El role no es válido',
			'role.required' => 'Debes incluír un rol de usuario'
		]);

		if( $validate->fails() ) return $this->validationErrorResponse($validate->errors());

		$user = User::find($request->id);

		if( !$user ) return $this->errorResponse('El usuario que estás buscando no existe o ha sido eliminado', 404);

		$edit_allowed = false;
	
		if( 'superadmin' === $auth->role ){
			$edit_allowed = true;
		}else{
			if( $user->role === $auth->role ){
				$edit_allowed = $user->id === $auth->id ? true : false;
			}else{
				$edit_allowed = 'admin' === $auth->role and 'doctor' !== $user->role ? false : true;
			}
		}

		if( !$edit_allowed ) return $this->errorResponse('No estás autorizado a modificar este usuario', 404);

		$userData = array_merge($user->toArray(), [ 
			'name' => $request->name,
			'email' => $request->email,
			'role' => $auth->id === $user->id ? $user->role : ('superadmin' === $auth->role ? $request->role : ('admin' === $auth->role ? 'doctor' : 'doctor'))
		]);

		$user->update($userData);

		return $this->successResponse($user, 'Hemos actualizado los datos del usuario');
	}



	// DELETE
	public function delete(Request $request){
		$validate = Validator::make($request->all(), [
			'id' => 'required|numeric'
		], [
			'id.required' => 'Debes proveernos el ID del usuario para continuar',
			'id.numeric' => 'Formato incorrecto'
		]);

		if( $validate->fails() ) return $this->validationErrorResponse($validate->errors());

		$user = User::find($request->id);

		if( !$user ) return $this->errorResponse('El usuario que tratas de eliminar no existe', 404);

		$user->delete();

		return $this->successResponse([], 'Se ha eliminado el usuario');
	}

}
