# Sistema Parroquial - Frontend

Frontend en React + Vite para consumo de API Laravel.

## Requisitos

- Node.js 18+
- Backend Laravel disponible (local o Render)

## Variables de entorno

Crea `.env` basado en `.env.example`:

```env
VITE_API_URL=http://localhost:8000/api
VITE_USE_MOCK_AUTH=false
```

- `VITE_API_URL`: URL base de la API (`/api` incluido).
- `VITE_USE_MOCK_AUTH`: `true` para usuarios mock solo en desarrollo.

## Desarrollo local

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Despliegue en Vercel

Configura variables en Vercel:

- `VITE_API_URL=https://<tu-backend>.onrender.com/api`
- `VITE_USE_MOCK_AUTH=false`

El proyecto incluye `vercel.json` con rewrite SPA para rutas de React Router.

## Endpoints esperados de autenticacion

- `POST /api/login`
- `POST /api/register`
- `POST /api/logout`
- `GET /api/me`
