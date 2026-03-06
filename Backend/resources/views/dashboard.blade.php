<!DOCTYPE html>
<html>
<head>
    <title>Dashboard</title>
</head>
<body>

<h1>Bienvenido, {{ Auth::user()->name }}</h1>

<form method="POST" action="/logout">
    @csrf
    <button type="submit">Cerrar sesión</button>
</form>

</body>
</html>
