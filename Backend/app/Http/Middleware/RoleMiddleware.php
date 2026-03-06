<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;
use App\Enums\UserRole;

class RoleMiddleware
{
    public function handle(Request $request, Closure $next, string $role): Response
    {
        if (!Auth::check()) {
            abort(403);
        }

        $userRole = Auth::user()->role;

        // Verifica que realmente sea Enum
        if (!$userRole instanceof UserRole) {
            abort(403);
        }

        // Comparación correcta entre enums
        if ($userRole !== UserRole::from($role)) {
            abort(403);
        }

        return $next($request);
    }
}
