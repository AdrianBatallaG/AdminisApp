<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
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
                'message' => 'No se pudo enviar el correo de verificación. Revisa la configuración de correo transaccional y vuelve a intentarlo.',
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
                'message' => 'No se pudo reenviar el correo. Verifica configuración SMTP (Brevo), remitente y logs del proveedor.',
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
        $fromAddress = (string) config('mail.from.address');

        if (in_array($mailer, ['log', 'array'], true)) {
            return 'La verificación de correo requiere un mailer real (por ejemplo SMTP de Brevo), no MAIL_MAILER=log/array.';
        }

        if ($fromAddress === '') {
            return 'Falta MAIL_FROM_ADDRESS en la configuración del backend.';
        }

        if ($mailer === 'smtp') {
            $host = (string) config('mail.mailers.smtp.host');
            $username = (string) config('mail.mailers.smtp.username');
            $password = (string) config('mail.mailers.smtp.password');

            if ($host === '' || $username === '' || $password === '') {
                return 'Faltan datos SMTP para enviar correos (MAIL_HOST, MAIL_USERNAME o MAIL_PASSWORD).';
            }
        }

        return null;
    }
}
