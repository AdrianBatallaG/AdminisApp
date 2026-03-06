# Adminis App Monorepo

Este repositorio contiene:
- `Backend/` (Laravel API para Render)
- `Frontend/` (React + Vite para Vercel)

## Despliegue recomendado

1. Subir este repo completo a GitHub.
2. Render: crear servicio desde Blueprint usando `render.yaml` en la raiz.
3. Vercel: importar el mismo repo y definir `Root Directory = Frontend`.

## Donde configurar `VITE_API_URL`

`VITE_API_URL` se configura en **Vercel**, no en Render:

- Vercel -> Project Settings -> Environment Variables
- Key: `VITE_API_URL`
- Value: `https://<tu-backend>.onrender.com/api`

Tambien define:
- `VITE_USE_MOCK_AUTH=false`

Despues de guardar variables en Vercel, haz un redeploy del frontend.

## Variables importantes en Render (Backend)

- `APP_URL=https://<tu-backend>.onrender.com`
- `FRONTEND_URL=https://<tu-frontend>.vercel.app`
- `CORS_ALLOWED_ORIGINS=https://<tu-frontend>.vercel.app`
- `SANCTUM_STATEFUL_DOMAINS=<tu-frontend>.vercel.app`
- `APP_KEY=<php artisan key:generate --show>`
