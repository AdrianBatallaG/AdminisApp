<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use App\Enums\UserRole;
use Illuminate\Validation\Rules\Enum;

class UserManagementController extends Controller
{
    public function index()
    {
        $users = User::all();
        return view('admin.users', compact('users'));
    }

    public function updateRole(Request $request, User $user)
{
    $request->validate([
        'role' => ['required', new Enum(UserRole::class)],
    ]);

    if ($request->user()->id === $user->id && $request->role !== UserRole::ADMIN->value) {
        return back()->withErrors([
            'role' => 'No puedes quitarte tu propio rol de administrador.'
        ]);
    }

    $user->update([
        'role' => $request->role
    ]);

    return back()->with('success', 'Rol actualizado correctamente');
}}
