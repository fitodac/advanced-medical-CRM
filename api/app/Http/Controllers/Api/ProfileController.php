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

		$resp = User::with('doctor')->find($user->id);
		return $this->successResponse($resp);
	}


	/**
	 * Update the specified resource in storage.
	 */
	public function update(User $user, Request $request)
	{

		$auth = Auth::user();

		$validate = Validator::make($request->all(), [
			'name' => ['unique:users,name,'.$auth->id]
		],[
			'name.unique' => 'Nombre de usuario inválido'
		]);

		if( $validate->fails() ){ return $this->validationErrorResponse($validate->errors()); }


		if( $auth->id !== $user->id ) return $this->validationErrorResponse('No estás autorizado para ver esta información');

		$req = [];
		
		if( isset($request->name) ){
			$req['name'] = Str::slug($request->name);
		}
		
		if( isset($request->new_password) ){
			if( Hash::check($request->password, $user->password) ){
				$req['password'] = Hash::make($request->new_password);
			}
		}

		$user->update($req);

		return $this->successResponse($user);
	}

}
