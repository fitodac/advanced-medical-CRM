<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\VisitController;
use App\Http\Controllers\Api\CenterController;
use App\Http\Controllers\Api\DoctorController;
use App\Http\Controllers\Api\ExportController;
use App\Http\Controllers\Api\PatientController;
use App\Http\Controllers\Api\SpecialtyController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

//public route
Route::get('/', function () { return 'Advanced API'; });
Route::post('/auth/login', [AuthController::class, 'login'])->name('login');


//protected route
Route::group(['middleware' => ['auth:sanctum']], function(){

	Route::post('/auth/logout', 			    			[AuthController::class, 'logout'])->name('logout');

	// Users
	Route::post('/user/create', 			    			[UserController::class, 'create'])->middleware('restrictRole:superadmin,admin')->name('user.create');
	Route::put('/user/update',									[UserController::class, 'update'])->name('user.update');
	Route::post('/user', 												[UserController::class, 'get'])->middleware('restrictRole:superadmin,admin')->name('user.show');
	Route::get('/user/list', 				    				[UserController::class, 'list'])->middleware('restrictRole:superadmin')->name('user.list');
	Route::delete('/user/delete/{user}', 				[UserController::class, 'delete'])->middleware('restrictRole:superadmin,admin')->name('user.delete');

	// Centers
	Route::post('/center/create', 		        	[CenterController::class, 'create'])->middleware('restrictRole:superadmin,admin')->name('center.create');
	Route::put('/center/update', 			    			[CenterController::class, 'update'])->middleware('restrictRole:superadmin,admin')->name('center.update');
	Route::post('/center', 											[CenterController::class, 'get'])->middleware('restrictRole:superadmin,admin')->name('center.get');
	Route::get('/center/list', 			    				[CenterController::class, 'list'])->middleware('restrictRole:superadmin,admin')->name('center.list');
	Route::post('/center/getAll', 		        	[CenterController::class, 'getFullList'])->name('center.getAll');
	Route::delete('/center/delete/{center}', 		[CenterController::class, 'delete'])->middleware('restrictRole:superadmin,admin')->name('center.delete');

	// Doctors
	Route::get('/doctor', 											[DoctorController::class, 'list'])->middleware('restrictRole:superadmin,admin')->name('doctor.list');
	Route::post('/doctor/getInfo', 	        		[DoctorController::class, 'get'])->name('doctor.get');
	Route::post('/doctor/getAll', 	        		[DoctorController::class, 'getFullList'])->name('doctor.getAll');
	Route::delete('/doctor/delete/{doctor}',		[DoctorController::class, 'delete'])->name('doctor.delete');

	// Specialties
	Route::post('/specialties', 			    			[SpecialtyController::class, 'getFullList'])->name('specialties');

	// Patients
	Route::post('/patient/create',		        	[PatientController::class, 'create'])->name('patient.create');
	Route::put('/patient/update',			    			[PatientController::class, 'update'])->name('patient.update');
	Route::post('/patient',											[PatientController::class, 'get'])->name('patient.get');
	Route::get('/patient/list',			    				[PatientController::class, 'list'])->name('patient.list');
	Route::delete('/patient/delete/{patient}',	[PatientController::class, 'delete'])->name('patient.delete');

    // Visits
	Route::post('/visit',												[VisitController::class, 'get'])->name('visit.get');
	Route::post('/visit/create',								[VisitController::class, 'create'])->name('visit.create');
	Route::put('/visit/update',									[VisitController::class, 'update'])->name('visit.update');
	Route::delete('/visit/delete/{visit}',			[VisitController::class, 'delete'])->name('visit.delete');

	// Export
	Route::get('/export', 											[ExportController::class,'index'])->middleware('restrictRole:superadmin,admin')->name('export');
});

Route::get('account/verify/{token}', 					[AuthController::class, 'verifyAccount'])->name('user.verify');

