@php
    use App\Enums\UserRole;
@endphp

<h2>Gestión de Usuarios</h2>

@if(session('success'))
    <p style="color:green">{{ session('success') }}</p>
@endif

<table border="1" cellpadding="10">
    <tr>
        <th>Nombre</th>
        <th>Email</th>
        <th>Rol</th>
        <th>Cambiar Rol</th>
    </tr>

    @foreach($users as $user)
        <tr>
            <td>{{ $user->name }}</td>
            <td>{{ $user->email }}</td>
            <td>{{ $user->role }}</td>
            <td>
                <form action="{{ route('admin.users.update', $user) }}" method="POST">
                    @csrf
                    @method('PUT')

                    <select name="role">
                        @foreach(UserRole::cases() as $role)
                            <option value="{{ $role->value }}"
                                {{ $user->role === $role ? 'selected' : '' }}>
                                {{ ucfirst($role->value) }}
                            </option>
                        @endforeach
                    </select>

                    <button type="submit">Actualizar</button>
                </form>
            </td>
        </tr>
    @endforeach
</table>
