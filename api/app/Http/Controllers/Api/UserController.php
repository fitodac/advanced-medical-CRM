<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use App\Models\Doctor;
use App\Models\UserVerify;
use App\Traits\ApiResponse;
use Illuminate\Support\Str;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\env;

class UserController extends Controller
{

	use ApiResponse;

	// CREATE
	public function create(Request $request)
	{

		$auth = Auth::user();

		$validate = Validator::make($request->all(), [
			'email' => 'required|unique:users'
		], [
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
				'specialty_id' => 'required|numeric',
			], [
				'center_id.required' => 'Debes seleccionar un hospital para continuar',
				'center_id.numeric' => 'Formato incorrecto',
				'specialty_id.required' => 'El doctor debe tener una especialidad',
				'specialty_id.numeric' => 'Formato incorrecto'
			]);

			if( $validate_doctor->fails() ){ return $this->validationErrorResponse($validate_doctor->errors()); }
		}

		$user = User::create($userData);

		if( 'doctor' === $userData['role'] ){
			$doctorData = array_merge($userData, ['user_id' => $user->id]);
			Doctor::create($doctorData);
		}

		// $token = $user->createToken('my-token')->plainTextToken;

		$verify_token = Str::random(64);
		UserVerify::create([
			'user_id' => $user->id,
			'token' => $verify_token
		]);

		Mail::send('email.email-verification', [
			'token' => $verify_token,
			'app_uri' => env('REACT_URL')
		], function($message) use($request){
			$message->to($request->email);
			$message->subject(__('Verify Email Address'));
		});

		return $this->successResponse($user, 'Hemos creado un nuevo usuario');

	}




	// UPDATE
	public function update(Request $request)
	{

		$auth = Auth::user();

		$validate = Validator::make($request->all(), [
			'id' => 'required|numeric',
			'email' => 'required|unique:users,email,'.$request->id,
			'role' => 'required|in:admin,doctor',
			'specialty_id' => 'numeric',
			'center_id' => 'numeric',
		], [
			'id.required' => 'Debes proveernos el ID del usuario para continuar',
			'id.numeric' => 'Formato incorrecto',
			'email.required' => 'Debes incluír un email para el usuario',
			'email.unique' => 'El email que intentas usar ya existe en la base de datos',
			'role.in' => 'El role no es válido',
			'role.required' => 'Debes incluír un rol de usuario',
			'specialty_id.numeric' => 'El ID de la especialidad debe ser un número',
			'center_id.numeric' => 'El ID del centro médico debe ser un número'
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
			'firstname' => $request->firstname,
			'lastname' => $request->lastname,
			'email' => $request->email,
			'role' => $auth->id === $user->id ? $user->role : ('superadmin' === $auth->role ? $request->role : ('admin' === $auth->role ? 'doctor' : 'doctor'))
		]);

		$user->update($userData);


		// Update doctors table
		if( $request->specialty_id or $request->center_id ){
			$doctor = $user->doctor;

			if( 'doctor' === $user->role ){
				if( $doctor ){
					$doctorData = array_merge($doctor->toArray(), [
						'user_id' => $user->id,
						'specialty_id' => $request->specialty_id ?? $doctor->specialty_id,
						'center_id' => $request->center_id ?? $doctor->center_id
					]);

					$doctor->update($doctorData);
				}else{
					Doctor::create([
						'user_id' => $user->id,
						'specialty_id' => $request->specialty_id,
						'center_id' => $request->center_id
					]);
				}
			}elseif( 'admin' === $user->role ){
				$doctor->delete();
			}
		}

		return $this->successResponse($user, 'Hemos actualizado los datos del usuario');
	}



	// LIST
	public function list(Request $request)
	{

		$query = User::whereNot('role', 'superadmin');

		if ($request->has('name') && !empty($request->name)) {
			$query->where(function($query) use ($request) {
				$query->where(DB::raw('UPPER(firstname)'), 'LIKE', '%' . strtoupper($request->name) . '%')
					->orWhere(DB::raw('UPPER(lastname)'), 'LIKE', '%' . strtoupper($request->name) . '%');
			});
		}

		if ($request->has('role') && !empty($request->role)) {
			$query->where('role', $request->role);
		}

		$resp = $query->latest()->paginate(10)->withQueryString();
		return $this->successResponse($resp);
	}



	// GET
	public function get(Request $request)
	{

		$user = User::with('doctor')->find($request->id);

		if( !$user ){ return $this->errorResponse('El usuario que estás buscando no existe en nuestra base de datos', 404); }
		if( 'superadmin' === $user->role ){ return $this->errorResponse('El Super Admin no puede ser editado', 404); }

		return $this->successResponse($user);
	}



	// DELETE
	public function delete(User $user){
		// return $this->successResponse([], 'Se ha eliminado el usuario');
        if( !$user ) return $this->errorResponse('El usuario que tratas de eliminar no existe', 404);

        $authUser = Auth::user();

        if ($authUser->id == $user->id) {
            // Los usuarios no pueden eliminarse a sí mismos
            return $this->errorResponse('No te puedes eliminar a ti mismo', 404);
        }

        switch ($user->role) {
            case 'superadmin':
                // No se puede eliminar a un superadmin
                return $this->errorResponse('Este usuario no puede eliminarse', 404);

            case 'admin':
                if ($authUser->role !== 'superadmin') {
                    // Solo un superadmin puede eliminar a un admin
                    return $this->errorResponse('Este usuario no puede eliminarse', 404);
                }
                break;

            case 'doctor':
                if ($authUser->role !== 'superadmin' && $authUser->role !== 'admin') {
                    // Solo un superadmin o un admin puede eliminar a un doctor
                    return $this->errorResponse('Este usuario no puede eliminarse', 404);
                }
                break;
        }

		$user->delete();

		return $this->successResponse([], 'Se ha eliminado el usuario');
	}

}
