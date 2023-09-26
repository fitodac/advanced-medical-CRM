<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use App\Models\UserVerify;
use App\Traits\ApiResponse;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;


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
			'info' => new UserResource($user),
		], 200);
	}


	// LOGOUT
	public function logout(Request $request)
	{
		$request->user()->tokens()->delete();
		return $this->successResponse([], 'Has terminado tu sesión');
	}

    /**
     * Write code on Method
     *
     * @return response()
     */
    public function verifyAccount($token)
    {
        $verifyUser = UserVerify::where('token', $token)->first();

        $message = 'Sorry your email cannot be identified.';

        if(!is_null($verifyUser) ){
            $user = $verifyUser->user;

            if(!$user->email_verified_at) {
                $verifyUser->user->email_verified_at = 1;
                $verifyUser->user->save();
                $message = "Your e-mail is verified. You can now login.";
            } else {
                $message = "Your e-mail is already verified. You can now login.";
            }
        }

        return $this->successResponse([], $message);
    }
}
