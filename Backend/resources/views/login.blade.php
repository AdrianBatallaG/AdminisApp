<!DOCTYPE html>
<html>
<head>
    <title>Acceso</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <style>
        * {
            box-sizing: border-box;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        }

        body {
            margin: 0;
            height: 100vh;
            background: linear-gradient(135deg, #f3f4f6, #e5e7eb);
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .card {
            width: 100%;
            max-width: 420px;
            background: white;
            padding: 35px;
            border-radius: 18px;
            box-shadow: 0 20px 45px rgba(0,0,0,0.08);
        }

        .switcher {
            display: flex;
            margin-bottom: 25px;
            background: #f3f4f6;
            border-radius: 10px;
            padding: 4px;
        }

        .switcher button {
            flex: 1;
            border: none;
            background: transparent;
            padding: 10px;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 500;
            transition: 0.2s;
        }

        .switcher button.active {
            background: white;
            box-shadow: 0 4px 10px rgba(0,0,0,0.05);
        }

        .form-group {
            margin-bottom: 18px;
        }

        label {
            display: block;
            font-size: 14px;
            margin-bottom: 5px;
            color: #555;
        }

        input {
            width: 100%;
            padding: 12px;
            border-radius: 8px;
            border: 1px solid #ddd;
            transition: 0.2s;
        }

        input:focus {
            border-color: #6366f1;
            outline: none;
            box-shadow: 0 0 0 3px rgba(99,102,241,0.15);
        }

        .btn {
            width: 100%;
            padding: 12px;
            border: none;
            border-radius: 8px;
            background: #6366f1;
            color: white;
            font-weight: 500;
            cursor: pointer;
            transition: 0.2s;
        }

        .btn:hover {
            background: #4f46e5;
        }

        .hidden {
            display: none;
        }

        .error {
            background: #fee2e2;
            color: #991b1b;
            padding: 10px;
            border-radius: 8px;
            margin-bottom: 15px;
            font-size: 14px;
        }
    </style>
</head>
<body>

<div class="card">

    <div class="switcher">
        <button id="loginBtn" class="active" onclick="showLogin()">Iniciar sesión</button>
        <button id="registerBtn" onclick="showRegister()">Registrarse</button>
    </div>

    @if ($errors->any())
        <div class="error">
            {{ $errors->first() }}
        </div>
    @endif

    <!-- LOGIN FORM -->
    <form id="loginForm" method="POST" action="/login">
        @csrf

        <div class="form-group">
            <label>Email</label>
            <input type="email" name="email" required>
        </div>

        <div class="form-group">
            <label>Contraseña</label>
            <input type="password" name="password" required>
        </div>

        <button type="submit" class="btn">Entrar</button>
    </form>

    <!-- REGISTER FORM -->
    <form id="registerForm" method="POST" action="/register" class="hidden">
        @csrf

        <div class="form-group">
            <label>Nombre</label>
            <input type="text" name="name" required>
        </div>

        <div class="form-group">
            <label>Email</label>
            <input type="email" name="email" required>
        </div>

        <div class="form-group">
            <label>Contraseña</label>
            <input type="password" name="password" required>
        </div>

        <div class="form-group">
            <label>Confirmar contraseña</label>
            <input type="password" name="password_confirmation" required>
        </div>

        <button type="submit" class="btn">Crear cuenta</button>
    </form>

</div>

<script>
    function showLogin() {
        document.getElementById('loginForm').classList.remove('hidden');
        document.getElementById('registerForm').classList.add('hidden');
        document.getElementById('loginBtn').classList.add('active');
        document.getElementById('registerBtn').classList.remove('active');
    }

    function showRegister() {
        document.getElementById('registerForm').classList.remove('hidden');
        document.getElementById('loginForm').classList.add('hidden');
        document.getElementById('registerBtn').classList.add('active');
        document.getElementById('loginBtn').classList.remove('active');
    }
</script>

</body>
</html>
