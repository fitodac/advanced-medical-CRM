<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Traits\ApiResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\UserResource;

use App\Models\User;


class AuthController extends Controller
{

	use ApiResponse;


	// LOGIN
	public function login(Request $request)
	{
		$fields = $request->validate([
			'email' => 'required|email',
			'password' => 'required',
		]);

		$credentials = $request->only(['email', 'password']);

		if( !Auth::attempt($credentials, false) ) return $this->unauthorizedResponse();

		$user = $request->user();
		$token = $user->createToken('authToken')->plainTextToken;

		return response()->json([
			'token' => $token,
			'token_type' => 'Bearer',
			'user' => new UserResource($user),
		], 200);
	}


	// LOGOUT
	public function logout(Request $request)
	{
		$request->user()->tokens()->delete();
		return $this->successResponse([], 'Has terminado tu sesión');
	}

}
