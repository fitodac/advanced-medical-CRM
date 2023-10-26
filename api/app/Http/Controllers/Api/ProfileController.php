<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Traits\ApiResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class ProfileController extends Controller
{

	use ApiResponse;

	/**
	 * Show the form for editing the specified resource.
	 */
	public function edit(User $user)
	{
		$auth = Auth::user();
		if( $auth->id !== $user->id ) return $this->validationErrorResponse('No estás autorizado para ver esta información');

		$resp = User::with('doctor.center')->find($user->id);
		return $this->successResponse($resp);
	}


	/**
	 * Update the specified resource in storage.
	 */
	public function update(User $user, Request $request)
	{

		$auth = Auth::user();

		if( $auth->id !== $user->id ){
			return $this->validationErrorResponse('No estás autorizado para ver esta información');
		}

		$req = $request->all();

		if( isset($request->new_password) ){
			if( Hash::check($request->password, $user->password) ){
				$req['password'] = Hash::make($request->new_password);
			}else{
				return $this->validationErrorResponse('Ha ocurrido un problema al actualizar tu contraseña');
			}
		}

		$updated = $user->update($req);

		if( !$updated ){
			return $this->validationErrorResponse('Ocurrió un problema al actualizar tus datos');
		}

		return $this->successResponse(User::find($user->id), 'Tus datos se han actualizado correctamente');
	}

}
