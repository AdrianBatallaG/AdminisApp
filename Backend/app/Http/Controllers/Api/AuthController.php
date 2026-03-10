<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        if (! Auth::attempt($credentials)) {
            return response()->json([
                'success' => false,
                'message' => 'Credenciales incorrectas',
            ], 401);
        }

        $user = Auth::user();

        if (! $user->hasVerifiedEmail()) {
            Auth::logout();

            return response()->json([
                'success' => false,
                'message' => 'Debes verificar tu correo antes de iniciar sesión.',
                'requires_email_verification' => true,
            ], 403);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'success' => true,
            'user' => $user,
            'token' => $token,
            'token_type' => 'Bearer',
        ]);
    }

    public function register(Request $request)
    {
        $data = $request->validate([
            'name' => ['required'],
            'email' => ['required', 'email', 'unique:users'],
            'password' => ['required', 'min:6'],
        ]);

        if ($configurationError = $this->mailConfigurationError()) {
            return response()->json([
                'success' => false,
                'message' => $configurationError,
            ], 500);
        }

        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
            'role' => \App\Enums\UserRole::USER,
        ]);

        try {
            $user->sendEmailVerificationNotification();
        } catch (\Throwable $exception) {
            Log::error('No se pudo enviar correo de verificación al registrar usuario.', [
                'user_id' => $user->id,
                'email' => $user->email,
                'error' => $exception->getMessage(),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'No se pudo enviar el correo de verificación. Revisa la configuración de Resend y vuelve a intentarlo.',
            ], 500);
        }

        return response()->json([
            'success' => true,
            'message' => 'Te enviamos un correo para verificar tu cuenta. Si no llega, revisa spam/promociones o solicita reenvío.',
            'requires_email_verification' => true,
        ], 201);
    }

    public function resendVerificationEmail(Request $request)
    {
        $data = $request->validate([
            'email' => ['required', 'email', 'exists:users,email'],
        ]);

        if ($configurationError = $this->mailConfigurationError()) {
            return response()->json([
                'success' => false,
                'message' => $configurationError,
            ], 500);
        }

        $user = User::where('email', $data['email'])->first();

        if ($user->hasVerifiedEmail()) {
            return response()->json([
                'success' => true,
                'message' => 'Este correo ya fue verificado.',
            ]);
        }

        try {
            $user->sendEmailVerificationNotification();
        } catch (\Throwable $exception) {
            Log::error('No se pudo reenviar correo de verificación.', [
                'user_id' => $user->id,
                'email' => $user->email,
                'error' => $exception->getMessage(),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'No se pudo reenviar el correo. Verifica RESEND_API_KEY, remitente y actividad en Resend.',
            ], 500);
        }

        return response()->json([
            'success' => true,
            'message' => 'Correo de verificación reenviado.',
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()?->delete();

        return response()->json([
            'success' => true,
            'message' => 'Sesion cerrada correctamente',
        ]);
    }

    public function me(Request $request)
    {
        return response()->json([
            'user' => $request->user(),
        ]);
    }

    private function mailConfigurationError(): ?string
    {
        $mailer = (string) config('mail.default');
        $apiKey = (string) config('services.resend.key');
        $fromAddress = (string) config('mail.from.address');

        if ($mailer !== 'resend') {
            return 'La verificación de correo requiere MAIL_MAILER=resend.';
        }

        if ($apiKey === '' || ! str_starts_with($apiKey, 're_')) {
            return 'Falta RESEND_API_KEY válida en el backend.';
        }

        if ($fromAddress === '') {
            return 'Falta MAIL_FROM_ADDRESS en la configuración del backend.';
        }

        if (app()->environment('production') && str_ends_with(strtolower($fromAddress), '@resend.dev')) {
            return 'En producción debes usar un MAIL_FROM_ADDRESS de dominio propio verificado en Resend.';
        }

        return null;
    }
}
