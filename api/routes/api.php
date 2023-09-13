<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\CenterController;
use App\Http\Controllers\Api\DoctorController;
use App\Http\Controllers\Api\PatientController;
use App\Http\Controllers\Api\VisitController;

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

	// Users
	Route::post('/auth/create', 			[UserController::class, 'create'])->middleware('restrictRole:superadmin,admin')->name('user.create');
	Route::put('/auth/update', 				[UserController::class, 'update'])->name('user.update');
	Route::post('/auth/logout', 			[AuthController::class, 'logout'])->name('user.logout');
	Route::delete('/auth/delete', 			[UserController::class, 'delete'])->middleware('restrictRole:superadmin,admin')->name('user.delete');

	// Centers
	Route::post('/center/create', 		[CenterController::class, 'create'])->middleware('restrictRole:superadmin,admin')->name('center.create');
	Route::put('/center/update', 			[CenterController::class, 'update'])->middleware('restrictRole:superadmin,admin')->name('center.update');
	Route::post('/center', 						[CenterController::class, 'show'])->middleware('restrictRole:superadmin,admin')->name('center.show');
	Route::post('/center/list', 			[CenterController::class, 'list'])->middleware('restrictRole:superadmin,admin')->name('center.list');
	Route::delete('/center/delete', 	[CenterController::class, 'delete'])->middleware('restrictRole:superadmin,admin')->name('center.delete');

	// Doctors
	Route::post('/doctors', 					[DoctorController::class, 'list'])->middleware('restrictRole:superadmin,admin')->name('doctor.list');

	// Patients
	Route::post('/patient/create',		[PatientController::class, 'create'])->name('patient.create');
	Route::put('/patient/update',			[PatientController::class, 'update'])->name('patient.update');
	Route::post('/patient',						[PatientController::class, 'show'])->name('patient.show');
	Route::post('/patient/list',			[PatientController::class, 'list'])->name('patient.list');
	Route::delete('/patient/delete',	[PatientController::class, 'delete'])->name('patient.delete');

	// Visits
	Route::post('/visit/create',			[VisitController::class, 'create'])->name('visit.create');
	Route::put('/visit/update',				[VisitController::class, 'update'])->name('visit.update');
});