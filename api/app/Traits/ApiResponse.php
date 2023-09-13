<?php

namespace App\Traits;

use Illuminate\Http\JsonResponse;

trait ApiResponse
{
    /**
     * Send a success response.
     *
     * @param  string|array  $data
     * @param  int  $statusCode
     * @return JsonResponse
     */
    public function successResponse($data, $message = null, $statusCode = 200)
    {
        $res['success'] = true;
        $res['data'] = $data;

        if($message) {
					$res['message'] = $message;
        }

        return response()->json($res, 200);
    }

    /**
     * Send an error response.
     *
     * @param  string|array  $error
     * @param  int  $statusCode
     * @return JsonResponse
     */
    public function errorResponse($error, $statusCode)
    {
        return response()->json([
            'success'   => false,
            'error'     => $error,
        ], $statusCode);
    }

    /**
     * Send an unauthorized response.
     *
     * @param  string  $message
     * @return JsonResponse
     */
    public function unauthorizedResponse($message = 'Unauthorized')
    {
        return $this->errorResponse($message, 401);
    }

    /**
     * Send a validation error response.
     *
     * @param  string|array  $errors
     * @return JsonResponse
     */
    public function validationErrorResponse($errors)
    {
        return $this->errorResponse($errors, 422);
    }

    /**
     * Build a custom response.
     *
     * @param  string|array  $data
     * @param  int           $code
     * @return \Illuminate\Http\JsonResponse
     */
    public function customResponse($data, $code)
    {
        return response()->json($data, $code);
    }
}
