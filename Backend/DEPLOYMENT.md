# Deploy guide: Backend en Render + Frontend en Vercel

## 1) Backend Laravel en Render

Este backend ya incluye `render.yaml` para crear:
- 1 web service PHP (`adminis-lab-api`)
- 1 base de datos Postgres (`adminis-lab-db`)

### Variables obligatorias del servicio web

Configura estos valores en Render (Environment):

- `APP_ENV=production`
- `APP_DEBUG=false`
- `APP_KEY=<php artisan key:generate --show>`
- `APP_URL=https://<tu-backend>.onrender.com`
- `DB_CONNECTION=pgsql`
- `DATABASE_URL=<autogenerada por Render>`
- `FRONTEND_URL=https://<tu-frontend>.vercel.app`
- `CORS_ALLOWED_ORIGINS=https://<tu-frontend>.vercel.app`
- `CORS_ALLOWED_ORIGIN_PATTERNS=` (opcional)
- `CORS_SUPPORTS_CREDENTIALS=false`
- `SANCTUM_STATEFUL_DOMAINS=<tu-frontend>.vercel.app`

Si usas previews de Vercel, puedes permitirlos con patron regex:

- `CORS_ALLOWED_ORIGIN_PATTERNS=^https://.*\\.vercel\\.app$`

Notas:
- No agregues slash final en `APP_URL` ni en `CORS_ALLOWED_ORIGINS`.
- Si cambias variables, haz redeploy para que tome la nueva configuracion.

## 2) Frontend Vite en Vercel

En Vercel, define estas variables:

- `VITE_API_URL=https://<tu-backend>.onrender.com/api`
- `VITE_USE_MOCK_AUTH=false`

Este frontend ya incluye `vercel.json` para SPA, evitando 404 al refrescar rutas internas.

## 3) Endpoints de autenticacion

- `POST /api/register`
- `POST /api/login`
- `POST /api/logout` (Bearer token)
- `GET /api/me` (Bearer token)

## 4) Verificacion rapida

1. `POST /api/register` responde `201` con `token`.
2. `POST /api/login` responde `200` con `token`.
3. `GET /api/me` con Bearer token responde usuario.
4. Desde Vercel no hay errores CORS en consola del navegador.

## 5) Local (Sail/Docker + Vite)

Backend:
- Levanta Sail y ejecuta migraciones.

Frontend:
- Usa `.env` con `VITE_API_URL=http://localhost:8000/api`.
- Si quieres login de prueba sin backend, usa `VITE_USE_MOCK_AUTH=true`.
