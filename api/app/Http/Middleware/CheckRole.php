<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Traits\ApiResponse;

class CheckRole
{

	use ApiResponse;

	/**
	 * Handle an incoming request.
	 *
	 * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
	 */
	public function handle(Request $request, Closure $next, ...$roles)
	{

		$user = $request->user();

		if (!$user || ! in_array($user->role, $roles)) {
			// abort(403, 'Unauthorized');
			return $this->unauthorizedResponse('No estás autorizado para ejecutar esta acción');
		}

		return $next($request);

	}
}
